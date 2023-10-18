import { req } from "./agent";
const Work = {
  createWork: async (values, id) => {
    let formData = new FormData();
    formData.append("WorkH_startdate", values.startdate);
    formData.append("WorkH_enddate", values.enddate);
    formData.append("WorkH_employer", values.employer);
    formData.append("WorkH_placename", values.placename);
    formData.append("WorkH_position", values.position);
    formData.append("WorkH_reason", values.reason);
    try {
      let response = await req.postForm(
        `workhistory/createworkhistory?userid=${id}`,
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  getByUserId: async (id, search = "") => {
    try {
      return await req.get(`workhistory/findbyuserId${id}${search ? `?search=${search}` : ''}`);
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (id) => {
    try {
      let response = await req.postForm(
        `workhistory/deleteworkhistory/${id}`,
        {}
      );
    } catch (error) {
      console.log(error);
    }
  },

  update: async (values, id) => {
    let formData = new FormData();
    formData.append("WorkH_startdate", values.startdate);
    formData.append("WorkH_enddate", values.enddate);
    formData.append("WorkH_employer", values.employer);
    formData.append("WorkH_placename", values.placename);
    formData.append("WorkH_position", values.position);
    formData.append("WorkH_reason", values.reason);
    try {
      let response = await req.postForm(
        `WorkHistory/UpdateWork?id=${id}`,
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  getWorkById: async (id) =>
    await req.get(`WorkHistory/GetWorkHistoryById?id=${id}`),
};
export default Work;
