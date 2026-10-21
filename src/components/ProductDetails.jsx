/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";

// Presentational details layout — usable from both server and client components.
const ProductDetails = ({ product, related = [] }) => {
  return (
    <div className="container mx-auto px-4 py-8 bg-[#F1F5F9]">
      <div className="mb-6">
        <Link href="/products" className="btn btn-ghost btn-sm">
          ← Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image */}
        <figure className="rounded-box border border-base-300 bg-base-100 overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-80 lg:h-[28rem] object-cover"
            onError={(e) => {
              e.currentTarget.style.opacity = 0.2;
            }}
          />
        </figure>

        {/* Summary */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="badge badge-primary badge-outline">{product.category}</span>
            <span className="text-sm font-semibold">★ {product.rating}</span>
          </div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-bold text-success">{product.price}</p>
          <p className="leading-relaxed opacity-80">{product.description}</p>

          <div className="flex gap-3 mt-4">
            <button className="btn bg-[#087C7E] hover:text-white  ">Add to Cart</button>
            <Link href="/products" className="btn btn-outline">
              Continue Shopping
            </Link>
          </div>

          {/* Additional info */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Additional information</h2>
            <ul className="menu menu-horizontal bg-cyan-600  rounded-box flex-wrap gap-2 p-2 text-sm">
              <li>
                <span className="font-semibold">Category:</span> {product.category}
              </li>
              <li>
                <span className="font-semibold">Price:</span> {product.price}
              </li>
              <li>
                <span className="font-semibold">Rating:</span> {product.rating} / 5
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-3">Specifications</h2>
        <div className="overflow-x-auto rounded-box border border-base-300">
          <table className="table table-zebra">
            <tbody>
              <tr>
                <td className="font-semibold w-48">Product ID</td>
                <td className="font-mono text-sm">{product.id}</td>
              </tr>
              <tr>
                <td className="font-semibold">Category</td>
                <td>{product.category}</td>
              </tr>
              <tr>
                <td className="font-semibold">Price</td>
                <td className="text-success font-bold">{product.price}</td>
              </tr>
              <tr>
                <td className="font-semibold">Customer rating</td>
                <td>★ {product.rating} out of 5</td>
              </tr>
              <tr>
                <td className="font-semibold">Availability</td>
                <td>
                  <span className="badge badge-success badge-sm">In stock</span>
                </td>
              </tr>
              <tr>
                <td className="font-semibold">Description</td>
                <td>{product.description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-3">Related products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <div
                key={p.id}
                className="card bg-base-100 shadow-sm border border-base-200"
              >
                <figure className="px-4 pt-4">
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="rounded-xl object-cover h-40 w-full"
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
                  <h3 className="card-title text-base">{p.name}</h3>
                  <div className="card-actions justify-between items-center mt-2">
                    <span className="font-bold text-success">{p.price}</span>
                    <Link href={`/products/${p.id}`} className="btn bg-[#087C7E] hover:text-white  btn-sm">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
