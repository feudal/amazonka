import { getSession } from "next-auth/react";

import { Order } from "../../../../models";
import { db } from "../../../../utils";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send("Unauthorized");
  }

  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    if (order.isPaid) {
      res.status(400).send("Order is already paid");
    }
    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    };
    const paidOrder = await order.save();
    await db.disconnect();
    res.status(200).send({
      message: "Order paid successfully",
      order: paidOrder,
    });
  } else {
    await db.disconnect();
    res.status(404).send("Order not found");
  }
};

export default handler;
