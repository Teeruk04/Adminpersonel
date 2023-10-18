import { req } from "./agent";

const activity = {
  addActivity: async (values, id) => {
    let fromData = new FormData();
    fromData.append("Activity_startdate", values.startdate);
    fromData.append("Activity_enddate", values.enddate);
    fromData.append("Activity_placename", values.placename);
    fromData.append("Activity_position", values.position);
    try {
      let response = await req.postForm(
        `Activity/CreateActivity?userid=${id}`,
        fromData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getActivityByUserId: async (id,search="") => {
    try {
      return await req.get(`Activity/FindByUserId${id}${search ? `?search=${search}` : ''}`);
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (id) => {
    try {
      let response = await req.postForm(`Activity/DeleteActivity/${id}`, {});
    } catch (error) {
      console.log(error);
    }
  },

  getActivityById: async (id) => {
    try {
      return await req.get(`Activity/GetACtivityById?id=${id}`);
    } catch (error) {
      console.log(error);
    }
  },

  update: async (values, id) => {
    let fromData = new FormData();
    fromData.append("Activity_startdate", values.startdate);
    fromData.append("Activity_enddate", values.enddate);
    fromData.append("Activity_placename", values.placename);
    fromData.append("Activity_position", values.position);
    try {
      let response = await req.postForm(
        `Activity/UpdateActivity?id=${id}`,
        fromData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
export default activity;
