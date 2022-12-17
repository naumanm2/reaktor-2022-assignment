import React from "react";
import * as convert from "xml-js";

import { Personal } from "../types/typings";

const fetcher = async () => {
  const fresh = await fetch("/api/fetchOrigin");
  const freshData = await fresh.json();
freshData.result.forEach(async (drone:Personal) => {
  try {
    await fetch("/api/post", {
      method:"POST",
      body: JSON.stringify(drone),
    });
   } catch (e) {
      console.error(e)
    }
  });
  const updated = await fetch("api/getAllDrones");
  const updatedData = await updated.json();
  return updatedData;
};


//   const res = await fetch('/api/post', {
//     method: "POST",
//     body: JSON.stringify(freshData.result),
//   });
//   const result = await res.json()
//   return result;
// }
//   freshData.result.forEach(async (drone: Personal) => {
//     // console.log(`fresh data: ${JSON.stringify(freshData.result)}`)
//     if (currentData.data.indexOf(drone) > -1) {
//       try {
//         let res = await fetch("/api/put", {
//           method: "PUT",
//           body: JSON.stringify(drone),
//         });
//       } catch (e) {
//         console.error(e);
//       }
//     } else {
//       try {
//         let res = await fetch("/api/post", {
//           method: "POST",
//           body: JSON.stringify(drone),
//         });
//       } catch (e) {
//         console.error(e);
//       }
//     }
//   });
//   const updated = await fetch("api/getAllDrones");
//   const updatedData = await updated.json();
//   return updatedData;
// };

export default fetcher;
