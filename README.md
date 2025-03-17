# FullStack Challenge

## Descrição

Este projeto é um desafio FullStack que consiste em clonar páginas e APIs de um produto que eu gosto, trazendo melhorias ou funcionalidades adicionais. O objetivo é demonstrar habilidades de desenvolvimento frontend e backend, integrando ambos os lados para fornecer uma experiência completa.

## Tecnologias Utilizadas

Backend:

-   Node.js

-   Express.js

-   PostgreSQL (via Sequelize)

-   Autenticação com JWT

-   Testes com Jest

-   Documentação da API com Swagger

Frontend:

-   Next.js

-   Axios para consumo da API

-   Styled Components/TailwindCSS para estilização

-   Responsividade

-   Componentização

-   Testes com Jest

-   Storybook para documentação de componentes

*   Funcionalidades Implementadas

-   CRUD de recursos escolhidos para a API

-   Login e autenticação JWT

-   Integração frontend e backend

-   Responsividade e usabilidade aprimoradas

-   Testes unitários e de integração

-   Documentação de API e componentes

Como Executar o Projeto

Backend

Clone o repositório:

```bash
  git clone https://github.com/tiagogb21/spotify-clone-teste
```

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Configure as variáveis de ambiente (exemplo no .env.example).

Execute as migrações do banco de dados:

```bash
npx sequelize db:migrate
```

Inicie o servidor:

```bash
npm start
```

Frontend

Acesse a pasta do frontend:

```bash
  cd frontend
```

Instale as dependências:

```bash
  npm install
```

Inicie a aplicação:

```bash
  npm run dev
```
