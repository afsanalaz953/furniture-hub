/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useMemo, useReducer, useState } from "react";
import Link from "next/link";
import useLocalStorageItem from "@/hooks/useLocalStorageItem";
import { STORAGE_KEY, readStore, writeStore } from "@/lib/productStore";

const formatPrice = (price) => {
  if (typeof price === "number") return `$${price.toLocaleString()}`;
  return price;
};

// Product management table — add on /add-product, manage here.
const ManageProducts = ({ products }) => {
  const raw = useLocalStorageItem(STORAGE_KEY);
  const [, forceRefresh] = useReducer((n) => n + 1, 0);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("ALL");
  const [toast, setToast] = useState(null);

  // localStorage additions/removals, overlaid on the seed data. The hook
  // returns null on the server and during hydration, so gate on that.
  const store = useMemo(() => {
    if (raw === null) return null;
    try {
      const parsed = JSON.parse(raw);
      return { added: parsed?.added || [], removed: parsed?.removed || [] };
    } catch {
      return { added: [], removed: [] };
    }
  }, [raw]);

  const allProducts = useMemo(() => {
    if (!store) return products;
    const removed = new Set(store.removed);
    return [...store.added, ...products.filter((p) => !removed.has(p.id))];
  }, [products, store]);

  const showToast = (message, kind = "success") => {
    setToast({ message, kind });
    setTimeout(() => setToast(null), 2500);
  };

  const categories = useMemo(
    () => [...new Set(allProducts.map((p) => p.category))].sort(),
    [allProducts]
  );

  const visibleProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allProducts.filter((p) => {
      const matchesCategory = filterCategory === "ALL" || p.category === filterCategory;
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [allProducts, search, filterCategory]);

  const handleDelete = (product) => {
    const current = readStore();
    const next = product.custom
      ? { ...current, added: current.added.filter((p) => p.id !== product.id) }
      : {
          ...current,
          removed: current.removed.includes(product.id)
            ? current.removed
            : [...current.removed, product.id],
        };
    writeStore(next);
    forceRefresh();
    showToast(`"${product.name}" deleted`, "error");
  };

  if (store === null) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-[#F1F5F9]">
      {/* Toast */}
      <div className="toast toast-end toast-top z-50">
        {toast && (
          <div className={`alert alert-${toast.kind}`}>
            <span>{toast.message}</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Manage Products</h1>
          <p className="text mt-2 opacity-80">
            {allProducts.length} products · {visibleProducts.length} shown
          </p>
        </div>
        <Link href="/add-product" className="btn bg-[#087C7E] hover:text-white">
          + Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="search"
          placeholder="Search name, category or description…"
          className="input input-bordered w-full max-w-xs border-base-600  "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select select-bordered"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="ALL">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Products table */}
      <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100 m-4">
        <table className="table table-zebra text-lg">
          <thead className="text-xl font-bold">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleProducts.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-16 h-16">
                      <img
                        src={p.image_url}
                        alt={p.name}
                        onError={(e) => {
                          e.currentTarget.src = "/next.svg";
                        }}
                      />
                    </div>
                  </div>
                </td>
                <td className="font-semibold">{p.name}</td>
                <td>
                  <span className="badge badge-outline">{p.category}</span>
                </td>
                <td className="max-w-xs whitespace-normal">{p.description}</td>
                <td className="font-bold text-success">{formatPrice(p.price)}</td>
                <td>
                  <div className="flex items-center gap-1">
                    <progress
                      className="progress progress-warning w-16"
                      value={p.rating}
                      max="5"
                    ></progress>
                    <span className="text-sm">{p.rating}</span>
                  </div>
                </td>
                <td>
                  <div className="flex gap-1">
                    <Link
                      href={`/products/${p.id}`}
                      className="btn btn-ghost btn-xs text-lg"
                    >
                      View
                    </Link>
                    <button
                      className="btn btn-ghost btn-xs text-error text-lg"
                      onClick={() => handleDelete(p)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {visibleProducts.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-8 opacity-60">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
