
import type { Book } from "./bookService";

interface BookItemProps {
  book: Book;
  onRemove: () => void;
  onEdit: () => void;
}

function BookItem({
  book,
  onRemove,
  onEdit,
}: BookItemProps) {
  return (
    <li>
      <h3>{book.title}</h3>

      <p>Autor: {book.author}</p>

      <p>
        Status:{" "}
        <span
          className={
            book.status === "Lido"
              ? "status status--read"
              : "status status--unread"
          }
        >
          {book.status}
        </span>
      </p>

      <button type="button" onClick={onEdit}>
        Editar
      </button>

      <button type="button" onClick={onRemove}>
        Remover
      </button>
    </li>
  );
}

export default BookItem;
