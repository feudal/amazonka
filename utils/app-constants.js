export const ACTIONS = {
  CART_ADD_ITEM: "CART_ADD_ITEM",
  CART_REMOVE_ITEM: "CART_REMOVE_ITEM",
  CART_RESET: "CART_RESET",
  SAVE_SHIPPING_ADDRESS: "SAVE_SHIPPING_ADDRESS",
  SAVE_PAYMENT_METHOD: "SAVE_PAYMENT_METHOD",
  CART_CLEAR_ITEMS: "CART_CLEAR_ITEMS",

  FETCH_REQUEST: "FETCH_REQUEST",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAIL: "FETCH_FAIL",

  PAY_REQUEST: "PAY_REQUEST",
  PAY_SUCCESS: "PAY_SUCCESS",
  PAY_FAIL: "PAY_FAIL",
  PAY_RESET: "PAY_RESET",
};

export const PAYMENT_STEPS = [
  "User Login",
  "Shipping Address",
  "Payment Method",
  "Place Order",
];

export const PAYMENT_METHODS = ["PayPall", "Stripe", "CashOnDelivery"];
