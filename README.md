# Brain Ag Challenge
Link: [https://brain-agriculture-challenge.vercel.app/](https://brain-agriculture-challenge.vercel.app/)

Projeto desenvolvido para contemplar o desafio técnico da [Brain Ag](https://www.brain.agr.br/).

## Stack
O projeto foi desenvolvido com **React + Vite** por conta da simplicidade, com algumas bibliotecas auxiliares. Foi utilizado **Tailwind CSS** para a estilização, junto de componentes do **shadcn/ui** para um desenvolvimento mais acelerado. Foi utilizado também **JSON Server** para simular uma API e o **React Query** para já deixar o Front-end estruturado para se comunicar com uma API de verdade. Para compartilhar estados, foi utilizado o **Redux Toolkit**.

## Opiniões pessoais de desenvolvimento
- **Vite**: o contexto da aplicação me parecer ser um Backoffice, o que elimina a necessidade de SEO, Server Side Rendering, e a aplicação fica mais simples se construída sem um framework como Next.js;
- **Redux**: utilizei Redux pois foi solicitado no desafio, mas dado que o React Query está configurado para cachear as requisições, somente ele já seria o suficiente para compartilhar os estados necessários pela API. O meu cenário ideal de desenvolvimento se daria apenas com React Query e um hook personalizado para obter as informações da Dashboard. Caso a aplicação for crescer, é bom que o Redux já esteja instalado, mas eu consideraria utilizar o [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction).

## Como rodar localmente

Apesar do projeto estar em um ambiente, caso você queira rodar sua própria versão, pode clonar esse repositório e seguir os passos:

1. **Clone o repositório**:
   - Abra o terminal e clone o repositório usando o comando:
     ```bash
     git clone https://github.com/huri3l/brain-agriculture-challenge
     ```
   - Navegue até o diretório do projeto:
     ```bash
     cd brain-agriculture-challenge
     ```

2. **Instale as dependências**:
   - Ainda no terminal, instale as dependências do projeto:
     ```bash
     npm install
     ```

3. **Crie o arquivo `.env.local`**:
   - Antes de iniciar o servidor de desenvolvimento, é necessário criar um arquivo `.env.local` na raiz do projeto com a seguinte variável de ambiente:
     ```plaintext
     VITE_API_BASE_URL=http://localhost:3100
     ```
   - Você pode seguir o exemplo no arquivo `.env.example` presente no repositório.

4. **Inicie o JSON Server**:
   - O JSON Server simula uma API para o projeto. Para iniciar o servidor, use o comando:
     ```bash
     npm run api
     ```
   - Este comando irá iniciar o JSON Server, que deve rodar antes de iniciar a aplicação React.

5. **Inicie o servidor de desenvolvimento do React**:
   - Em uma nova aba do terminal, inicie o servidor de desenvolvimento do Vite:
     ```bash
     npm run dev
     ```
   - Esse comando irá iniciar o projeto React, e a aplicação estará disponível em `http://localhost:3000` (ou outra porta especificada pelo Vite).

6. **Acesse a aplicação**:
   - Abra um navegador e acesse `http://localhost:3000` para visualizar o projeto em execução.

