"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import useLocalStorageItem from "@/hooks/useLocalStorageItem";

// Hides a server-rendered product that the user deleted on /add-product
// (removals live in localStorage, which the server can't see).
const RemovedGuard = ({ id, children }) => {
  const raw = useLocalStorageItem("add-product-page-v1");

  const removed = useMemo(() => {
    if (raw === null) return false;
    try {
      return JSON.parse(raw)?.removed?.includes(id) || false;
    } catch {
      return false;
    }
  }, [raw, id]);

  if (removed) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">Product not found</h1>
        <p className="opacity-60 mb-6">This product has been removed.</p>
        <Link href="/products" className="btn btn-primary">
          ← Back to Products
        </Link>
      </div>
    );
  }

  return children;
};

export default RemovedGuard;
