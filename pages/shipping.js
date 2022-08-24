import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

import CheckoutWizard from "../components/CheckoutWizard";
import { Layout } from "../components/Layout";
import { ACTIONS } from "../utils/app-constants";
import { Store } from "../utils/store";

export default function ShippingScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("fullName", state.cart.shippingAddress?.fullName);
    setValue("country", state.cart.shippingAddress?.country);
    setValue("city", state.cart.shippingAddress?.city);
    setValue("address", state.cart.shippingAddress?.address);
    setValue("postalCode", state.cart.shippingAddress?.postalCode);
  }, [setValue, state.cart.shippingAddress]);

  const submitHandler = ({ fullName, country, city, address, postalCode }) => {
    dispatch({
      type: ACTIONS.SAVE_SHIPPING_ADDRESS,
      payload: { fullName, country, city, address, postalCode },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...createImageBitmap,
        ...state.cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );
    router.push("/payment");
  };

  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Shipping Address</h1>
        <div className="mb-4">
          <label htmlFor="FullName">Full Name</label>
          <input
            {...register("fullName", {
              required: "Please enter full name",
            })}
            className="w-full"
            id="fullName"
            autoFocus
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="country">Country</label>
          <input
            {...register("country", {
              required: "Please enter country",
              minLength: {
                value: 3,
                message: "The country must be at least 3 characters in length",
              },
            })}
            type="country"
            className="w-full"
            id="country"
            autoFocus
          />
          {errors.country && (
            <div className="text-red-500 ">{errors.country.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            {...register("city", {
              required: "Please enter city",
              minLength: {
                value: 3,
                message: "The city must be at least 3 characters in length",
              },
            })}
            type="city"
            className="w-full"
            id="city"
            autoFocus
          />
          {errors.city && (
            <div className="text-red-500 ">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input
            {...register("address", {
              required: "Please enter address",
              minLength: {
                value: 3,
                message: "The address must be at least 3 characters in length",
              },
            })}
            type="address"
            className="w-full"
            id="address"
            autoFocus
          />
          {errors.address && (
            <div className="text-red-500 ">{errors.address.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            {...register("postalCode", {
              required: "Please enter postalCode",
              minLength: {
                value: 3,
                message:
                  "The postalCode must be at least 3 characters in length",
              },
            })}
            type="postalCode"
            className="w-full"
            id="postalCode"
            autoFocus
          />
          {errors.postalCode && (
            <div className="text-red-500 ">{errors.postalCode.message}</div>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}

ShippingScreen.auth = true;
