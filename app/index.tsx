import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';
import Logo from '../components/Logo';
import { Button, Field, Screen } from '../components/ui';
import { colors, spacing } from '../lib/theme';
import { useApp } from '../lib/store';

export default function Login() {
  const { entrar } = useApp();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handleEntrar() {
    entrar();
    router.replace('/partidas');
  }

  return (
    <Screen>
      <View style={{ flex: 1 }} />
      <View style={styles.header}>
        <Logo size={80} />
        <Text style={styles.brand}>ARENA AIRSOFT</Text>
        <View style={{ gap: 4, marginTop: 2, alignItems: 'center' }}>
          <Text style={styles.title}>Entrar</Text>
          <Text style={styles.subtitle}>
            Pra confirmar presença e organizar suas partidas de airsoft
          </Text>
        </View>
      </View>

      <View style={{ flex: 1 }} />

      <View style={{ gap: spacing.md }}>
        <Field
          label="E-mail"
          placeholder="seuemail@exemplo.com"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Field
          label="Senha"
          placeholder="••••••••"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        <Link href="/recuperar-senha" style={styles.forgot}>
          Esqueci minha senha
        </Link>
        <Button title="Entrar" onPress={handleEntrar} />
      </View>

      <View style={{ flex: 1 }} />

      <View style={styles.footer}>
        <Text style={{ color: colors.textMuted }}>Ainda não tem conta?</Text>
        <Link href="/cadastro" style={styles.footerLink}>
          Criar conta
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', gap: 10, paddingHorizontal: spacing.lg },
  brand: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 1.5,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  title: { fontSize: 24, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: 14, color: colors.textMuted, textAlign: 'center' },
  forgot: {
    alignSelf: 'flex-end',
    fontSize: 13,
    textDecorationLine: 'underline',
    color: colors.label,
  },
  footer: { flexDirection: 'row', justifyContent: 'center', gap: 6, paddingBottom: spacing.md },
  footerLink: { fontWeight: '500', textDecorationLine: 'underline', color: colors.ink },
});
