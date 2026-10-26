
import BookItem from "./BookItem";
import type { Book } from "./bookService";

interface BookListProps {
  books: Book[];
  onRemove: (index: number) => void;
  onEdit: (index: number) => void;
}

function BookList({
  books,
  onRemove,
  onEdit,
}: BookListProps) {
  if (books.length === 0) {
    return <p>Nenhum livro cadastrado.</p>;
  }

  return (
    <ul>
      {books.map((book, index) => (
        <BookItem
          key={book._id ?? `${book.title}-${index}`}
          book={book}
          onRemove={() => onRemove(index)}
          onEdit={() => onEdit(index)}
        />
      ))}
    </ul>
  );
}

export default BookList;
