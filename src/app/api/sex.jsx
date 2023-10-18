import { req } from "./agent";

const sex = {
  getSexs: async () => {
    try {
      return await req.get("sex/getSex");
    } catch (error) {
      console.log(error);
    }
  },
};
export default sex;
