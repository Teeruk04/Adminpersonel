import { req } from "./agent";
const insignia = {
  getInsigniaById: async (id) => {
    try {
      return await req.get(`Insignia/GetInsigniaById?id=${id}`);
    } catch (error) {
      console.log(error);
    }
  },

  getInsigniaByUserId: async (id,search="") => {
    try {
      return await req.get(`Insignia/FindByUserId${id}${search ? `?search=${search}` : ''}`);
    } catch (error) {
      console.log(error);
    }
  },

  createInsignia: async (values, id) => {
    let formdata = new FormData();
    formdata.append("insignia_name", values.name);
    formdata.append("insignia_year", values.year);
    formdata.append("insignia_receiveddate", values.receiveddate);

    try {
      let response = await req.postForm(
        `Insignia/CreateInsignia?userid=${id}`,
        formdata
      );
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (id) => {
    try {
      let response = await req.postForm(`Insignia/DeleteInsignia/${id}`,{});
    } catch (error) {
      console.log(error);
    }
  },

  update: async (values, id) => {
    let formdata = new FormData();
    formdata.append("insignia_name", values.name);
    formdata.append("insignia_year", values.year);
    formdata.append("insignia_receiveddate", values.receiveddate);
    try {
      let response = await req.postForm(
        `Insignia/UpdateIngisnia?id=${id}`,
        formdata
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
export default insignia;
