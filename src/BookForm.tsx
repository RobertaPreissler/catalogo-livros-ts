
import { useEffect, useState } from "react";
import type { Book } from "./bookService";

interface BookFormProps {
  editingBook: Book | null;
  onSave: (book: Omit<Book, "_id">) => Promise<boolean>;
  onCancel: () => void;
}

function BookForm({
  editingBook,
  onSave,
  onCancel,
}: BookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState<"Lido" | "Não lido">("Não lido");

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setStatus(editingBook.status);
    } else {
      setTitle("");
      setAuthor("");
      setStatus("Não lido");
    }
  }, [editingBook]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!title.trim() || !author.trim()) {
      return;
    }

    const saved = await onSave({
      title: title.trim(),
      author: author.trim(),
      status,
    });

    if (saved) {
      setTitle("");
      setAuthor("");
      setStatus("Não lido");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingBook ? "Editar livro" : "Cadastrar livro"}</h2>

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
        {editingBook ? "Salvar alterações" : "Adicionar livro"}
      </button>

      {editingBook && (
        <button type="button" onClick={onCancel}>
          Cancelar edição
        </button>
      )}
    </form>
  );
}

export default BookForm;
