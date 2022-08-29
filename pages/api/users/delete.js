import { getSession } from "next-auth/react";
import { User } from "../../../models";
import { db } from "../../../utils";

const handler = async (req, res) => {
  const session = await getSession({ req });
  const id = req.query.id;
  if (!session) {
    res.status(401).send({ message: "Unauthorized" });
  } else {
    await db.connect();
    await User.deleteOne({ _id: id });
    await db.disconnect();
    res.send("User deleted");
  }
};

export default handler;
