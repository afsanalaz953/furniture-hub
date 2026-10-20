// Client-side product store shared by /add-product and /products/manage.
// Shape: { added: Product[], removed: string[] } — removals only apply to
// seed products from public/data.json (which the server never sees).

export const STORAGE_KEY = "add-product-page-v1";

export const readStore = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { added: parsed?.added || [], removed: parsed?.removed || [] };
  } catch {
    return { added: [], removed: [] };
  }
};

export const writeStore = (store) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
};
