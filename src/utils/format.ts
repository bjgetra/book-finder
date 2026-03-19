/**
 * Extrait la description d'un Work ou la bio d'un Author.
 * L'API Open Library retourne parfois une string, parfois un objet { value }.
 */
export function extractText(
  field: string | { type: string; value: string } | undefined,
): string | null {
  if (!field) return null;
  if (typeof field === "string") return field;
  return field.value;
}

/**
 * Construit l'URL d'une couverture à partir de son ID.
 */
export function getCoverUrl(
  coverId: number | undefined,
  size: "S" | "M" | "L" = "M",
): string | null {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}
