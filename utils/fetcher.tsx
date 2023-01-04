import { Personal } from "../types/typings";

// handles data fetching and posting, returns updated snapshot of db
const fetcher = async () => {
  const fresh = await fetch("/api/fetchOrigin");
  const freshData = await fresh.json();
  freshData.result.forEach(async (drone: Personal) => {
    try {
      await fetch("/api/post", {
        method: "POST",
        body: JSON.stringify(drone),
      });
    } catch (e) {
      console.error(e);
    }
  });
  const updated = await fetch("api/getAllDrones");
  const updatedData = await updated.json();
  return updatedData;
};

export default fetcher;
