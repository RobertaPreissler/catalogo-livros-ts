
import { useEffect, useState } from "react";
import "./App.css";
import BookList from "./BookList";
import BookForm from "./BookForm";
import {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
  type Book,
} from "./bookService";

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBooks() {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch {
        setError("Não foi possível carregar os livros.");
      } finally {
        setLoading(false);
      }
    }

    void loadBooks();
  }, []);

  async function handleSave(
    bookData: Omit<Book, "_id">
  ): Promise<boolean> {
    try {
      setError("");

      if (editingBook?._id) {
        await updateBook(editingBook._id, {
          ...bookData,
          _id: editingBook._id,
        });

        setBooks((currentBooks) =>
          currentBooks.map((book) =>
            book._id === editingBook._id
              ? { ...book, ...bookData }
              : book
          )
        );
      } else {
        const newBook = await addBook(bookData);
        setBooks((currentBooks) => [...currentBooks, newBook]);
      }

      setEditingBook(null);
      return true;
    } catch {
      setError("Não foi possível salvar o livro. Tente novamente.");
      return false;
    }
  }

  async function handleRemoveBook(index: number) {
    const book = books[index];

    if (!book?._id) {
      setError("Não foi possível identificar esse livro.");
      return;
    }

    try {
      setError("");
      await deleteBook(book._id);

      setBooks((currentBooks) =>
        currentBooks.filter((currentBook) => currentBook._id !== book._id)
      );

      if (editingBook?._id === book._id) {
        setEditingBook(null);
      }
    } catch {
      setError("Não foi possível remover o livro.");
    }
  }

  function handleEdit(index: number) {
    const book = books[index];

    if (!book) {
      setError("Não foi possível encontrar esse livro.");
      return;
    }

    setEditingBook(book);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="container">
      <h1>📚 Catálogo de Livros</h1>
      <p>Cadastre e organize seus livros.</p>

      <BookForm
        editingBook={editingBook}
        onSave={handleSave}
        onCancel={() => setEditingBook(null)}
      />

      {error && <p role="alert">{error}</p>}

      <section>
        <h2>Meus livros ({books.length})</h2>

        {loading ? (
          <p>Carregando livros...</p>
        ) : (
          <BookList
            books={books}
            onRemove={(index) => void handleRemoveBook(index)}
            onEdit={handleEdit}
          />
        )}
      </section>
    </main>
  );
}

export default App;
