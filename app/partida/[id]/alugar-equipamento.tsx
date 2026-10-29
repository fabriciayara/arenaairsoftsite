import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { router } from 'expo-router';
import { Button, Card, Screen } from '../../../components/ui';
import { colors, spacing } from '../../../lib/theme';

const ITENS_PARA_ALUGAR = [
  { nome: 'Réplica (arma de airsoft)', preco: 'R$ 60/dia' },
  { nome: 'Óculos de proteção balístico', preco: 'R$ 15/dia' },
  { nome: 'Colete e proteção corporal', preco: 'R$ 25/dia' },
];

export default function AluguelEquipamento() {
  function handleWhatsApp() {
    Linking.openURL('https://wa.me/5511988887777?text=Oi! Quero alugar equipamento pra partida de airsoft.');
  }

  return (
    <Screen>
      <Text style={styles.subtitle}>
        Ainda não tem seu próprio equipamento? Dá pra alugar direto com o organizador antes da
        partida.
      </Text>

      <View style={{ gap: spacing.sm }}>
        {ITENS_PARA_ALUGAR.map((item) => (
          <Card key={item.nome}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.itemNome}>{item.nome}</Text>
              <Text style={styles.itemPreco}>{item.preco}</Text>
            </View>
          </Card>
        ))}
      </View>

      <Text style={styles.microcopy}>Pagamentos são acordados com o organizador.</Text>

      <Button title="Conversar no WhatsApp" onPress={handleWhatsApp} />
      <Button
        title="Ver equipamento de outros jogadores"
        variant="outline"
        onPress={() => router.push('/aluguel-comunidade')}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  subtitle: { fontSize: 14, color: colors.textMuted },
  itemNome: { fontSize: 15, color: colors.text, fontWeight: '500' },
  itemPreco: { fontSize: 14, color: colors.textMuted },
  microcopy: { fontSize: 12, color: colors.textFaint },
});
