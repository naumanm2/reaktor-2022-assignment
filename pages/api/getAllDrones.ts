import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../utils/mongo";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("drones");
    // push flyer information to db

    const drones = await db.collection("drones").find({}).toArray();
    await db.collection("drones").createIndex({createdAt: 1}, {expireAfterSeconds: 600})
    res.json({
      status: 200,
      data: drones,
    });
  } catch (e) {
    console.error(e);
  }
};
