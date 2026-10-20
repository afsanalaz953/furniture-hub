import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "public", "data.json");

// Keep this identical to the id scheme used in src/app/add-product/page.jsx so
// links between the two pages stay consistent.
export const slugify = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const parsePrice = (price) =>
  Number(String(price).replace(/[^0-9.]/g, "")) || 0;

export function getProducts() {
  const raw = fs.readFileSync(DATA_PATH, "utf8");
  return JSON.parse(raw).map((p, i) => ({ ...p, id: `${slugify(p.name)}-${i}` }));
}

export function getProductById(id) {
  return getProducts().find((p) => p.id === id) || null;
}

export function getRelatedProducts(product, limit = 3) {
  return getProducts()
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(
      getProducts().filter(
        (p) => p.id !== product.id && p.category !== product.category
      )
    )
    .slice(0, limit);
}
