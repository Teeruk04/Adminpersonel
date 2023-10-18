import { req } from "./agent";
const level ={
    getLevels : async()=>{
        try {
            return await req.get("/level/getLevel")
        } catch (error) {
            console.log(error);
        }
    }
}
export default level;