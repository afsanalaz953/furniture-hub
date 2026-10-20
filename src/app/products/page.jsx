import React from "react";
import { getProducts } from "@/lib/products";
import ProductsExplorer from "@/components/ProductsExplorer";

export const metadata = {
  title: "Products",
  description: "Browse all products",
};

export default function ProductsPage() {
  const products = getProducts();
  return <ProductsExplorer products={products} />;
}
