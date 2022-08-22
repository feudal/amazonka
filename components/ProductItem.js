/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

export const ProductItem = ({ product }) => {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <a className="flex-shrink-0 h-64 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow"
          />
        </a>
      </Link>
      <div className="h-full flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <a className="text-lg text-center">{product.name}</a>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>{product.price}</p>
        <button className="primary-button mt-auto" type="button">
          Add to cart
        </button>
      </div>
    </div>
  );
};
