import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  AnuncioAluguel,
  ANUNCIOS_INICIAIS,
  Partida,
  PARTIDAS_INICIAIS,
  Usuario,
  USUARIO_INICIAL,
} from './mock-data';

type AppState = {
  logado: boolean;
  usuario: Usuario;
  partidas: Partida[];
  anuncios: AnuncioAluguel[];
  entrar: () => void;
  sair: () => void;
  atualizarPerfil: (dados: Partial<Usuario>) => void;
  confirmarPresenca: (partidaId: string) => void;
  cancelarPresenca: (partidaId: string) => void;
  cancelarPartida: (partidaId: string) => void;
  criarPartida: (dados: Pick<Partida, 'titulo' | 'dataLabel' | 'local' | 'vagasTotal' | 'regrasAdicionais'>) => Partida;
  cadastrarAnuncio: (dados: Pick<AnuncioAluguel, 'item' | 'descricao' | 'precoLabel' | 'contato'>) => AnuncioAluguel;
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [logado, setLogado] = useState(false);
  const [usuario, setUsuario] = useState<Usuario>(USUARIO_INICIAL);
  const [partidas, setPartidas] = useState<Partida[]>(PARTIDAS_INICIAIS);
  const [anuncios, setAnuncios] = useState<AnuncioAluguel[]>(ANUNCIOS_INICIAIS);

  const value = useMemo<AppState>(
    () => ({
      logado,
      usuario,
      partidas,
      anuncios,
      entrar: () => setLogado(true),
      sair: () => setLogado(false),
      atualizarPerfil: (dados) => setUsuario((prev) => ({ ...prev, ...dados })),
      confirmarPresenca: (partidaId) =>
        setPartidas((prev) =>
          prev.map((p) =>
            p.id === partidaId ? { ...p, presencaUsuarioConfirmada: true } : p
          )
        ),
      cancelarPresenca: (partidaId) =>
        setPartidas((prev) =>
          prev.map((p) =>
            p.id === partidaId ? { ...p, presencaUsuarioConfirmada: false } : p
          )
        ),
      cancelarPartida: (partidaId) =>
        setPartidas((prev) =>
          prev.map((p) => (p.id === partidaId ? { ...p, status: 'cancelada' } : p))
        ),
      criarPartida: (dados) => {
        const nova: Partida = {
          id: `p${Date.now()}`,
          titulo: dados.titulo,
          dataLabel: dados.dataLabel,
          local: dados.local,
          organizador: usuario.nome,
          vagasTotal: dados.vagasTotal,
          confirmados: [],
          pendentes: [],
          status: 'aberta',
          presencaUsuarioConfirmada: false,
          regrasAdicionais: dados.regrasAdicionais,
        };
        setPartidas((prev) => [nova, ...prev]);
        return nova;
      },
      cadastrarAnuncio: (dados) => {
        const novo: AnuncioAluguel = {
          id: `a${Date.now()}`,
          item: dados.item,
          descricao: dados.descricao,
          precoLabel: dados.precoLabel,
          anuncianteNome: usuario.nome,
          anuncianteTipo: usuario.tipo,
          contato: dados.contato,
        };
        setAnuncios((prev) => [novo, ...prev]);
        return novo;
      },
    }),
    [logado, usuario, partidas, anuncios]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp precisa estar dentro de <AppProvider>');
  return ctx;
}
