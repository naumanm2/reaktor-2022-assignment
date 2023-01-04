"use client";

import React from 'react'

const Flyer = ({ index, flyer }: any) => {
  console.log(`flyer: ${JSON.stringify(flyer)}`);
  const date = new Date(flyer.createdAt);
  const hours = date.getHours();
  const minutes = ("0" + date.getMinutes()).slice(-2);
  return (
    <div className="single-drone-card">
      <div className="middle">
        <div className="name">
          <h2>
            {flyer.firstName} {flyer.lastName}
          </h2>
        </div>
        <div className="last-seen">
          <time>
            {hours}:{minutes}
          </time>
        </div>
      </div>
      <div className="lower">
        <div className="phonenumber">{flyer.phoneNumber}</div>
        <div className="inner">
          <div className="label">closest measured distance:</div>
          <div className="closest-distance">
            {Math.round(flyer.minimumDistance * Math.pow(10, -3))}m
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flyer;
