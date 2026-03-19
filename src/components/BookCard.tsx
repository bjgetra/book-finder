import { Link } from "react-router-dom";
import type { Book } from "../types/book";
import { getCoverUrl } from "../utils/format";

interface BookCardProps {
  book: Book;
}

/**
 * Extrait l'ID du livre depuis la clé Open Library.
 * Exemple : "/works/OL82563W" → "OL82563W"
 */
function extractWorkId(key: string): string {
  return key.replace("/works/", "");
}

function BookCard({ book }: BookCardProps) {
  const coverUrl = getCoverUrl(book.cover_i);
  const workId = extractWorkId(book.key);

  return (
    <Link
      to={`/book/${workId}`}
      className="flex gap-4 rounded-lg bg-white p-4 shadow transition-shadow hover:shadow-md"
    >
      {/* Couverture */}
      <div className="h-40 w-28 shrink-0 overflow-hidden rounded bg-gray-200">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={`Couverture de ${book.title}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-gray-400">
            Pas de couverture
          </div>
        )}
      </div>

      {/* Infos */}
      <div className="flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">{book.title}</h3>
          <p className="mt-1 text-sm text-gray-600">
            {book.author_name?.join(", ") ?? "Auteur inconnu"}
          </p>
        </div>

        <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
          {book.first_publish_year && (
            <span className="rounded-full bg-gray-100 px-2 py-1">
              {book.first_publish_year}
            </span>
          )}
          {book.number_of_pages_median && (
            <span className="rounded-full bg-gray-100 px-2 py-1">
              {book.number_of_pages_median} pages
            </span>
          )}
          {book.edition_count && (
            <span className="rounded-full bg-gray-100 px-2 py-1">
              {book.edition_count} éditions
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default BookCard;
