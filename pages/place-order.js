import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { ACTIONS, getError, round2, Store } from "../utils";
import { CheckoutWizard, Layout } from "./../components";

export default function PlaceOrderScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems, shippingAddress, paymentMethod },
  } = state;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  const shippingPrice = round2(itemsPrice > 100 ? 0 : 10);
  const taxPrice = round2(0.15 * itemsPrice);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  useEffect(() => {
    if (!paymentMethod) router.push("/payment");
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/orders", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      dispatch({ type: ACTIONS.CART_CLEAR_ITEMS });
      router.push(`/order/${data._id}`);
      Cookies.set(
        "cart",
        JSON.stringify({
          shippingAddress,
          paymentMethod,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Place order">
      <CheckoutWizard activeStep={3} />
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5 items-start">
          <div className="md:col-span-3">
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Shipping Address</h2>
              <div>
                <p>{shippingAddress.fullName}</p>
                <p>{shippingAddress.address}</p>
                <p>{shippingAddress.city}</p>
                <p>{shippingAddress.postalCode}</p>
                <p>{shippingAddress.country}</p>
              </div>
              <div>
                <Link href="/shipping">Edit</Link>
              </div>
            </div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Payment Method</h2>
              <div>{paymentMethod}</div>
              <div>
                <Link href="/payment">Edit</Link>
              </div>
            </div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Order Items</h2>
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="px-5 text-left">Quantity</th>
                    <th className="px-5 text-left">Price</th>
                    <th className="px-5 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td>
                        <Link href={`/product/${item.slug}`}>
                          <a className="flex items-center">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            />
                            <span className="ml-2">{item.name}</span>
                          </a>
                        </Link>
                      </td>
                      <td className="px-5">{item.quantity}</td>
                      <td className="px-5">${item.price}</td>
                      <td className="px-5">${item.quantity * item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link href="/cart">Edit</Link>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <h2 className="mb-2 text-lg">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Items</span>
              <span>${itemsPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>${shippingPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax</span>
              <span>${taxPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
            <div className="md:col-span-1">
              <button
                disabled={loading}
                onClick={placeOrderHandler}
                className="primary-button w-full"
              >
                {loading ? "Loading..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

PlaceOrderScreen.auth = true;
