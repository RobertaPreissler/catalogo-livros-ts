# Catalogo de Livros

Aplicacao desenvolvida com React e TypeScript para gerenciar uma colecao de livros.

## Funcionalidades

- Cadastrar livros.
- Listar livros cadastrados.
- Editar livros.
- Excluir livros.
- Definir o status de leitura: lido ou nao lido.
- Salvar os dados no localStorage do navegador.

## Tecnologias

- React
- TypeScript
- Vite
- HTML e CSS
- Git e GitHub

## Como executar

```bash
npm install
npm run dev
```

Para gerar a versao de producao:

```bash
npm run build
```

## Persistencia

Os livros sao salvos no localStorage do navegador e permanecem disponiveis apos atualizar a pagina no mesmo navegador.

## Estrutura principal

- `src/App.tsx`: componente principal.
- `src/BookForm.tsx`: formulario de cadastro e edicao.
- `src/BookList.tsx`: listagem de livros.
- `src/BookItem.tsx`: item individual.
- `src/bookService.ts`: operacoes de armazenamento.

## Autora

Roberta Preissler