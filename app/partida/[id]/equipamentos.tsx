import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Button, Callout, Screen } from '../../../components/ui';
import { colors, spacing } from '../../../lib/theme';
import { EQUIPAMENTO_OBRIGATORIO, EQUIPAMENTO_RECOMENDADO } from '../../../lib/mock-data';

export default function Equipamentos() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <Screen>
      <Callout tone="red">
        <Text style={styles.calloutTitle}>Itens obrigatórios pra entrar em área de jogo</Text>
        <Text style={styles.calloutBody}>
          Óculos de proteção balístico e luvas são obrigatórios — não apenas recomendados — por
          segurança física de todo mundo em campo.
        </Text>
      </Callout>

      <View style={{ gap: spacing.sm }}>
        <Text style={styles.sectionLabel}>Obrigatórios</Text>
        {EQUIPAMENTO_OBRIGATORIO.map((item) => (
          <View key={item} style={styles.itemRow}>
            <View style={styles.dotObrigatorio} />
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={{ gap: spacing.sm }}>
        <Text style={styles.sectionLabel}>Recomendados</Text>
        {EQUIPAMENTO_RECOMENDADO.map((item) => (
          <View key={item} style={styles.itemRow}>
            <View style={styles.dotRecomendado} />
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}
      </View>

      <Button
        title="Ainda não tenho equipamento — ver aluguel"
        variant="outline"
        onPress={() => router.push(`/partida/${id}/alugar-equipamento`)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  calloutTitle: { fontSize: 14, fontWeight: '600', color: colors.red },
  calloutBody: { fontSize: 13, color: colors.red },
  sectionLabel: { fontSize: 13, fontWeight: '600', color: colors.label, textTransform: 'uppercase', letterSpacing: 0.5 },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  itemText: { fontSize: 15, color: colors.text },
  dotObrigatorio: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.red },
  dotRecomendado: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.textFaint },
});
