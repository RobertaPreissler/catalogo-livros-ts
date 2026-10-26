
import { useEffect, useState } from "react";
import "./App.css";
import BookList from "./BookList";
import {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
  type Book,
} from "./bookService";

function App() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState<"Lido" | "Não lido">("Não lido");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Buscar livros quando a página abrir
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

    loadBooks();
  }, []);

  // Limpar o formulário
  function resetForm() {
    setTitle("");
    setAuthor("");
    setStatus("Não lido");
    setEditingId(null);
  }

  // Cadastrar ou atualizar um livro
  async function handleSubmit() {
    if (title.trim() === "" || author.trim() === "") {
      alert("Preencha o título e o autor!");
      return;
    }

    try {
      setError("");

      if (editingId) {
        await updateBook(editingId, {
          title: title.trim(),
          author: author.trim(),
          status,
        });

        setBooks((currentBooks) =>
          currentBooks.map((book) =>
            book._id === editingId
              ? {
                  ...book,
                  title: title.trim(),
                  author: author.trim(),
                  status,
                }
              : book
          )
        );
      } else {
        const newBook = await addBook({
          title: title.trim(),
          author: author.trim(),
          status,
        });

        setBooks((currentBooks) => [...currentBooks, newBook]);
      }

      resetForm();
    } catch {
      setError("Não foi possível salvar o livro. Tente novamente.");
    }
  }

  // Colocar os dados do livro no formulário
  function handleEdit(index: number) {
    const book = books[index];

    if (!book._id) {
      setError("Não foi possível identificar esse livro.");
      return;
    }

    setTitle(book.title);
    setAuthor(book.author);
    setStatus(book.status);
    setEditingId(book._id);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Remover um livro da API
  async function handleRemoveBook(index: number) {
    const book = books[index];

    if (!book._id) {
      setError("Não foi possível identificar esse livro.");
      return;
    }

    try {
      setError("");
      await deleteBook(book._id);

      setBooks((currentBooks) =>
        currentBooks.filter((_, currentIndex) => currentIndex !== index)
      );

      if (editingId === book._id) {
        resetForm();
      }
    } catch {
      setError("Não foi possível remover o livro.");
    }
  }

  return (
    <main className="container">
      <h1>📚 Catálogo de Livros</h1>
      <p>Cadastre e organize seus livros.</p>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit();
        }}
      >
        <h2>{editingId ? "Editar livro" : "Cadastrar livro"}</h2>

        <label htmlFor="title">Título do livro</label>
        <input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Digite o título"
          required
        />

        <label htmlFor="author">Autor</label>
        <input
          id="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          placeholder="Digite o autor"
          required
        />

        <label htmlFor="status">Status de leitura</label>
        <select
          id="status"
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as "Lido" | "Não lido")
          }
        >
          <option value="Não lido">Não lido</option>
          <option value="Lido">Lido</option>
        </select>

        <button type="submit">
          {editingId ? "Salvar alterações" : "Adicionar livro"}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm}>
            Cancelar edição
          </button>
        )}
      </form>

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
