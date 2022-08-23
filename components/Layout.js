import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import { Store } from "../utils/store";

export const Layout = ({ title, children }) => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  return (
    <div>
      <Head>
        <title>{title ? title + " - Amazonka" : "Amazonka"}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
                  {cart.cartItems.length > 0 && (
                    <span className="badge">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  )}
                </a>
              </Link>
              <Link href="/login">
                <a className="p-2">Login</a>
              </Link>
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
