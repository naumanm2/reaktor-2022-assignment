// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as convert from "xml-js";
import type { NextApiRequest, NextApiResponse } from "next";

import { Drone, Personal } from "../../types/typings";

type Data = {
  result: Personal[];
};

type ErrorData = {
  body: string;
};

function checkLiability(drone: Drone): number {
  var r: number = 100000;
  var illegalX: number = 250000;
  var illegalY: number = 250000;
  const x: number = parseFloat(drone.positionX._text);
  const y: number = parseFloat(drone.positionY._text);

  function raiseTo2(x: number): number {
    return Math.pow(x, 2);
  }
  return Math.sqrt(raiseTo2(illegalX - x) + raiseTo2(illegalY - y));
}

async function fugitiveList(drones: Drone[]) {
  var fugitives = drones.filter((i) => checkLiability(i) < 100000);
  const result = fugitives.map(async (drone) => {
    try {
      const details = await fetch(
        `https://assignments.reaktor.com/birdnest/pilots/${drone.serialNumber._text}`
      );
      const res = await details.json();
      const result: Personal = {
        ...res,
        ...{
          createdAt: new Date(),
          minimumDistance: checkLiability(drone),
        },
      };
      return result;
    } catch (error) {
      throw new Error("could not find flyer");
    }
  });
  return Promise.all(result);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  const bad_boys_detailed: Personal[] = [];
  if (req.method !== "GET") {
    res.status(405).json({ body: "Method not allowed" });
    return;
  }
  const dataRes = await fetch(
    "https://assignments.reaktor.com/birdnest/drones"
  );

  const data = await dataRes.text();
  const xml2json = convert.xml2js(data, { compact: true });
  /* @ts-ignore */
  const drones: Drone[] = xml2json.report.capture.drone;
  //purge list to contain just baddies
  const result = await fugitiveList(drones);
  res.status(200).json({ result });
}
