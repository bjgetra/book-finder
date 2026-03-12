import type { SearchResponse } from "../types/book";

const BASE_URL = "https://openlibrary.org";

export async function searchBooks(query: string): Promise<SearchResponse> {
  const url = `${BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=12&fields=key,title,author_name,first_publish_year,cover_i,number_of_pages_median,edition_count`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erreur API : ${response.status}`);
  }

  console.log("API Search URL:", url);

  return response.json();
}
