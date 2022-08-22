import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { Layout } from "../../components/Layout";
import { data } from "../../utils/data";

const ProductScreen = () => {
  const { query } = useRouter();
  const { slug } = query;
  const product = data.find((product) => product.slug === slug);

  if (!product) return <div>Product not found</div>;

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">Back to results</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            height={640}
            width={640}
            objectFit="contain"
            src={product.image}
            alt={product.name}
            layout="responsive"
          />

          <div className="mt-4">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-gray-500">{product.description}</p>
          </div>
        </div>
        <ul>
          <li>
            <h1>{product.name}</h1>
          </li>
          <li>Category : {product.category}</li>
          <li>Brand : {product.brand}</li>
          <li>
            {product.rating} of {product.numReviews} Reviews
          </li>
          <li>Description : {product.description}</li>
        </ul>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? "In stock" : "Unavailable"}</div>
            </div>
            <button className="primary-button w-full">Add to cart</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductScreen;