import { req } from "./agent";

const Arrest = {
  createArrest: async (values, id) => {
    let formData = new FormData();
    formData.append("arrest_date", values.date);
    formData.append("arrest_crimescene", values.crimescene);
    formData.append("arrest_plaint", values.plaint);
    formData.append("arrest_outcomeofthecase", values.outcomeofthecase);
    try {
      let response = await req.postForm(
        `arrest/createarrest?userid=${id}`,
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  getByUserId: async (id, search = "") => {
    try {
      return await req.get(`arrest/findbyuserid${id}${search ? `?search=${search}` : ''}`);
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (id) => {
    try {
      return await req.postForm(`arrest/deletearrest/${id}`, {});
    } catch (error) {
      console.log(error);
    }
  },

  getById: async (id) => await req.get(`Arrest/GetArrestById?id=${id}`),

  update: async (values, id) => {
    let formData = new FormData();
    formData.append("arrest_date", values.date);
    formData.append("arrest_crimescene", values.crimescene);
    formData.append("arrest_plaint", values.plaint);
    formData.append("arrest_outcomeofthecase", values.outcomeofthecase);
    try {
      let response = await req.postForm(
        `Arrest/UpdateArrest?id=${id}`,
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

export default Arrest;
