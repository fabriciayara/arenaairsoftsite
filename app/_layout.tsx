import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from '../lib/store';
import { colors } from '../lib/theme';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: colors.bg },
            headerTintColor: colors.ink,
            headerShadowVisible: false,
            headerTitleStyle: { fontWeight: '600' },
            contentStyle: { backgroundColor: colors.bg },
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="cadastro" options={{ title: 'Criar conta' }} />
          <Stack.Screen name="recuperar-senha" options={{ title: 'Recuperar senha' }} />
          <Stack.Screen name="partidas/index" options={{ title: 'Partidas', headerBackVisible: false }} />
          <Stack.Screen name="criar-partida" options={{ title: 'Criar partida' }} />
          <Stack.Screen name="perfil" options={{ title: 'Perfil' }} />
          <Stack.Screen name="partida/[id]/index" options={{ title: 'Partida' }} />
          <Stack.Screen name="partida/[id]/equipamentos" options={{ title: 'Equipamentos' }} />
          <Stack.Screen name="partida/[id]/alugar-equipamento" options={{ title: 'Alugar equipamento' }} />
          <Stack.Screen name="partida/[id]/regras" options={{ title: 'Regras da partida' }} />
        </Stack>
      </AppProvider>
    </SafeAreaProvider>
  );
}
