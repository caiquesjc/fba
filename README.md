# FBA
## Trabalho de Graduação

<br/>

## [Fatec São José dos Campos – Prof. Jessen Vidal](http://fatecsjc-prd.azurewebsites.net)

<br/>

### Disciplina: **Programação Para Dispositivos  Móveis**
<br/>

# Sumário
* [Aplicativo](#aplicativo)
* [Tecnologias](#tecnologias)
* [Executar](#executar)
  * [Pré-requisitos](#pré-requisitos)
  * [Configurações](#configurações)
# Aplicativo
FBA é um aplicativo onde o usuário pode visualizar os cursos disponibilizados pela empresa [Formando Barbeiros](https://www.barbeariasorriso.com.br) e também o percentual de conclusão de cada curso.


# Tecnologias
As seguintes ferramentas foram usadas na construção do aplicativo:
* [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
* [NodeJs](https://nodejs.org/)
  
Bibliotecas:

* [expo](https://docs.expo.dev/)
* [react-native](https://reactnative.dev/)
* [react navigation](https://reactnavigation.org)
* [axios](https://reactnative.dev/)
* [react-native-elements](https://reactnativeelements.com/)
* [lottie](https://docs.expo.dev/versions/latest/sdk/lottie/)
* [expo-secure-store](https://docs.expo.dev/versions/v43.0.0/sdk/securestore/)
* [react native youtube iframe](https://www.npmjs.com/package/react-native-youtube-iframe)


# Executar
Se quiser executar o projeto, siga as instruções:

### Pré-requisitos:
* [NodeJS 15.14.0](https://nodejs.org/en/)
* [API do projeto](/server/)
* [Expo GO](https://expo.dev/client)

### Configurações:
Altere o arquivo [api.js](fba/src/services/api.js), e coloque o _host_ da API que está executando.
```
const api = axios.create({
    baseURL: "host_da_api"
});
```

Para executar entre na pasta [fba](/fba/) e execute:
```
npm install
expo start
```

Abra o Expo GO e escaneie o _QRCode_.



