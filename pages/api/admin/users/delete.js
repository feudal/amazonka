import { getSession } from "next-auth/react";

import { User } from "../../../../models";
import { db } from "../../../../utils";

const handler = async (req, res) => {
  const id = req.query.id;
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send({ message: "Admin signing required" });
  } else {
    await db.connect();
    await User.deleteOne({ _id: id });
    await db.disconnect();
    res.send("User deleted");
  }
};

export default handler;
