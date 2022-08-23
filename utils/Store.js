import { createContext, useReducer } from "react";
import { ACTIONS } from "./app-constants";

export const Store = createContext();

const initialState = {
  cart: { cartItems: [] },
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.CART_ADD_ITEM: {
      const newItem = action.payload;
      const itemExist =
        state.cart.cartItems.find((item) => item.slug === newItem.slug)
          ?.length > 0;

      const cartItems = itemExist
        ? state.cart.cartItems.map((item) =>
            item.slug === itemExist.slug ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case ACTIONS.CART_REMOVE_ITEM: {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      );
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
