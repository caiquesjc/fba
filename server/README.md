## API para o aplicativo [FBA](https://github.com/caiquesjc/fba)

### Como executar localmente

#### Requisitos:

`
NodeJS 15.14.0
`

#### Configuração:
Crie um arquivo _.env_ na raiz do projeto, ou seja, na pasta onde está o arquivo _index.js_ contendo as seguintes variáveis:
```
DB_HOST=<ip_do_bd>
DB_PORT=<porta_do_bd>
DB_USER=<usuario_bd>
DB_PASSWORD=<senha_bd>
DB_DATABASE=<nome_db>
```

#### Exeutar

Para executar execute os comandos na raiz do projeto:

```
npm install
npm start
```
