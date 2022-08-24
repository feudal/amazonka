import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import { Store } from "../utils/store";

export const Layout = ({ title, children }) => {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setItemCount] = useState(0);
  useEffect(() => {
    setItemCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  return (
    <div>
      <Head>
        <title>{title ? title + " - Amazonka" : "Amazonka"}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col">
        <header>
          <nav className="flex items-center justify-between shadow-md h-10 px-5">
            <Link href="/">
              <a className="text-lg font-bold">Amazonka</a>
            </Link>
            <div>
              <Link href="/cart">
                <a className="p-2">
                  Cart
                  {cartItemsCount > 0 && (
                    <span className="badge">{cartItemsCount}</span>
                  )}
                </a>
              </Link>
              {status === "loading" ? (
                "Loading"
              ) : session?.user ? (
                session.user.name
              ) : (
                <Link href="/login">
                  <a className="p-2">Login</a>
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="flex-grow container m-auto px-5 pt-5">{children}</main>
        <footer className="flex justify-center items-center h-10 shadow-inner">
          Copyright &copy; Amazonka {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
};
