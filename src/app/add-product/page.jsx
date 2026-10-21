/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import useLocalStorageItem from "@/hooks/useLocalStorageItem";
import { STORAGE_KEY, readStore, writeStore } from "@/lib/productStore";

const emptyForm = {
  image_url: "",
  name: "",
  category: "",
  description: "",
  price: "",
  rating: 4.5,
};

const AddProductPage = () => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [seedCategories, setSeedCategories] = useState([]);
  const [savedName, setSavedName] = useState(null);
  // Hydration-safe view of localStorage (null on server) — used for the
  // category datalist so newly added categories show up immediately.
  const storedRaw = useLocalStorageItem(STORAGE_KEY);

  // Seed categories power the datalist suggestions (storage-only categories
  // come from the hook below).
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/data.json");
        const data = await res.json();
        setSeedCategories([...new Set(data.map((p) => p.category))].sort());
      } catch {
        setSeedCategories([]);
      }
    };
    load();
  }, []);

  const categories = useMemo(() => {
    const added = (() => {
      try {
        return (JSON.parse(storedRaw)?.added || []).map((p) => p.category);
      } catch {
        return [];
      }
    })();
    return [...new Set([...seedCategories, ...added])].sort();
  }, [seedCategories, storedRaw]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Name is required";
    if (!form.category.trim()) er.category = "Category is required";
    if (!form.description.trim()) er.description = "Description is required";
    if (!form.price.toString().trim()) er.price = "Price is required";
    if (!form.image_url.trim()) er.image_url = "Image URL is required";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const numeric = Number(String(form.price).replace(/[^0-9.]/g, ""));
    const newProduct = {
      id: crypto.randomUUID(),
      image_url: form.image_url.trim(),
      category: form.category.trim().toUpperCase(),
      name: form.name.trim(),
      description: form.description.trim(),
      price: numeric ? `$${numeric.toLocaleString()}` : form.price.trim(),
      rating: Number(form.rating) || 0,
      custom: true,
    };

    const store = readStore();
    writeStore({ ...store, added: [newProduct, ...store.added] });

    setSavedName(newProduct.name);
    setForm(emptyForm);
  };

  const reset = () => {
    setSavedName(null);
    setForm(emptyForm);
    setErrors({});
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl bg-[#F1F5F9]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Add Product</h1>
        <p className="text mt-4 opacity-80">
          Fill in the details below. Your product will show up on the{" "}
          <Link href="/products/manage" className="link link-primary">
            Manage Products
          </Link>{" "}
          page.
        </p>
      </div>

      {/* Success state */}
      {savedName ? (
        <div className="alert alert-success mb-6">
          <span>
            &quot;{savedName}&quot; was added successfully.
          </span>
        </div>
      ) : null}

      <div className="rounded-box border border-base-300 bg-base-100 p-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-bold">Product name *</span>
              </label>
              <input
                name="name"
                className="input input-bordered"
                placeholder="e.g. Sora Lounge Chair"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-error text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-bold">Category *</span>
              </label>
              <input
                name="category"
                list="category-options"
                className="input input-bordered"
                placeholder="Pick one or type a new category"
                value={form.category}
                onChange={handleChange}
              />
              <datalist id="category-options">
                {categories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
              {errors.category && (
                <p className="text-error text-xs mt-1">{errors.category}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-bold">Price ($) *</span>
              </label>
              <input
                name="price"
                type="number"
                min="0"
                step="0.01"
                className="input input-bordered"
                placeholder="e.g. 840"
                value={form.price}
                onChange={handleChange}
              />
              {errors.price && <p className="text-error text-xs mt-1">{errors.price}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-bold ">Rating: {form.rating} / 5</span>
              </label>
              <input
                name="rating"
                type="range"
                min="0"
                max="5"
                step="0.1"
                className="range range-warning"
                value={form.rating}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-bold ">Image URL *</span>
              </label>
              <input
                name="image_url"
                className="input input-bordered"
                placeholder="https://…"
                value={form.image_url}
                onChange={handleChange}
              />
              {errors.image_url && (
                <p className="text-error text-xs mt-1">{errors.image_url}</p>
              )}
            </div>

            <div className="rounded-box border border-base-300 bg-base-200 h-40 flex items-center justify-center overflow-hidden">
              {form.image_url ? (
                <img
                  src={form.image_url}
                  alt="preview"
                  className="object-contain h-full w-full"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <span className="text opacity-80">Image preview</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-bold">Description *</span>
              </label>
              <textarea
                name="description"
                className="textarea textarea-bordered h-24"
                placeholder="Short marketing description"
                value={form.description}
                onChange={handleChange}
              ></textarea>
              {errors.description && (
                <p className="text-error text-xs mt-1">{errors.description}</p>
              )}
            </div>
          </div>

          <div className="col-span-full flex flex-wrap gap-3 mt-2">
            <button type="submit" className="btn bg-[#087C7E] hover:text-white">
              Save product
            </button>
            <button type="button" className="btn" onClick={reset}>
              Clear form
            </button>
            {savedName ? (
              <Link href="/products/manage" className="btn btn-outline">
                Go to Manage Products →
              </Link>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
