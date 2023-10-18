import { req } from "./agent";
const title = {
  getTitles: async () => {
    try {
      return await req.get("title/getTitle");
    } catch (error) {
      console.log(error);
    }
  },
};
export default title;
