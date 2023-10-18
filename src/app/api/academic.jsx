import { req } from "./agent";
const Academic = {
  getAcademicById: async (id) => {
    try {
      return await req.get(`Academic/GetAcademicId?id=${id}`);
    } catch (error) {
      console.log(error);
    }
  },
  getAcademicByUserId: async (id, search = "") => {
    try {
      return await req.get(`Academic/FindByUserId${id}${search ? `?search=${search}` : ''}`);
    } catch (error) {
      console.log(error);
    }
  },

  createAcademic: async (values, upfiles, id) => {
    let formData = new FormData();
    formData.append("academic_position", values.position);
    formData.append("academic_branchcode", values.branchcode);
    formData.append("academic_branchname", values.branchname);
    formData.append("academic_startdate", values.startdate);
    formData.append("academic_refer", values.refer);
    if (upfiles) formData.append("FormFile", upfiles);

    try {
      let response = await req.postForm(
        `Academic/CreateAcademic?userid=${id}`,
        formData
      );
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (id) => {
    try {
      let response = await req.postForm(`Academic/DeleteAcademic/${id}`, {});
    } catch (error) {
      console.log(error);
    }
  },

  update: async (values, upfiles, id) => {
    let formData = new FormData();
    formData.append("academic_position", values.position);
    formData.append("academic_branchcode", values.branchcode);
    formData.append("academic_branchname", values.branchname);
    formData.append("academic_startdate", values.startdate);
    formData.append("academic_refer", values.refer);
    if (upfiles) formData.append("FormFile", upfiles);

    try {
      let response = await req.postForm(
        `Academic/UpdateAcademic?id=${id}`,
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

export default Academic;
