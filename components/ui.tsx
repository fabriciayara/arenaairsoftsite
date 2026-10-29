import React from 'react';
import {
  Pressable,
  Text,
  TextInput,
  TextInputProps,
  View,
  StyleSheet,
  ScrollView,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../lib/theme';

export function Screen({
  children,
  scroll = true,
  style,
}: {
  children: React.ReactNode;
  scroll?: boolean;
  style?: ViewStyle;
}) {
  const inner = (
    <View style={[styles.screenInner, style]}>{children}</View>
  );
  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      {scroll ? (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {inner}
        </ScrollView>
      ) : (
        inner
      )}
    </SafeAreaView>
  );
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled,
}: {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'text';
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        variant === 'primary' && styles.buttonPrimary,
        variant === 'outline' && styles.buttonOutline,
        variant === 'text' && styles.buttonText,
        disabled && { opacity: 0.5 },
        pressed && { opacity: 0.85 },
      ]}
    >
      <Text
        style={[
          styles.buttonLabel,
          variant === 'outline' && { color: colors.ink },
          variant === 'text' && { color: colors.ink, textDecorationLine: 'underline' },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

export function Field({
  label,
  ...props
}: { label: string } & TextInputProps) {
  return (
    <View style={{ gap: spacing.xs }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrap}>
        <TextInput
          placeholderTextColor={colors.textFaint}
          style={styles.input}
          {...props}
        />
      </View>
    </View>
  );
}

export function Pill({
  label,
  tone = 'neutral',
}: {
  label: string;
  tone?: 'neutral' | 'orange' | 'green' | 'red';
}) {
  const toneStyle =
    tone === 'orange'
      ? { backgroundColor: colors.orangeBg, color: colors.primary }
      : tone === 'green'
      ? { backgroundColor: colors.greenBg, color: colors.green }
      : tone === 'red'
      ? { backgroundColor: colors.redBg, color: colors.red }
      : { backgroundColor: colors.surface, color: colors.textMuted };
  return (
    <View style={[styles.pill, { backgroundColor: toneStyle.backgroundColor }]}>
      <Text style={[styles.pillLabel, { color: toneStyle.color }]}>{label}</Text>
    </View>
  );
}

export function Card({
  children,
  style,
  onPress,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}) {
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.card, style, pressed && { opacity: 0.9 }]}
      >
        {children}
      </Pressable>
    );
  }
  return <View style={[styles.card, style]}>{children}</View>;
}

export function Callout({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: 'neutral' | 'red' }) {
  return (
    <View
      style={[
        styles.callout,
        tone === 'red' && { backgroundColor: colors.redBg, borderColor: colors.red },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  screenInner: { flex: 1, padding: spacing.lg, gap: spacing.md },
  label: { fontSize: 12, fontWeight: '400', color: colors.label },
  inputWrap: {
    height: 48,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  input: { fontSize: 16, color: colors.text, padding: 0 },
  button: {
    height: 52,
    borderRadius: radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  buttonPrimary: { backgroundColor: colors.primary },
  buttonOutline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border },
  buttonText: { backgroundColor: 'transparent', height: 'auto' as any },
  buttonLabel: { fontSize: 16, fontWeight: '500', color: colors.ink },
  pill: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: radius.badge, alignSelf: 'flex-start' },
  pillLabel: { fontSize: 12, fontWeight: '500' },
  card: {
    backgroundColor: colors.bg,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.md,
    gap: spacing.sm,
  },
  callout: {
    backgroundColor: colors.surface,
    borderLeftWidth: 3,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    gap: 4,
  },
});
