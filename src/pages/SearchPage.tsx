import { useState, useEffect } from "react";

import SearchBar from "../components/SearchBar";
import type { Book } from "../types/book";
import { searchBooks } from "../api/searchBooks";
import BookList from "../components/BookList";

function App() {
  // --- State ---
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // --- Effet : appeler l'API quand searchTerm change ---
  useEffect(() => {
    // Si pas de terme de recherche, on ne fait rien
    if (searchTerm.length === 0) return;

    async function fetchBooks() {
      setLoading(true);
      setError(null);

      try {
        const data = await searchBooks(searchTerm);
        setBooks(data.docs);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, [searchTerm]); // ← Tableau de dépendances

  // --- Callback de recherche ---
  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Contenu principal */}
      <main className="mx-auto max-w-5xl px-4 py-8">
        <SearchBar onSearch={handleSearch} />

        {/* Zone de résultats */}
        <div className="mt-8">
          {loading && (
            <p className="text-center text-gray-500">Chargement...</p>
          )}

          {error && (
            <p className="text-center text-red-600">
              Une erreur est survenue : {error}
            </p>
          )}

          {!loading && !error && books.length > 0 && (
            <p className="mb-4 text-sm text-gray-500">
              {books.length} résultats affichés
            </p>
          )}

          {!loading &&
            !error &&
            searchTerm.length > 0 &&
            books.length === 0 && (
              <p className="text-center text-gray-500">
                Aucun résultat pour "{searchTerm}"
              </p>
            )}

          {!loading && !error && books.length > 0 && (
            <>
              <p className="mb-4 text-sm text-gray-500">
                {books.length} résultats affichés
              </p>
              <BookList books={books} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
