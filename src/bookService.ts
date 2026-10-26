
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/books`;

export interface Book {
  _id?: string;
  title: string;
  author: string;
  status: "Lido" | "Não lido";
}

// Buscar todos os livros
export async function getBooks(): Promise<Book[]> {
  const response = await axios.get<unknown>(API_URL);

  if (!Array.isArray(response.data)) {
    throw new Error(
      "A API não retornou uma lista de livros. Confira a URL."
    );
  }

  return response.data as Book[];
}

// Cadastrar um livro
export async function addBook(book: Book): Promise<Book> {
  const response = await axios.post<Book>(API_URL, book);
  return response.data;
}

// Atualizar um livro
export async function updateBook(
  id: string,
  book: Book
): Promise<void> {
  await axios.put(`${API_URL}/${id}`, {
    title: book.title,
    author: book.author,
    status: book.status,
  });
}

// Remover um livro
export async function deleteBook(id: string): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}
