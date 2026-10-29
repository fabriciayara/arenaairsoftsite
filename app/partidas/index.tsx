import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Button, Card, Pill, Screen } from '../../components/ui';
import { colors, spacing } from '../../lib/theme';
import { useApp } from '../../lib/store';
import { Partida } from '../../lib/mock-data';

export default function ListaPartidas() {
  const { partidas, usuario } = useApp();

  return (
    <Screen scroll={false} style={{ padding: 0 }}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.greeting}>Olá, {usuario.nome.split(' ')[0]}</Text>
          <Text style={styles.subtitle}>Partidas de airsoft perto de você</Text>
        </View>
        <Text style={styles.profileLink} onPress={() => router.push('/perfil')}>
          Perfil
        </Text>
      </View>

      <FlatList
        data={partidas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.lg, gap: spacing.md }}
        renderItem={({ item }) => <PartidaCard partida={item} />}
        ListFooterComponent={
          usuario.tipo === 'organizador' ? (
            <Button title="+ Criar partida" variant="outline" onPress={() => router.push('/criar-partida')} />
          ) : undefined
        }
      />
    </Screen>
  );
}

function PartidaCard({ partida }: { partida: Partida }) {
  const vagasOcupadas = partida.confirmados.length;
  const cancelada = partida.status === 'cancelada';

  return (
    <Card onPress={() => router.push(`/partida/${partida.id}`)}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Pill
          label={cancelada ? 'Cancelada' : partida.presencaUsuarioConfirmada ? 'Presença confirmada' : 'Vagas abertas'}
          tone={cancelada ? 'red' : partida.presencaUsuarioConfirmada ? 'green' : 'orange'}
        />
        <Text style={styles.vagas}>
          {vagasOcupadas}/{partida.vagasTotal} vagas
        </Text>
      </View>
      <Text style={styles.titulo}>{partida.titulo}</Text>
      <Text style={styles.meta}>{partida.dataLabel}</Text>
      <Text style={styles.meta}>{partida.local}</Text>
      <Text style={styles.organizador}>Organizado por {partida.organizador}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: spacing.lg,
    paddingBottom: spacing.sm,
  },
  greeting: { fontSize: 20, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  profileLink: { fontSize: 13, textDecorationLine: 'underline', color: colors.ink },
  vagas: { fontSize: 12, color: colors.textMuted, alignSelf: 'center' },
  titulo: { fontSize: 17, fontWeight: '600', color: colors.text },
  meta: { fontSize: 13, color: colors.textMuted },
  organizador: { fontSize: 12, color: colors.textFaint, marginTop: 2 },
});
