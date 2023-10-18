import { req } from "./agent";
const titleM = {
  getTitleMs: async () => {
    try {
      return await req.get("titlem/gettitlem");
    } catch (error) {
      console.log(error);
    }
  },
};

export default titleM;
