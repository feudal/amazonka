import { getSession } from "next-auth/react";

import { Order } from "../../../../models";
import { db } from "../../../../utils";

const handler = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).send("Unauthorized");
  }

  await db.connect();
  const order = await Order.findById(req.query.id);
  await db.disconnect();
  res.status(200).send(order);
};

export default handler;
