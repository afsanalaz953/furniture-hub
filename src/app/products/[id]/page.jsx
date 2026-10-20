import React from "react";
import { getProducts, getProductById, getRelatedProducts } from "@/lib/products";
import ProductDetails from "@/components/ProductDetails";
import LocalProductDetails from "@/components/LocalProductDetails";
import RemovedGuard from "@/components/RemovedGuard";

// Pre-render every item from the JSON file at build time.
export const generateStaticParams = () =>
  getProducts().map((p) => ({ id: p.id }));

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProductById(id);
  return { title: product ? `${product.name} | Products` : "Product not found" };
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const product = getProductById(id);

  // Known JSON item → server-rendered details.
  // Otherwise it may be a localStorage-only item (or a bad id) — let the
  // client component check localStorage and show a proper not-found state.
  if (!product) {
    return <LocalProductDetails id={id} />;
  }

  return (
    <RemovedGuard id={id}>
      <ProductDetails product={product} related={getRelatedProducts(product)} />
    </RemovedGuard>
  );
}
