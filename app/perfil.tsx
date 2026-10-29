import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { Button, Field, Screen } from '../components/ui';
import { colors, spacing } from '../lib/theme';
import { useApp } from '../lib/store';
import { TipoConta } from '../lib/mock-data';

function iniciais(nome: string) {
  return nome
    .split(' ')
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('')
    .toUpperCase();
}

export default function Perfil() {
  const { usuario, atualizarPerfil, sair } = useApp();
  const [nome, setNome] = useState(usuario.nome);
  const [telefone, setTelefone] = useState(usuario.telefone);
  const [tipo, setTipo] = useState<TipoConta>(usuario.tipo);

  function handleSalvar() {
    atualizarPerfil({ nome, telefone, tipo });
    Alert.alert('Perfil atualizado');
  }

  function handleSair() {
    sair();
    router.replace('/');
  }

  return (
    <Screen>
      <View style={styles.avatarRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{iniciais(usuario.nome)}</Text>
        </View>
        <Text style={styles.changePhoto}>Adicionar foto</Text>
        <Text style={styles.changePhotoHint}>JPG ou PNG · até 5 MB</Text>
      </View>

      <Field label="Nome" value={nome} onChangeText={setNome} />
      <Field label="E-mail" value={usuario.email} editable={false} />
      <Field label="Telefone" value={telefone} onChangeText={setTelefone} />

      <View style={{ gap: 6 }}>
        <Text style={styles.label}>Tipo de conta</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {(['jogador', 'organizador'] as TipoConta[]).map((opcao) => (
            <Text
              key={opcao}
              onPress={() => setTipo(opcao)}
              style={[styles.chip, tipo === opcao && styles.chipActive]}
            >
              {opcao === 'jogador' ? 'Jogador' : 'Organizador'}
            </Text>
          ))}
        </View>
      </View>

      <Button title="Salvar alterações" onPress={handleSalvar} />
      <Button title="Sair da conta" variant="text" onPress={handleSair} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  avatarRow: { alignItems: 'center', gap: 4, marginBottom: spacing.sm },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.orangeBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 28, fontWeight: '700', color: colors.primary },
  changePhoto: { fontSize: 14, fontWeight: '500', color: colors.ink, marginTop: 8 },
  changePhotoHint: { fontSize: 12, color: colors.textFaint },
  label: { fontSize: 12, color: colors.label },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 13,
    color: colors.textMuted,
  },
  chipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.orangeBg,
    color: colors.ink,
    fontWeight: '500',
  },
});
