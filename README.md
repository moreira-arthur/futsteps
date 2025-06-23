# FutSteps Mobile

Aplicativo React Native para monitoramento de talentos esportivos.

## Pré-requisitos

- Node.js >= 16.x
- npm >= 8.x ou yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio/Xcode (para rodar em emulador/simulador)
- [EAS CLI](https://docs.expo.dev/eas/) (opcional, para builds avançados)

## Instalação

Clone o repositório e instale as dependências:

```sh
git clone https://github.com/moreira-arthur/futsteps
cd futsteps
npm install
# ou
yarn
```

## Rodando o Projeto

Para rodar o app em modo de desenvolvimento:

```sh
npx expo start
```

- Siga as instruções do terminal para abrir no emulador Android/iOS ou no seu dispositivo físico usando o app Expo Go.

## Rodando os Testes

Os testes utilizam o Jest e o Testing Library para React Native.

Para rodar todos os testes:

```sh
npm test
# ou
yarn test
```

Para rodar um teste específico:

```sh
npm test -- src/tests/caminho/do/arquivo.test.tsx
```

## Estrutura dos Testes

Os testes estão localizados na pasta [`src/tests`](src/tests).

## Observações

- Certifique-se de que as dependências nativas estejam instaladas corretamente para rodar em dispositivos físicos/emuladores.
- Para builds de produção, utilize o EAS Build (`eas build`).

---

Qualquer dúvida, consulte a documentação oficial do [Expo](https://docs.expo.dev/) ou abra uma