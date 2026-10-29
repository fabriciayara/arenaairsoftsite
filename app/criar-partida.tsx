import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Button, Field, Screen } from '../components/ui';
import { colors, spacing } from '../lib/theme';
import { useApp } from '../lib/store';

export default function CriarPartida() {
  const { criarPartida } = useApp();
  const [titulo, setTitulo] = useState('');
  const [data, setData] = useState('');
  const [local, setLocal] = useState('');
  const [vagas, setVagas] = useState('20');
  const [regraAdicional, setRegraAdicional] = useState('');

  function handlePublicar() {
    const nova = criarPartida({
      titulo: titulo || 'Nova partida',
      dataLabel: data || 'A definir',
      local: local || 'A definir',
      vagasTotal: Number(vagas) || 20,
      regrasAdicionais: regraAdicional ? [regraAdicional] : [],
    });
    router.replace(`/partida/${nova.id}`);
  }

  return (
    <Screen>
      <Text style={styles.subtitle}>
        Preencha os dados da partida. Você pode adicionar regras extras além das regras padrão.
      </Text>

      <Field label="Título da partida" placeholder="Ex.: Operação Trincheira" value={titulo} onChangeText={setTitulo} />
      <Field label="Data e horário" placeholder="Ex.: Sáb, 15 nov · 14h" value={data} onChangeText={setData} />
      <Field label="Local" placeholder="Nome do campo e cidade" value={local} onChangeText={setLocal} />
      <Field label="Número de vagas" placeholder="20" keyboardType="numeric" value={vagas} onChangeText={setVagas} />

      <View style={{ gap: spacing.sm }}>
        <Text style={styles.sectionLabel}>Regras adicionais (opcional)</Text>
        <Text style={styles.helper}>
          Além das regras padrão de segurança, válidas pra toda partida. Equipamentos obrigatórios
          já ficam listados automaticamente na tela de Equipamentos.
        </Text>
        <Field
          label="Regra extra"
          placeholder="Ex.: Jogo noturno, lanterna com luz vermelha obrigatória"
          value={regraAdicional}
          onChangeText={setRegraAdicional}
        />
      </View>

      <Button title="Publicar partida" onPress={handlePublicar} />
      <Button title="Rascunho" variant="outline" onPress={() => router.back()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  subtitle: { fontSize: 14, color: colors.textMuted },
  sectionLabel: { fontSize: 13, fontWeight: '600', color: colors.label },
  helper: { fontSize: 12, color: colors.textFaint },
});
