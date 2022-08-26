import { getSession } from "next-auth/react";

import { Order } from "../../../models";
import { db } from "../../../utils";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).send({ message: "Unauthorized" });
  } else {
    const { user } = session;
    await db.connect();
    const orders = await Order.find({ user: user._id });
    await db.disconnect();
    res.send(orders);
  }
};

export default handler;
