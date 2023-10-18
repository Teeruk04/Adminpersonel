import { req } from "./agent";

const user = {
  login: async (values) => {
    let formData = new FormData();
    formData.append("Email", values.username);
    formData.append("Password", values.password);
    try {
      let response = await req.postForm("users/login", formData);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  register: async (values, upfiles) => {
    let formData = new FormData();
    formData.append("Email", values.username);
    formData.append("Password", values.password);
    formData.append("User_name", values.name);
    formData.append("User_lastname", values.lastname);
    formData.append("User_cardnumber", values.cardnumber);
    formData.append("User_birthdate", values.birthdate);
    formData.append("User_placeofbirth", values.placeofbirth);
    formData.append("User_race", values.race);
    formData.append("User_nationality", values.nationality);
    formData.append("User_religion", values.religion);
    if (upfiles) formData.append("FormFile", upfiles);
    formData.append("id_title", parseInt(values.titleId));
    formData.append("id_statusU", parseInt(values.statusUId));
    formData.append("id_sex", parseInt(values.sexId));
    try {
      let response = await req.postForm("users/register", formData);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getUsers: async (search = "") => {
    console.log(search);
    try {
      return await req.get(`users/getUser?search=${search}`);
    } catch (error) {
      console.log(error);
    }
  },
  deleteUser: async (id) => await req.postForm(`users/deleteUser?id=${id}`,{}),
  getCurrentUser: async (token) => {
    try {
      var config = {
        headers: { Authorization: "Bearer " + token },
      };
      var response = await req.getToken("Users/GetByToken", config);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getUserId: async (id) => await req.get(`users/${id}`),
  search: async (word) => await req.get(`users/search?name=${word}`),

  update: async (values, upfiles, id) => {
    let formData = new FormData();
    formData.append("User_name", values.name);
    formData.append("User_lastname", values.lastname);
    formData.append("User_cardnumber", values.cardnumber);
    formData.append("User_birthdate", values.birthdate);
    formData.append("User_placeofbirth", values.placeofbirth);
    formData.append("User_race", values.race);
    formData.append("User_nationality", values.nationality);
    formData.append("User_religion", values.religion);
    if (upfiles) formData.append("FormFile", upfiles);
    formData.append("id_title", parseInt(values.titleId));
    formData.append("id_statusU", parseInt(values.statusUId));
    formData.append("id_sex", parseInt(values.sexId));
    try {
      let response = await req.postForm(
        `Users/UpdateUser?userid=${id}`,
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

export default user;
