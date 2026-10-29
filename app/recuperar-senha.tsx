import React, { useState } from 'react';
import { Text, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { Button, Field, Screen } from '../components/ui';
import { colors, spacing } from '../lib/theme';

export default function RecuperarSenha() {
  const [email, setEmail] = useState('');

  function handleEnviar() {
    Alert.alert(
      'Link enviado',
      email ? `Enviamos um link de recuperação pra ${email}.` : 'Enviamos um link de recuperação pro seu e-mail.',
      [{ text: 'Ok', onPress: () => router.back() }]
    );
  }

  return (
    <Screen>
      <Text style={styles.subtitle}>
        Informe o e-mail da sua conta. Vamos te enviar um link pra criar uma nova senha.
      </Text>
      <Field
        label="E-mail"
        placeholder="seuemail@exemplo.com"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Enviar link de recuperação" onPress={handleEnviar} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  subtitle: { fontSize: 14, color: colors.textMuted, marginBottom: spacing.xs },
});
