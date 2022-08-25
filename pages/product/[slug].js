import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { Layout } from "../../components/Layout";
import { Store } from "../../utils/store";
import { ACTIONS } from "../../utils/app-constants";
import db from "../../utils/db";
import Product from "../../models/Product";

export default function ProductScreen({ product }) {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  async function addToCartHandler() {
    const existItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      toast.error("Sorry, Product is out of stock");
      return;
    }
    dispatch({
      type: ACTIONS.CART_ADD_ITEM,
      payload: { ...product, quantity },
    });
    router.push("/cart");
  }

  if (!product)
    return <Layout title="Product not found">Product not found</Layout>;

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
            <button
              onClick={addToCartHandler}
              className="primary-button w-full"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
