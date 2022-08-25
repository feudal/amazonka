import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useReducer } from "react";

import { Layout } from "../../components";
import { ACTIONS, getError } from "../../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_REQUEST:
      return { ...state, loading: true, error: "" };
    case ACTIONS.FETCH_SUCCESS:
      return { ...state, loading: false, order: action.payload, error: "" };
    case ACTIONS.FETCH_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function OrderScreen() {
  const {
    query: { id },
  } = useRouter();

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: ACTIONS.FETCH_REQUEST });
        const { data } = await axios.get(`/api/orders/${id}`);
        dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: data });
      } catch (err) {
        dispatch({ type: ACTIONS.FETCH_FAIL, payload: getError(err) });
      }
    };
    if (!order._id || (order._id && order._id !== id)) fetchOrder();
  }, [id, order._id]);
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  console.log("order :>> ", order);

  return (
    <Layout title={`Order ${id}`}>
      <h1 className="mb-4 text-xl">{`Order ${id}`}</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
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
              {isDelivered ? (
                <div className="alert-success">Delivered at {deliveredAt}</div>
              ) : (
                <div className="alert-error">Not delivered</div>
              )}
            </div>

            <div className="card p-5">
              <h2 className="mb-2 text-lg">Payment Method</h2>
              <div>{paymentMethod}</div>
              {isPaid ? (
                <div className="alert-success">Paid at {deliveredAt}</div>
              ) : (
                <div className="alert-error">Not paid</div>
              )}
            </div>

            <div className="card p-5">
              <h2 className="mb-2 text-lg">Order Items</h2>
              <div>OrderItems</div>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="p-5 text-right">Item</th>
                    <th className="p-5 text-right">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <Link href={`/product/${item.slug}`}>
                          <a className="flex items-center">
                            <Image
                              src={item.image}
                              alt={item.title}
                              width={50}
                              height={50}
                            />
                            <span className="ml-2">{item.name}</span>
                          </a>
                        </Link>
                      </td>
                      <td className="p-5 text-right">{item.quantity}</td>
                      <td className="p-5 text-right">${item.price}</td>
                      <td className="p-5 text-right">
                        ${item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card p-5">
            <h2 className="mb-2 text-lg">Order summary</h2>
            <ul>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Item</div>
                  <div>${itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Tax</div>
                  <div>${taxPrice}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Shipping</div>
                  <div>${shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Total price</div>
                  <div>${totalPrice}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}

OrderScreen.auth = true;
