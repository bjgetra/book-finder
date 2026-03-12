/**
 * Représente un livre retourné par l'API Open Library (Search endpoint).
 * Documentation : https://openlibrary.org/dev/docs/api/search
 */
export interface Book {
  key: string; // ex: "/works/OL82563W"
  title: string;
  author_name?: string[]; // Tableau car un livre peut avoir plusieurs auteurs
  first_publish_year?: number;
  cover_i?: number; // ID de la couverture (pour construire l'URL image)
  number_of_pages_median?: number;
  edition_count?: number;
}

/**
 * Structure de la réponse complète de l'API Search.
 */
export interface SearchResponse {
  numFound: number;
  start: number;
  docs: Book[];
}
