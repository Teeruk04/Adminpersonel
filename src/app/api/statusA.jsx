import { req } from "./agent";
const statusA = {
  getStatusA: async () => {
    try {
      return await req.get("StatusA/GetStatusA");
    } catch (error) {
      console.log(error);
    }
  },
};
export default statusA;
