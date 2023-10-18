import { req } from "./agent";
const TypeS = {
  getTypeS: async () => {
    try {
      return await req.get("TypeS/GetTypeS");
    } catch (error) {
      console.log(error);
    }
  },
};
export default TypeS;
