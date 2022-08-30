import { getSession } from "next-auth/react";

import { Product } from "../../../../models";
import { db } from "../../../../utils";

async function handler(req, res) {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send({ message: "Admin signing required" });
  }

  if (req.method !== "PATCH") {
    return res.status(400).send({ message: `${req.method} not supported` });
  } else {
    db.connect();

    const product = await Product.findById(req.query.id);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.brand = req.body.brand;
      product.category = req.body.category;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      db.disconnect();

      if (updatedProduct) {
        return res
          .status(200)
          .send({ message: "Product Updated", data: updatedProduct });
      }
    }
    return res.status(500).send({ message: "Error in Updating Product." });
  }
}

export default handler;
