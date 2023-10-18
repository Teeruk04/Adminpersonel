import { req } from "./agent";
const child = {
  addChild: async (values, id) => {
    let fromData = new FormData();
    fromData.append("id_title", parseInt(values.titleId));
    fromData.append("Child_name", values.name);
    fromData.append("Child_lastname", values.lastname);
    fromData.append("Child_birthdate", values.birthdate);
    fromData.append("Child_race", values.race);
    fromData.append("Child_nationality", values.nationality);
    fromData.append("Child_religion", values.religion);
    fromData.append("Child_address", values.address);
    fromData.append("Child_occuopation", values.occupation);
    fromData.append("Child_position", values.position);
    fromData.append("Child_workkplace", values.workplace);
    fromData.append("Child_phone", values.WPphone);
    try {
      let response = await req.postForm(
        `Child/CreateChild?userid=${id}`,
        fromData
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getChild: async (id) => {
    try {
      return await req.get(`Child/FindByUserId${id}`);
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (id) => {
    try {
      let response = await req.postForm(`Child/DeleteChild/${id}`,{});
    } catch (error) {
      console.log(error);
    }
  },

  getChildById: async (id) => {
    try {
      return await req.get(`Child/GetChildById?id=${id}`);
    } catch (error) {
      console.log(error);
    }
  },

  update: async (values, id) => {
    let fromData = new FormData();
    fromData.append("id_title", parseInt(values.titleId));
    fromData.append("Child_name", values.name);
    fromData.append("Child_lastname", values.lastname);
    fromData.append("Child_birthdate", values.birthdate);
    fromData.append("Child_race", values.race);
    fromData.append("Child_nationality", values.nationality);
    fromData.append("Child_religion", values.religion);
    fromData.append("Child_address", values.address);
    fromData.append("Child_occuopation", values.occupation);
    fromData.append("Child_position", values.position);
    fromData.append("Child_workkplace", values.workplace);
    fromData.append("Child_phone", values.WPphone);

    try {
      let response = await req.postForm(`Child/UpdateChaild?id=${id}`, fromData);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
export default child;
