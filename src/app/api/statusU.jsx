import { req } from "./agent";
const statusU = {
  getStatusU: async () => {
    try {
      return await req.get("statusU/getStatusU");
    } catch (error) {
      console.log(error);
    }
  },
};
export default statusU;
