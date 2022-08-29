import { User } from "../../../models";
import { db } from "../../../utils";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).send({ message: "Unauthorized" });
  } else {
    await db.connect();
    const users = await User.find({});
    await db.disconnect();
    res.send(users);
  }
};

export default handler;
