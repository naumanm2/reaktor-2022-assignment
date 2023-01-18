"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "../utils/fetcher";

import Flyer from "./Node/flyer";

import { Personal } from "../types/typings";

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

  return (
    <>
      {!data && (
        <div className="loading">
          pls wait while db warms up
        </div>
      )}
      {data &&
        baddies.map((flyer, i) => (
          <Flyer
            key={flyer.pilotId}
            flyer={flyer}
            index={i}
          />
        ))}
    </>
  );
};

export default Drones;
