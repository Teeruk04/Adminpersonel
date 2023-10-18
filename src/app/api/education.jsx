import { req } from "./agent";
const Education = {
  getEducations: async () => {
    try {
      return await req.get("education/geteducation");
    } catch (error) {
      console.log(error);
    }
  },
  getById: async (id) => await req.get(`Education/GetEducationById?id=${id}`),
  createEducation: async (values, upfiles, id) => {
    let formData = new FormData();
    formData.append("Educa_startdate", values.startdate);
    formData.append("Educa_enddate", values.enddate);
    formData.append("Educa_placename", values.placename);
    formData.append("Educa_location", values.location);
    formData.append("Educa_course", values.course);
    formData.append("Educa_results", values.results);
    if (upfiles) formData.append("FormFile", upfiles);
    formData.append("id_level", parseInt(values.levelId));
    try {
      let response = await req.postForm(
        `education/createeducation?userid=${id}`,
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (id) => {
    try {
      let response = await req.postForm(`education/deleteeducation/${id}`,{});
    } catch (error) {
      console.log(error);
    }
  },
  getByUserId: async (id) => {
    try {
      return await req.get(`education/FindByUserId${id}`);
    } catch (error) {
      console.log(error);
    }
  },

  update: async (values, upfiles, id) => {
    let formData = new FormData();
    formData.append("Educa_startdate", values.startdate);
    formData.append("Educa_enddate", values.enddate);
    formData.append("Educa_placename", values.placename);
    formData.append("Educa_location", values.location);
    formData.append("Educa_course", values.course);
    formData.append("Educa_results", values.results);
    if (upfiles) formData.append("FormFile", upfiles);
    formData.append("id_level", parseInt(values.levelId));
    try {
      let response = await req.postForm(
        `Education/UpdateEducation?id=${id}`,
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

export default Education;
