import axios from "axios";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";

import { Layout } from "../../../components";
import { getError } from "../../../utils";

function OrdersListScreen() {
  const {
    isLoading,
    isError,
    error,
    data: orders,
  } = useQuery("orders-list", async () => {
    const { data } = await axios.get("/api/admin/orders");
    return data;
  });

  return (
    <Layout title="Orders list">
      <h1 className="mb-4 text-xl">Orders list</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div className="alert-error">{getError(error)}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th className="px-5 text-left">ID</th>
                <th className="p-5 text-left">DATE</th>
                <th className="p-5 text-left">CUSTOMER</th>
                <th className="p-5 text-left">TOTAL</th>
                <th className="p-5 text-left">PAID</th>
                <th className="p-5 text-left">DELIVERED</th>
                <th className="p-5 text-left">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order._id}>
                  <td className="p-5">{order._id.substring(20, 24)}</td>
                  <td className="p-5">{order.createdAt.substring(0, 10)}</td>
                  <td className="p-5">{order.user?.name || "DELETED USER"}</td>
                  <td className="p-5">${order.totalPrice}</td>
                  <td className="p-5">
                    {order.isPaid
                      ? `${order.paidAt.substring(0, 10)}`
                      : "not paid"}
                  </td>
                  <td className="p-5">
                    {order.isDelivered
                      ? `${order.deliveredAt.substring(0, 10)}`
                      : "not delivered"}
                  </td>
                  <td className="p-5">
                    <Link href={`/orders/${order._id}`}>
                      <a>Details</a>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}

OrdersListScreen.auth = true;
export default OrdersListScreen;
