import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Button, Card, Pill, Screen } from '../../../components/ui';
import { colors, spacing } from '../../../lib/theme';
import { useApp } from '../../../lib/store';

export default function PaginaDaPartida() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { partidas, usuario, confirmarPresenca, cancelarPresenca, cancelarPartida } = useApp();
  const partida = partidas.find((p) => p.id === id);

  if (!partida) {
    return (
      <Screen>
        <Text>Partida não encontrada.</Text>
      </Screen>
    );
  }

  const souOrganizador = partida.organizador === usuario.nome;
  const cancelada = partida.status === 'cancelada';
  const vagasOcupadas = partida.confirmados.length;
  const vagasRestantes = Math.max(partida.vagasTotal - vagasOcupadas, 0);

  function handleCancelarPresenca() {
    Alert.alert(
      'Cancelar presença?',
      'O organizador vai ser avisado que você não vai mais participar dessa partida.',
      [
        { text: 'Voltar', style: 'cancel' },
        { text: 'Cancelar presença', style: 'destructive', onPress: () => cancelarPresenca(partida!.id) },
      ]
    );
  }

  function handleCancelarPartida() {
    Alert.alert(
      'Cancelar esta partida?',
      'Todos os confirmados e pendentes vão ser avisados que a partida foi cancelada.',
      [
        { text: 'Voltar', style: 'cancel' },
        { text: 'Cancelar partida', style: 'destructive', onPress: () => cancelarPartida(partida!.id) },
      ]
    );
  }

  return (
    <Screen>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Pill
          label={cancelada ? 'Cancelada' : 'Vagas abertas'}
          tone={cancelada ? 'red' : 'orange'}
        />
      </View>

      <Text style={styles.titulo}>{partida.titulo}</Text>
      <Text style={styles.meta}>{partida.dataLabel}</Text>
      <Text style={styles.meta}>{partida.local}</Text>
      <Text style={styles.organizador}>Organizado por {partida.organizador}</Text>

      <Card>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.cardLabel}>Vagas</Text>
          <Text style={styles.cardValue}>
            {vagasOcupadas}/{partida.vagasTotal} confirmadas · {vagasRestantes} livres
          </Text>
        </View>
        {partida.pendentes.length > 0 && (
          <Text style={styles.pendentes}>{partida.pendentes.length} pendente(s): {partida.pendentes.map((p) => p.nome).join(', ')}</Text>
        )}
      </Card>

      <View style={{ gap: spacing.sm }}>
        <Text onPress={() => router.push(`/partida/${partida.id}/equipamentos`)} style={styles.link}>
          Equipamentos obrigatórios →
        </Text>
        <Text onPress={() => router.push(`/partida/${partida.id}/regras`)} style={styles.link}>
          Regras da partida →
        </Text>
        <Text onPress={() => router.push(`/partida/${partida.id}/alugar-equipamento`)} style={styles.link}>
          Alugar equipamento →
        </Text>
      </View>

      {!cancelada && !souOrganizador && (
        partida.presencaUsuarioConfirmada ? (
          <Button title="Cancelar minha presença" variant="outline" onPress={handleCancelarPresenca} />
        ) : (
          <Button title="Confirmar presença" onPress={() => confirmarPresenca(partida.id)} />
        )
      )}

      {!cancelada && souOrganizador && (
        <Button title="Cancelar partida" variant="outline" onPress={handleCancelarPartida} />
      )}

      {cancelada && (
        <Text style={styles.canceladaAviso}>Essa partida foi cancelada pelo organizador.</Text>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  titulo: { fontSize: 22, fontWeight: '700', color: colors.text },
  meta: { fontSize: 14, color: colors.textMuted },
  organizador: { fontSize: 13, color: colors.textFaint },
  cardLabel: { fontSize: 13, color: colors.label },
  cardValue: { fontSize: 13, color: colors.text, fontWeight: '500' },
  pendentes: { fontSize: 12, color: colors.textMuted },
  link: { fontSize: 15, color: colors.ink, fontWeight: '500' },
  canceladaAviso: { fontSize: 13, color: colors.red },
});
