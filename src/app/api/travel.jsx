import { req } from "./agent";
const travel = {
  addTravel: async (values, id) => {
    let fromData = new FormData();
    fromData.append("travel_startdate", values.startdate);
    fromData.append("travel_enddate", values.enddate);
    fromData.append("travel_city", values.city);
    fromData.append("travel_county", values.county);
    fromData.append("travel_purpose", values.purpose);
    fromData.append("travel_capital", values.capital);
    try {
      let response = await req.postForm(
        `Travel/CreateTravel?userid=${id}`,
        fromData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  getTravel: async (id,search="") => {
    try {
      return await req.get(`Travel/FindByUserId${id}${search ? `?search=${search}` : ''}`);
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (id) => {
    try {
      return await req.postForm(`Travel/DeleteTravel/${id}`,{});
    } catch (error) {
      console.log(error);
    }
  },

  getTravelById: async (id) => {
    try {
      return await req.get(`Travel/GetTravelById?id=${id}`);
    } catch (error) {
      console.log(error);
    }
  },

  update: async (values, id) => {
    let fromData = new FormData();
    fromData.append("travel_startdate", values.startdate);
    fromData.append("travel_enddate", values.enddate);
    fromData.append("travel_city", values.city);
    fromData.append("travel_county", values.county);
    fromData.append("travel_purpose", values.purpose);
    fromData.append("travel_capital", values.capital);
    try {
      let response = await req.postForm(
        `Travel/UpdateTravel?id=${id}`,
        fromData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
export default travel;
