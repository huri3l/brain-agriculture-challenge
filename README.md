# Brain Ag Challenge
Link: [https://brain-agriculture-challenge.vercel.app/](https://brain-agriculture-challenge.vercel.app/)

Projeto desenvolvido para contemplar o desafio técnico da [Brain Ag](https://www.brain.agr.br/).

## Stack
O projeto foi desenvolvido com **React + Vite** por conta da simplicidade, com algumas bibliotecas auxiliares. Foi utilizado **Tailwind CSS** para a estilização, junto de componentes do **shadcn/ui** para um desenvolvimento mais acelerado. Foi utilizado também **JSON Server** para simular uma API e o **React Query** para já deixar o Front-end estruturado para se comunicar com uma API de verdade. Para compartilhar estados, foi utilizado o **Redux Toolkit**.

## Opiniões pessoais de desenvolvimento
- **Vite**: o contexto da aplicação me parecer ser um Backoffice, o que elimina a necessidade de SEO, Server Side Rendering, e a aplicação fica mais simples se construída sem um framework como Next.js;
- **Redux**: utilizei Redux pois foi solicitado no desafio, mas dado que o React Query está configurado para cachear as requisições, somente ele já seria o suficiente para compartilhar os estados necessários pela API. O meu cenário ideal de desenvolvimento se daria apenas com React Query e um hook personalizado para obter as informações da Dashboard. Caso a aplicação for crescer, é bom que o Redux já esteja instalado, mas eu consideraria utilizar o [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction).
