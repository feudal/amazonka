import { getSession } from "next-auth/react";

import { User } from "../../../../models";
import { db } from "../../../../utils";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send({ message: "Admin signing required" });
  } else {
    await db.connect();
    const users = await User.find({});
    await db.disconnect();
    res.send(users);
  }
};

export default handler;
