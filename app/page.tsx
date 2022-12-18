import React from "react";
import Drones from "./drones";
import Image from "./image";

const Home = () => {
  return (
    <div>
      {/* @ts-ignore */}
      <Image />
      <Drones />
    </div>
  );
};

export default Home;
