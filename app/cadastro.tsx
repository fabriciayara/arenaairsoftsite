import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Button, Field, Screen } from '../components/ui';
import { colors, spacing } from '../lib/theme';
import { useApp } from '../lib/store';
import { TipoConta } from '../lib/mock-data';

export default function Cadastro() {
  const { entrar, atualizarPerfil } = useApp();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState<TipoConta>('jogador');

  function handleCriarConta() {
    atualizarPerfil({ nome: nome || 'Jogador', email: email || undefined, tipo });
    entrar();
    router.replace('/partidas');
  }

  return (
    <Screen>
      <Text style={styles.subtitle}>
        Crie sua conta pra confirmar presença em partidas ou organizar as suas.
      </Text>

      <View style={{ gap: spacing.md, marginTop: spacing.sm }}>
        <Field label="Nome" placeholder="Seu nome completo" value={nome} onChangeText={setNome} />
        <Field
          label="E-mail"
          placeholder="seuemail@exemplo.com"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Field label="Senha" placeholder="••••••••" secureTextEntry value={senha} onChangeText={setSenha} />

        <View style={{ gap: 6 }}>
          <Text style={styles.label}>Você vai usar o app como</Text>
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

        <Button title="Criar conta" onPress={handleCriarConta} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  subtitle: { fontSize: 14, color: colors.textMuted },
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
