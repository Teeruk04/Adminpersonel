import { req } from "./agent";
const managePos = {
  getByUserId: async (id,search="") => {
    try {
      return await req.get(`/ManageP/FindByUserId${id}${search ? `?search=${search}` : ''}`);
    } catch (error) {
      console.log(error);
    }
  },
  getById: async (id) => {
    return await req.get(`ManageP/GetManagePById?id=${id}`);
  },

  createManagePos: async (values, id) => {
    let formData = new FormData();
    formData.append("manageP_position", values.position);
    formData.append("manageP_agency", values.agency);
    formData.append("manageP_details", values.detail);
    formData.append("manageP_startdate", values.startdate);
    formData.append("manageP_enddate", values.enddate);
    formData.append("manageP_refer", values.refer);
    formData.append("id_statusS", parseInt(values.status));

    try {
      let response = await req.postForm(
        `ManageP/CreateManageP?userid=${id}`,
        formData
      );
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (id) => {
    try {
      let response = await req.postForm(`ManageP/DeleteEducation/${id}`,{});
    } catch (error) {
      console.log(error);
    }
  },

  update: async (values, id) => {
    let formData = new FormData();
    formData.append("manageP_position", values.position);
    formData.append("manageP_agency", values.agency);
    formData.append("manageP_details", values.detail);
    formData.append("manageP_startdate", values.startdate);
    formData.append("manageP_enddate", values.enddate);
    formData.append("manageP_refer", values.refer);
    formData.append("id_statusS", parseInt(values.status));
    try {
      let response = await req.postForm(
        `ManageP/UpdateManagePC?id=${id}`,
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
export default managePos;
