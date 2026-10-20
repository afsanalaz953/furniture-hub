"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import ProductDetails from "@/components/ProductDetails";
import useLocalStorageItem from "@/hooks/useLocalStorageItem";

// Fallback for items that only exist in localStorage (added on /add-product).
const LocalProductDetails = ({ id }) => {
  const raw = useLocalStorageItem("add-product-page-v1");

  const product = useMemo(() => {
    if (raw === null) return undefined; // storage not read yet (first render)
    try {
      const saved = JSON.parse(raw);
      if (saved?.removed?.includes(id)) return null;
      return saved?.added?.find((p) => p.id === id) || null;
    } catch {
      return null;
    }
  }, [raw, id]);

  if (product === undefined) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">Product not found</h1>
        <p className="opacity-60 mb-6">This product does not exist.</p>
        <Link href="/products" className="btn btn-primary">
          ← Back to Products
        </Link>
      </div>
    );
  }

  return <ProductDetails product={product} related={[]} />;
};

export default LocalProductDetails;
