# Cardápio Digital

Sistema de gerenciamento de cardápio digital desenvolvido com [Next.js](https://nextjs.org) 14. Este projeto foi criado usando [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Funcionalidades

- Autenticação de usuários
- CRUD completo de itens do cardápio  
- Upload de imagens
- Tema claro/escuro
- Interface responsiva
- Filtragem por categoria e busca

## Tecnologias

- **Frontend:** Next.js 14, TailwindCSS, shadcn/ui
- **Backend:** Prisma, PostgreSQL
- **Autenticação:** @stackframe/stack
- **Upload:** uploadthing

## Começando

Primeiro, execute o servidor de desenvolvimento:

```bash
# Clone o repositório
git clone github.com/luisgustavogorniak/cardapio

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Execute as migrations
npx prisma migrate dev

# Inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Aprenda Mais

Para saber mais sobre Next.js, consulte os seguintes recursos:

- [Documentação do Next.js](https://nextjs.org/docs)
- [Aprenda Next.js](https://nextjs.org/learn)

## Deploy na Vercel

A maneira mais fácil de fazer deploy do seu app Next.js é usar a [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Confira nossa [documentação de deploy do Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.
