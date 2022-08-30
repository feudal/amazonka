import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import { EditProductModal, Layout } from "../../components";
import { getError } from "../../utils";

function ProductsScreen() {
  const [productId, setProductId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const {
    isLoading,
    error,
    data: products,
  } = useQuery("admin-products", async () => {
    const { data } = await axios.get("/api/admin/products");
    return data;
  });

  return (
    <Layout title="Products">
      <h1 className="mb-7 text-xl">Products</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{getError(error)}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th className="px-5 text-left">ID</th>
                <th className="p-5 text-left">CATEGORY</th>
                <th className="p-5 text-left">NAME</th>
                <th className="p-5 text-left">IMAGE</th>
                <th className="p-5 text-left">PRICE</th>
                <th className="p-5 text-left">COUNT</th>
                <th className="p-5 text-left">RATING</th>
                <th className="p-5 text-left">REVIEWS</th>
                <th className="p-5 text-left">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product._id}>
                  <td className="p-5">{product._id.substring(20, 24)}</td>
                  <td className="p-5">{product.category}</td>
                  <td className="cursor-default" title={product.description}>
                    {product.name}
                  </td>
                  <Link href={`/product/${product.slug}`}>
                    <a className="flex products-center min-h-full min-w-full">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={60}
                        height={60}
                        objectFit="cover"
                      />
                    </a>
                  </Link>
                  <td className="p-5">{product.price}</td>
                  <td className="p-5">{product.countInStock}</td>
                  <td className="p-5">{product.rating}</td>
                  <td className="p-5">{product.numReviews}</td>
                  <td className="p-5">
                    <button
                      className="primary-button"
                      onClick={() => {
                        setIsOpen(true);
                        setProductId(product._id);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isOpen && (
        <EditProductModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          product={products?.find((product) => product._id === productId)}
          invalidate={() => queryClient.invalidateQueries("admin-products")}
        />
      )}
    </Layout>
  );
}

ProductsScreen.auth = { adminOnly: true };
export default ProductsScreen;
