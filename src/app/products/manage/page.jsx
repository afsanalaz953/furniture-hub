import React from "react";
import { getProducts } from "@/lib/products";
import ManageProducts from "@/components/ManageProducts";

export const metadata = {
  title: "Manage Products",
  description: "View, search and manage your products",
};

export default function ManageProductsPage() {
  const products = getProducts();
  return <ManageProducts products={products} />;
}
