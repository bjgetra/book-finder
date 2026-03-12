import type { Book } from "../types/book";
import BookCard from "./BookCard";

interface BookListProps {
  books: Book[];
}

function BookList({ books }: BookListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {books.map((book) => (
        <BookCard key={book.key} book={book} />
      ))}
    </div>
  );
}

export default BookList;
