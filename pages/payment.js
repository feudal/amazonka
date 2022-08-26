import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { CheckoutWizard, Layout } from "../components";
import { ACTIONS, PAYMENT_METHODS, Store } from "../utils";

export default function PaymentScreen() {
  const router = useRouter();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;
  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error("Please select a payment method");
    }

    dispatch({
      type: ACTIONS.SAVE_PAYMENT_METHOD,
      payload: selectedPaymentMethod,
    });
    Cookies.set(
      "cart",
      JSON.stringify({ ...cart, paymentMethod: selectedPaymentMethod })
    );
  };

  useEffect(() => {
    if (!shippingAddress) return router.push("/shipping");
    setSelectedPaymentMethod(paymentMethod);
  }, [paymentMethod, router, shippingAddress]);

  return (
    <Layout title="Payment">
      <CheckoutWizard activeStep={2} />
      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h1 className="mb-4 text-xl">Payment Method</h1>
        {PAYMENT_METHODS.map((payment) => (
          <div key={payment} className="mb-4">
            <input
              type="radio"
              name="paymentMethod"
              className="p-2 outline-none focus-within:ring-0"
              id={payment}
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />
            <label htmlFor={payment} className="p-2">
              {payment}
            </label>
          </div>
        ))}
        <div className="mb-4 flex justify-between">
          <button
            className="default-button"
            onClick={() => router.push("/shipping")}
          >
            Back
          </button>
          <button
            className="primary-button"
            onClick={() => router.push("/place-order")}
          >
            Next
          </button>
        </div>
      </form>
    </Layout>
  );
}
