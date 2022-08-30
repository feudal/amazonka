import { getError } from "../utils";
import { Modal } from "./Modal";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const EditProductModal = ({ open, onClose, product, invalidate }) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("category", product.category);
    setValue("brand", product.brand);
    setValue("name", product.name);
    setValue("slug", product.slug);
    setValue("price", product.price);
    setValue("countInStock", product.countInStock);
    setValue("description", product.description);
    setValue("image", product.image);
  });

  const submitHandler = async (body) => {
    try {
      const result = await axios.patch(
        `/api/admin/products/${product._id}`,
        body
      );

      if (result.error) {
        return toast.error(result.error);
      }
      invalidate();
      toast.success("Product updated");
      onClose();
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit product">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="mb-4">
          <label htmlFor="category">Category</label>
          <input
            {...register("category", {
              required: "Please enter category",
            })}
            type="category"
            className="w-full"
            id="category"
            autoFocus
          />
          {errors.category && (
            <div className="text-red-500">{errors.category.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="brand">Brand</label>
          <input
            {...register("brand", {
              required: "Please enter brand",
            })}
            type="brand"
            className="w-full"
            id="brand"
            autoFocus
          />
          {errors.brand && (
            <div className="text-red-500">{errors.brand.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            {...register("name", {
              required: "Please enter name",
            })}
            type="name"
            className="w-full"
            id="name"
            autoFocus
          />
          {errors.brand && (
            <div className="text-red-500">{errors.brand.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="slug">Slug</label>
          <input
            {...register("slug", {
              required: "Please enter slug",
            })}
            type="slug"
            className="w-full"
            id="sulg"
            autoFocus
          />
          {errors.slug && (
            <div className="text-red-500">{errors.slug.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="price">Price</label>
          <input
            {...register("price", {
              required: "Please enter price",
            })}
            type="price"
            className="w-full"
            id="price"
            autoFocus
          />
          {errors.price && (
            <div className="text-red-500">{errors.price.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="countInStock">Amount in stock</label>
          <input
            {...register("countInStock", {
              required: "Please enter countInStock",
            })}
            type="countInStock"
            className="w-full"
            id="countInStock"
            autoFocus
          />
          {errors.countInStock && (
            <div className="text-red-500">{errors.countInStock.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="description">Description</label>
          <textarea
            {...register("description", {
              required: "Please enter description",
            })}
            type="description"
            className="w-full h-20"
            id="description"
            autoFocus
          />
          {errors.description && (
            <div className="text-red-500">{errors.description.message}</div>
          )}
        </div>

        <div className="mb-4 flex justify-between">
          <button className="default-button" onClick={onClose}>
            Cancel
          </button>
          <button className="primary-button">Edit</button>
        </div>
      </form>
    </Modal>
  );
};
