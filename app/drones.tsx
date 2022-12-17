"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "../utils/fetcher";

import Flyer from "./Node/flyer";

import { Drone, Personal } from "../types/typings";

const Drones = () => {
  const [baddies, setBaddies] = useState<Personal[]>([]);
  const { data, error } = useSWR("/api/", fetcher, {
    refreshInterval: 1000,
  });

  useEffect(() => {
    if (data) {
      setBaddies(data.data);
    }
  }, [data]);
  // console.log(`baddies: ${baddies}`);
  //   console.log(data);
  //   setAllBaddies([...data, ...allBaddies])

  //   setBaddies(data?);
  return (
    <>
      {baddies.length > 0 &&
        baddies.map((flyer) => <Flyer key={flyer.pilotId} flyer={flyer} />)}
    </>
  );
};

export default Drones;
