import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import { Layout } from "../../components";
import { getError } from "../../utils";

export default function OrderScreen() {
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    query: { id },
  } = useRouter();

  const queryClient = useQueryClient();
  const [loadingPay, setLoadingPay] = useState(false);

  const {
    loading,
    error,
    data: order,
  } = useQuery(
    ["order", id],
    async () => {
      const { data } = await axios.get(`/api/orders/${id}`);
      return data;
    },

    {
      onError: (err) => {
        toast.error(getError(err));
      },
      onSuccess: () => {
        const loadPayPalScript = async () => {
          const { data: clientId } = await axios.get("/api/keys/paypal");
          paypalDispatch({
            type: "resetOptions",
            value: {
              "client-id": clientId,
              currency: "USD",
            },
          });
        };
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
        loadPayPalScript();
      },
    }
  );

  if (!order) return <div>Loading...</div>;

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    isPaid,
    isDelivered,
    deliveredAt,
    paidAt,
  } = order;

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: totalPrice } }],
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const onApprove = (data, action) => {
    return action.order.capture().then(async (details) => {
      try {
        setLoadingPay(true);
        await axios.put(`/api/orders/${order._id}/pay`, details);
        setLoadingPay(false);
        toast.success("Order paid successfully");
        queryClient.invalidateQueries(["order", id]);
      } catch (err) {
        toast.error(getError(err));
      }
    });
  };
  const onError = (err) => {
    toast.error(getError(err));
  };

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
              <div data-testid="shipping-info">
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
                <div className="alert-success">Paid at {paidAt}</div>
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
              {!isPaid && (
                <li>
                  {isPending ? (
                    <div>Loading...</div>
                  ) : (
                    <div className="w-full">
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  )}
                  {loadingPay && <div>Loading...</div>}
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}

OrderScreen.auth = true;
