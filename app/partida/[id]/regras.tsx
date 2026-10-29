import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Button, Callout, Pill, Screen } from '../../../components/ui';
import { colors, spacing } from '../../../lib/theme';
import { useApp } from '../../../lib/store';
import { CONSEQUENCIA_REGRA, REGRAS_PADRAO } from '../../../lib/mock-data';

export default function RegrasDaPartida() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { partidas } = useApp();
  const partida = partidas.find((p) => p.id === id);

  return (
    <Screen>
      <Text style={styles.sectionLabel}>Regras padrão</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {REGRAS_PADRAO.map((regra) => (
          <Pill key={regra} label={regra} tone="neutral" />
        ))}
      </View>

      {partida && partida.regrasAdicionais.length > 0 && (
        <View style={{ gap: spacing.sm }}>
          <Text style={styles.sectionLabel}>Regras adicionais do organizador</Text>
          <View style={styles.additionalBox}>
            {partida.regrasAdicionais.map((regra) => (
              <Text key={regra} style={styles.additionalText}>
                • {regra}
              </Text>
            ))}
          </View>
        </View>
      )}

      <Callout tone="red">
        <Text style={styles.consequenciaText}>{CONSEQUENCIA_REGRA}</Text>
      </Callout>

      <Button title="Voltar para a partida" variant="outline" onPress={() => router.back()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.label,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  additionalBox: { backgroundColor: colors.surface, borderRadius: 12, padding: spacing.md, gap: 4 },
  additionalText: { fontSize: 14, color: colors.text },
  consequenciaText: { fontSize: 13, color: colors.red },
});
