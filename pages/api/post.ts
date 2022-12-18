// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../utils/mongo";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  try {
    const client = await clientPromise;
    const db = client.db("drones");

    const drone = await db.collection("drones").updateOne(
      { _id: body.pilotId as any },
      {
        $set: {
          createdAt: new Date(),
        },
        $setOnInsert: {
          _id: body.pilotId as any,
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          phoneNumber: body.phoneNumber,
        },
        $min: { minimumDistance: body.minimumDistance },
      },
      { upsert: true }
    );
    res.json({
      status: 200,
      data: drone,
    });
  } catch (e) {
    console.error(e);
  }
};
