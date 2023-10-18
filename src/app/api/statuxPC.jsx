import { req } from "./agent";
const statusPC ={
    getStatusPC: async ()=>{
        try {
            return await req.get("statuspc/getstatuspc");
        } catch (error) {
            console.log(error);
        }
    }
}
export default statusPC;