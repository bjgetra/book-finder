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

/**
 * Référence à un auteur dans un Work.
 * L'API ne donne que la clé, il faut un appel séparé pour le nom.
 */
export interface WorkAuthor {
  author: {
    key: string; // ex: "/authors/OL23919A"
  };
}

/**
 * Détail complet d'un livre (Work) retourné par /works/{id}.json
 */
export interface WorkDetail {
  key: string;
  title: string;
  description?: string | { type: string; value: string };
  covers?: number[];
  subjects?: string[];
  authors?: WorkAuthor[];
  first_publish_date?: string;
}

/**
 * Informations d'un auteur retournées par /authors/{id}.json
 */
export interface Author {
  key: string;
  name: string;
  bio?: string | { type: string; value: string };
  birth_date?: string;
  photos?: number[];
}
