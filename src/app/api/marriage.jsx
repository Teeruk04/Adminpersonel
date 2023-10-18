import { req } from "./agent";
import statusPC from "./statuxPC";
const marriage = {
  addMarriage: async (values, id) => {
    let formData = new FormData();
    formData.append("id_title", parseInt(values.titleId));
    formData.append("marriage_name", values.name);
    formData.append("marriage_lastname", values.lastname);
    formData.append("marria_birdate", values.birthdate);
    formData.append("marria_race", values.race);
    formData.append("marria_religion", values.religion);
    formData.append("marria_nationality", values.nationality);
    formData.append("marria_occupation", values.occupation);
    formData.append("marria_position", values.position);
    formData.append("marria_workplace", values.workplace);
    formData.append("marria_WPphone", values.WPphone);
    formData.append("marriia_weddingday", values.weddingday);
    formData.append("marria_address", values.address);
    formData.append("marria_phone", values.phone);
    formData.append("marria_divorce", values.divorce);
    formData.append("marria_lastaddress", values.lastaddress);
    formData.append("id_statusPC", parseInt(values.statusPCId));
    try {
      let response = await req.postForm(
        `marriages/createMarriage?userid=${id}`,
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  getMarriageByUSerId: async (id) => {
    try {
      return await req.get(`Marriages/FindByUserId${id}`);
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (id) => {
    try {
      let response = await req.postForm(`Marriages/DeleteMarriage/${id}`,{});
    } catch (error) {
      console.log(error);
    }
  },
  getMarriageById: async (id) => {
    try {
      return await req.get(`Marriages/GetMarriagesById?id=${id}`);
    } catch (error) {
      console.log(error);
    }
  },

  update: async (values, id) => {
    let formData = new FormData();
    formData.append("id_title", parseInt(values.titleId));
    formData.append("marriage_name", values.name);
    formData.append("marriage_lastname", values.lastname);
    formData.append("marria_birdate", values.birthdate);
    formData.append("marria_race", values.race);
    formData.append("marria_religion", values.religion);
    formData.append("marria_nationality", values.nationality);
    formData.append("marria_occupation", values.occupation);
    formData.append("marria_position", values.position);
    formData.append("marria_workplace", values.workplace);
    formData.append("marria_WPphone", values.WPphone);
    formData.append("marriia_weddingday", values.weddingday);
    formData.append("marria_address", values.address);
    formData.append("marria_phone", values.phone);
    formData.append("marria_divorce", values.divorce);
    formData.append("marria_lastaddress", values.lastaddress);
    formData.append("id_statusPC", parseInt(values.statusPCId));

    try {
      let response = await req.postForm(
        `Marriages/UpdateMarriage?id=${id}`,
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

export default marriage;
