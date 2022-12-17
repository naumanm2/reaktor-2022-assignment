// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../utils/mongo";

import { Personal } from "../../types/typings";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("put");
  const body = JSON.parse(req.body);
  try {
    const client = await clientPromise;
    const db = client.db("drones");
    // const {
    //   pilotId,
    //   firstName,
    //   lastName,
    //   email,
    //   phoneNumber,
    //   minimumDistance,
    // }: Personal = req.body;

    const drone = await db.collection("drones").updateOne(
      {
        _id: body.pilotId as any,
      },
      {
        $set: {
          minimumDistance: body.minimumDistance,
        },
      }
    );
    res.json({
      status: 200,
      data: drone,
    });
  } catch (e) {
    console.error(e);
  }
};
