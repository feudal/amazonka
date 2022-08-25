export const ACTIONS = {
  CART_ADD_ITEM: "CART_ADD_ITEM",
  CART_REMOVE_ITEM: "CART_REMOVE_ITEM",
  CART_RESET: "CART_RESET",
  SAVE_SHIPPING_ADDRESS: "SAVE_SHIPPING_ADDRESS",
  SAVE_PAYMENT_METHOD: "SAVE_PAYMENT_METHOD",
  CART_CLEAR_ITEMS: "CART_CLEAR_ITEMS",
};

export const PAYMENT_STEPS = [
  "User Login",
  "Shipping Address",
  "Payment Method",
  "Place Order",
];

export const PAYMENT_METHODS = ["PayPall", "Stripe", "CashOnDelivery"];
