import type { WorkDetail, Author } from "../types/book";

const BASE_URL = "https://openlibrary.org";

/**
 * Récupère le détail d'un livre (work) par son ID.
 */
export async function getWorkDetail(
  id: string | undefined,
): Promise<WorkDetail> {
  const response = await fetch(`${BASE_URL}/works/${id}.json`);

  if (!response.ok) {
    throw new Error(`Livre non trouvé (${response.status})`);
  }

  return response.json();
}

/**
 * Récupère les informations d'un auteur par sa clé.
 * La clé est au format "/authors/OL23919A".
 */
export async function getAuthor(authorKey: string): Promise<Author> {
  const response = await fetch(`${BASE_URL}${authorKey}.json`);

  if (!response.ok) {
    throw new Error(`Auteur non trouvé (${response.status})`);
  }

  return response.json();
}
