/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import useLocalStorageItem from "@/hooks/useLocalStorageItem";

const STORAGE_KEY = "add-product-page-v1";

const PRICE_RANGES = [
  { label: "Any price", min: 0, max: Infinity },
  { label: "Under $200", min: 0, max: 200 },
  { label: "$200 – $750", min: 200, max: 750 },
  { label: "$750 – $1,500", min: 750, max: 1500 },
  { label: "Over $1,500", min: 1500, max: Infinity },
];

const RATINGS = [
  { label: "Any rating", min: 0 },
  { label: "4.0 ★ & up", min: 4.0 },
  { label: "4.5 ★ & up", min: 4.5 },
  { label: "4.7 ★ & up", min: 4.7 },
];

const parsePrice = (price) =>
  Number(String(price).replace(/[^0-9.]/g, "")) || 0;

const ProductsExplorer = ({ products }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [priceRange, setPriceRange] = useState(0);
  const [minRating, setMinRating] = useState(0);

  const localStorageRaw = useLocalStorageItem(STORAGE_KEY);

  // Items added/removed on /add-product live in localStorage. The hook gives a
  // hydration-safe value (null on the server), so this is derived, not synced.
  const stored = useMemo(() => {
    try {
      return JSON.parse(localStorageRaw) || {};
    } catch {
      return {};
    }
  }, [localStorageRaw]);

  const allProducts = useMemo(() => {
    const removed = new Set(stored.removed || []);
    const known = new Set(products.map((p) => p.id));
    return [
      ...(stored.added || []).filter((p) => !known.has(p.id)),
      ...products.filter((p) => !removed.has(p.id)),
    ];
  }, [products, stored]);

  const categories = useMemo(
    () => [...new Set(allProducts.map((p) => p.category))].sort(),
    [allProducts]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const range = PRICE_RANGES[priceRange];
    return allProducts.filter((p) => {
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      const matchesCategory = category === "ALL" || p.category === category;
      const price = parsePrice(p.price);
      const matchesPrice = price >= range.min && price <= range.max;
      const matchesRating = p.rating >= RATINGS[minRating].min;
      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });
  }, [allProducts, search, category, priceRange, minRating]);

  const clearFilters = () => {
    setSearch("");
    setCategory("ALL");
    setPriceRange(0);
    setMinRating(0);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-[#F1F5F9]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">All Products</h1>
        <p className="text mt-2 opacity-80">
          {filtered.length} of {allProducts.length} products
        </p>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col lg:flex-row gap-3 mb-6">
        <input
          type="search"
          placeholder="Search products…"
          className="input input-bordered font-bold w-full lg:max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select select-bordered"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="ALL">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          className="select select-bordered"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
        >
          {PRICE_RANGES.map((r, i) => (
            <option key={r.label} value={i}>
              {r.label}
            </option>
          ))}
        </select>
        <select
          className="select select-bordered"
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
        >
          {RATINGS.map((r, i) => (
            <option key={r.label} value={i}>
              {r.label}
            </option>
          ))}
        </select>
        <button className="btn btn-ghost bg-[#087C7E] hover:text-white"  onClick={clearFilters}>
          Clear
        </button>
      </div>

      {/* Responsive grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg opacity-60 mb-4">No products match your filters.</p>
          <button className="btn btn-primary" onClick={clearFilters}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <div key={p.id} className="card bg-base-100 shadow-sm border border-base-200">
              <figure className="px-4 pt-4">
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="rounded-xl object-cover h-48 w-full"
                  onError={(e) => {
                    e.currentTarget.style.opacity = 0.2;
                  }}
                />
              </figure>
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <span className="badge badge-outline">{p.category}</span>
                  <span className="text-sm font-semibold">★ {p.rating}</span>
                </div>
                <h2 className="card-title  text-xl">{p.name}</h2>
                <p className="text-lg opacity-90 line-clamp-2">{p.description}</p>
                <div className="card-actions justify-between items-center mt-2">
                  <span className="font-bold text-lg text-success">{p.price}</span>
                  <Link href={`/products/${p.id}`} className="btn bg-[#087C7E] hover:text-white btn-sm">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsExplorer;
