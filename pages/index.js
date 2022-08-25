import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";

import { Layout } from "../components/Layout";
import { ProductItem } from "../components/ProductItem";
import Product from "../models/Product";
import { ACTIONS } from "../utils/app-constants";
import db from "../utils/db";
import { Store } from "../utils/store";

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  async function addToCartHandler(product) {
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
    toast.success("Product added to cart");
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            addToCartHandler={addToCartHandler}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return { props: { products: products.map(db.convertDocToObj) } };
}
