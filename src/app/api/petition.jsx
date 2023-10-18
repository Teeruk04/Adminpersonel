import { req } from "./agent";
const petition = {
  getPetitionAll: async (search = "") => {
    try {
      return await req.get(`Petition/GetPetition?search=${search}`);
    } catch (error) {
      console.log(error);
    }
  },

  getPetitionByUserId: async (id, search = "") => {
    try {
      return await req.get(
        `Petition/FindByUserId${id}${search ? `?search=${search}` : ""}`
      );
    } catch (error) {
      console.log(error);
    }
  },

  createPetition: async (values, upfiles) => {
    let formData = new FormData();
    formData.append("peti_message", values.message);
    if (upfiles) formData.append("FormFile", upfiles);
    try {
      let response = await req.postForm("Petition/CreatePetition", formData);
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (id) => {
    try {
      let response = await req.postForm(`Petition/DeleteEducation/${id}`, {});
    } catch (error) {
      console.log(error);
    }
  },

  accept: async (id) => {
    try {
      let response = await req.post(`Petition/AcceptPetition/${id}`);
    } catch (error) {
      console.log(error);
    }
  },

  confirm: async (id) => {
    try {
      let response = await req.post(`Petition/ConfirmPetition/${id}`);
    } catch (error) {
      console.log(error);
    }
  },

  cancel: async (id) => {
    try {
      let response = await req.post(`Petition/CancelPetition/${id}`);
    } catch (error) {
      console.log(error);
    }
  },
};
export default petition;
