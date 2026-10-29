# Arena Airsoft — App (Expo)

Primeira versão navegável do app Arena Airsoft em React Native/Expo, reproduzindo as telas do protótipo de UX/UI.

🔗 **No ar:** (publicando no Vercel)

Este projeto faz parte do [portfólio de UX/UI design de Yara Fabricia](https://arenaairsoftapp.vercel.app). É uma versão **front-end apenas**, com dados fixos (mock) — sem backend, sem banco de dados e sem login real. Serve para mostrar as telas funcionando de forma navegável, como primeiro passo rumo a um app de verdade. O [case completo de design](https://arenaairsoftapp.vercel.app/cases/arena-airsoft.html) tem a pesquisa, as decisões e os testes de usabilidade reais por trás das telas.

## Telas

Login, Cadastro, Recuperar senha, Lista de partidas, Página da partida (vagas, confirmar presença, cancelar), Equipamentos obrigatórios/recomendados, Aluguel de equipamento, Regras da partida, Criar partida (organizador) e Perfil.

## Stack

[Expo](https://expo.dev) (React Native) com TypeScript e `expo-router`. Dados em memória (React Context), sem persistência. Build de web via `npx expo export -p web`, publicado no [Vercel](https://vercel.com).

## Rodando localmente

```
npm install
npx expo start
```
