
export interface Book {
  _id?: string;
  title: string;
  author: string;
  status: "Lido" | "Não lido";
}

const STORAGE_KEY = "catalogo-livros";

function readBooks(): Book[] {
  const savedBooks = localStorage.getItem(STORAGE_KEY);

  if (!savedBooks) {
    return [];
  }

  try {
    const data: unknown = JSON.parse(savedBooks);

    if (Array.isArray(data)) {
      return data as Book[];
    }

    return [];
  } catch {
    return [];
  }
}

function saveBooks(books: Book[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

// Buscar todos os livros
export async function getBooks(): Promise<Book[]> {
  return readBooks();
}

// Cadastrar um livro
export async function addBook(
  book: Omit<Book, "_id">
): Promise<Book> {
  const newBook: Book = {
    ...book,
    _id: crypto.randomUUID(),
  };

  const books = readBooks();
  books.push(newBook);
  saveBooks(books);

  return newBook;
}

// Atualizar um livro
export async function updateBook(
  id: string,
  book: Book
): Promise<void> {
  const books = readBooks();

  const updatedBooks = books.map((currentBook) =>
    currentBook._id === id
      ? { ...currentBook, ...book, _id: id }
      : currentBook
  );

  saveBooks(updatedBooks);
}

// Remover um livro
export async function deleteBook(id: string): Promise<void> {
  const books = readBooks();
  const remainingBooks = books.filter((book) => book._id !== id);

  saveBooks(remainingBooks);
}
