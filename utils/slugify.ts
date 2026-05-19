export const createSlug = (brand: string, title: string, id: number) => {
  const text = `${brand}-${title}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Alfanümerik olmayanları tire yap
    .replace(/^-+|-+$/g, ""); // Baştaki ve sondaki tireleri temizle

  return `${text}-p-${id}`;
};
