"use client";

import React, { useEffect } from "react";
import { Personal } from "../../types/typings";

const Flyer = ({flyer}: any) => {
  console.log(`flyer: ${JSON.stringify(flyer)}`);
  return (
    <div>
      <div className="upper">
        <div className="name">
          {flyer.firstName} {flyer.lastName}
        </div>
        <div className="phonenumber">
          {flyer.phoneNumber}
        </div>
      </div>
      <div className="lower">
        <div className="closest-distance">
          {flyer.minimumDistance}
        </div>
        <div className="last-seen">
          {flyer.createdAt}
        </div>
      </div>
    </div>
  );
};

export default Flyer;
