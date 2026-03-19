import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getWorkDetail, getAuthor } from "../api/getWorkDetail";
import { extractText, getCoverUrl } from "../utils/format";
import type { WorkDetail, Author } from "../types/book";
import Spinner from "../components/Spinner";

function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [work, setWork] = useState<WorkDetail | null>(null);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(id);

    async function fetchWorkDetail() {
      setLoading(true);
      setError(null);

      try {
        // 1. Récupérer le détail du livre
        const workData = await getWorkDetail(id);

        setWork(workData);

        // 2. Récupérer les auteurs (en parallèle si plusieurs)
        if (workData.authors && workData.authors.length > 0) {
          const authorPromises = workData.authors.map((item) =>
            getAuthor(item.author.key),
          );
          const authorsData = await Promise.all(authorPromises);

          setAuthors(authorsData);
          setLoading(false);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      }
    }

    fetchWorkDetail();
  }, [id]);

  // --- États de chargement et d'erreur ---

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-red-600">{error}</p>
        <Link
          to="/"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          ← Retour à la recherche
        </Link>
      </div>
    );
  }

  if (!work) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">Livre introuvable.</p>
        <Link
          to="/"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          ← Retour à la recherche
        </Link>
      </div>
    );
  }

  // --- Rendu principal ---

  const description = extractText(work.description);
  const coverUrl = getCoverUrl(work.covers?.[0], "L");

  return (
    <div>
      {/* Bouton retour */}
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1 text-blue-600 hover:underline"
      >
        ← Retour à la recherche
      </Link>

      {/* Contenu principal */}
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Couverture */}
        <div className="shrink-0">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={`Couverture de ${work.title}`}
              className="w-48 rounded-lg shadow-md md:w-64"
            />
          ) : (
            <div className="flex h-80 w-48 items-center justify-center rounded-lg bg-gray-200 text-sm text-gray-400 md:w-64">
              Pas de couverture
            </div>
          )}
        </div>

        {/* Informations */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-900">{work.title}</h2>

          {/* Auteurs */}
          {authors.length > 0 && (
            <p className="mt-2 text-lg text-gray-600">
              {authors.map((a) => a.name).join(", ")}
            </p>
          )}

          {/* Date de publication */}
          {work.first_publish_date && (
            <p className="mt-1 text-sm text-gray-500">
              Première publication : {work.first_publish_date}
            </p>
          )}

          {/* Description */}
          {description && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Description
              </h3>
              <p className="mt-2 leading-relaxed text-gray-700">
                {description}
              </p>
            </div>
          )}

          {/* Sujets */}
          {work.subjects && work.subjects.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">Sujets</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {work.subjects.slice(0, 12).map((subject) => (
                  <span
                    key={subject}
                    className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDetailPage;
