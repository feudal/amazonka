import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../components/Layout";

export default function Unauthorized() {
  const {
    query: { message },
  } = useRouter();

  return (
    <Layout title="Unauthorized Page">
      <h1 className="text-xl">Access denied</h1>
      {message && <div className="mb-4 text-red-500">{message}</div>}
    </Layout>
  );
}
