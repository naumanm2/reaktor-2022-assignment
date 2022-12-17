// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import clientPromise from "../../utils/mongo";

import { Personal } from "../../types/typings";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("post");
  const body = JSON.parse(req.body);
  try {
    const client = await clientPromise;
    const db = client.db("drones");
    // push flyer information to db
    // const {
    //   pilotId,
    //   firstName,
    //   lastName,
    //   email,
    //   phoneNumber,
    //   minimumDistance,
    // }: Personal = req.body;
    console.log(body);
    // console.log(pilotId);
    // const drone = await db.collection("drones").insertOne({
    //   _id: body.pilotId as any,
    //   firstName: body.firstName,
    //   lastName: body.lastName,
    //   email: body.email,
    //   phoneNumber: body.phoneNumber,
    //   minimumDistance: body.minimumDistance,
    // });
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
        $min: {minimumDistance: body.minimumDistance},
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
