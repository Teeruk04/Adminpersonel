import { req } from "./agent";
const statusS ={
    getStatusS :async()=>{
        try {
            return await req.get('/StatusS/GetStatusS')
        } catch (error) {
            console.log(error);
        }
    }
}
export default statusS;