import { getSession } from "next-auth/react";

import { Product } from "../../../models";
import { db } from "../../../utils";

async function handler(req, res) {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send({ message: "Admin signing required" });
  }

  if (req.method !== "GET") {
    return res.status(400).send({ message: `${req.method} not supported` });
  } else {
    db.connect();
    const products = await Product.find({});
    db.disconnect();
    res.send(products);
  }
}

export default handler;
