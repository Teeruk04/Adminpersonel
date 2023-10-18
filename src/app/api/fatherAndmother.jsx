import { req } from "./agent";

const FatherAndMother = {
  addFatherAndMother: async (value, id) => {
    let formData = new FormData();
    formData.append("fa_name", value.nameF);
    formData.append("fa_lastname", value.lastNameF);
    formData.append("fa_birthdate", value.birthDateF);
    formData.append("fa_placebirth", value.placebirthF);
    formData.append("fa_race", value.raceF);
    formData.append("fa_religion", value.religionF);
    formData.append("fa_nationality", value.nationalityF);
    formData.append("fa_address", value.addressF);
    formData.append("fa_phone", value.phoneF);
    formData.append("fa_occupation", value.occupationF);
    formData.append("fa_position", value.positionF);
    formData.append("fa_workplace", value.workplaceF);
    formData.append("fa_WPphone", value.WPhoneF);
    formData.append("mO_title", parseInt(value.titleM));
    formData.append("mo_name", value.nameM);
    formData.append("mo_lastname", value.lastNameM);
    formData.append("mo_birthdate", value.birthDateM);
    formData.append("mo_placebirth", value.placebirthM);
    formData.append("mo_race", value.raceM);
    formData.append("mo_religion", value.religionM);
    formData.append("mo_nationality", value.nationalityM);
    formData.append("mo_address", value.addressM);
    formData.append("mo_phone", value.phoneM);
    formData.append("mo_occupation", value.occupationM);
    formData.append("mo_position", value.positionM);
    formData.append("mo_workplace", value.workplaceM);
    formData.append("mo_WPphone", value.WPhoneM);
    try {
      let response = await req.postForm(
        `faandmo/createfaandmo?userid=${id}`,
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getFatherAndMother: async (id) => {
    try {
      return await req.get(`faandmo/findbyuserid${id}`);
    } catch (error) {
      console.log(error);
    }
  },
  getById: async (id) =>
    await req.get(`FaAndMo/GetFatherAndMotherById?id=${id}`),
  update: async (value, id) => {
    let formData = new FormData();
    formData.append("fa_name", value.nameF);
    formData.append("fa_lastname", value.lastNameF);
    formData.append("fa_birthdate", value.birthDateF);
    formData.append("fa_placebirth", value.placebirthF);
    formData.append("fa_race", value.raceF);
    formData.append("fa_religion", value.religionF);
    formData.append("fa_nationality", value.nationalityF);
    formData.append("fa_address", value.addressF);
    formData.append("fa_phone", value.phoneF);
    formData.append("fa_occupation", value.occupationF);
    formData.append("fa_position", value.positionF);
    formData.append("fa_workplace", value.workplaceF);
    formData.append("fa_WPphone", value.WPhoneF);
    formData.append("mO_title", parseInt(value.titleM));
    formData.append("mo_name", value.nameM);
    formData.append("mo_lastname", value.lastNameM);
    formData.append("mo_birthdate", value.birthDateM);
    formData.append("mo_placebirth", value.placebirthM);
    formData.append("mo_race", value.raceM);
    formData.append("mo_religion", value.religionM);
    formData.append("mo_nationality", value.nationalityM);
    formData.append("mo_address", value.addressM);
    formData.append("mo_phone", value.phoneM);
    formData.append("mo_occupation", value.occupationM);
    formData.append("mo_position", value.positionM);
    formData.append("mo_workplace", value.workplaceM);
    formData.append("mo_WPphone", value.WPhoneM);
    try {
      let response = await req.postForm(
        `FaAndMo/UpdateFaANdMo?id=${id}`,
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
export default FatherAndMother;
