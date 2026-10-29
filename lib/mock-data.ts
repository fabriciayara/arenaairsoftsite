export type TipoConta = 'jogador' | 'organizador';

export type Usuario = {
  nome: string;
  email: string;
  telefone: string;
  tipo: TipoConta;
};

export type Jogador = {
  id: string;
  nome: string;
};

export type Partida = {
  id: string;
  titulo: string;
  dataLabel: string;
  local: string;
  organizador: string;
  vagasTotal: number;
  confirmados: Jogador[];
  pendentes: Jogador[];
  status: 'aberta' | 'cancelada';
  presencaUsuarioConfirmada: boolean;
  regrasAdicionais: string[];
};

export const EQUIPAMENTO_OBRIGATORIO = [
  'Óculos de proteção balístico',
  'Luvas',
];

export const EQUIPAMENTO_RECOMENDADO = [
  'Roupa camuflada ou de cor neutra',
  'Réplica (arma de airsoft) revisada',
  'Munição (BBs) compatível com a réplica',
  'Garrafa de água',
];

export const REGRAS_PADRAO = [
  'Óculos de proteção balístico o tempo todo em área de jogo',
  'Distância mínima de segurança pra tiro a queima-roupa',
  'Fogo amigo chamado em voz alta: "Acertei!"',
  'Limite de FPS da réplica: até 350 fps (gás ou elétrica)',
];

export const CONSEQUENCIA_REGRA =
  'Descumprir uma regra de segurança pode resultar em advertência ou remoção da partida, a critério do organizador.';

export const USUARIO_INICIAL: Usuario = {
  nome: 'Rafael Souza',
  email: 'rafael.souza@exemplo.com',
  telefone: '(11) 9 8888-7777',
  tipo: 'jogador',
};

export const PARTIDAS_INICIAIS: Partida[] = [
  {
    id: 'p1',
    titulo: 'Operação Trincheira',
    dataLabel: 'Sáb, 08 nov · 14h',
    local: 'Campo Base Airsoft — Guarulhos, SP',
    organizador: 'Carlos Mendes',
    vagasTotal: 20,
    confirmados: [
      { id: 'u1', nome: 'Eduardo Lima' },
      { id: 'u2', nome: 'Marcos Paiva' },
      { id: 'u3', nome: 'Luís Andrade' },
    ],
    pendentes: [{ id: 'u4', nome: 'Antony Reis' }],
    status: 'aberta',
    presencaUsuarioConfirmada: false,
    regrasAdicionais: ['Jogo noturno: lanterna com luz vermelha obrigatória após 18h.'],
  },
  {
    id: 'p2',
    titulo: 'CQB Noturno',
    dataLabel: 'Sex, 14 nov · 19h30',
    local: 'Arena Combate Urbano — Osasco, SP',
    organizador: 'Rafael Souza',
    vagasTotal: 12,
    confirmados: [
      { id: 'u2', nome: 'Marcos Paiva' },
      { id: 'u5', nome: 'Bruno Alves' },
    ],
    pendentes: [],
    status: 'aberta',
    presencaUsuarioConfirmada: true,
    regrasAdicionais: [],
  },
  {
    id: 'p3',
    titulo: 'Mata Fechada — Edição Verão',
    dataLabel: 'Dom, 23 nov · 09h',
    local: 'Sítio Vale Verde — Jundiaí, SP',
    organizador: 'Gustavo Ferreira',
    vagasTotal: 30,
    confirmados: [
      { id: 'u1', nome: 'Eduardo Lima' },
      { id: 'u3', nome: 'Luís Andrade' },
      { id: 'u6', nome: 'Pedro Costa' },
      { id: 'u7', nome: 'André Nogueira' },
    ],
    pendentes: [{ id: 'u8', nome: 'Breno Tavares' }],
    status: 'aberta',
    presencaUsuarioConfirmada: false,
    regrasAdicionais: ['Hidratação obrigatória — temperatura alta prevista.'],
  },
  {
    id: 'p4',
    titulo: 'Treino Tático de Sábado',
    dataLabel: 'Sáb, 01 nov · 10h',
    local: 'Campo Base Airsoft — Guarulhos, SP',
    organizador: 'Carlos Mendes',
    vagasTotal: 16,
    confirmados: [{ id: 'u5', nome: 'Bruno Alves' }],
    pendentes: [],
    status: 'cancelada',
    presencaUsuarioConfirmada: false,
    regrasAdicionais: [],
  },
];
