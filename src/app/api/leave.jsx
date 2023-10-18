import { req } from "./agent";
const Leave = {
  getLeaveById: async (id) => {
    try {
      return await req.get(`Leave/GetLeaveById?id=${id}`);
    } catch (error) {
      console.log(error);
    }
  },
  getByReportId: async (id) => {
    try {
      return await req.get(`Leave/FindByReportId/${id}`);
    } catch (error) {
      console.log(error);
    }
  },

  createLeave: async (values) => {
    let formData = new FormData();
    formData.append("user_id", values.userId);
    formData.append("leave_type", parseInt(values.leaveType));
    formData.append("leave_startdate", values.startdate);
    formData.append("leave_enddate", values.enddate);
    formData.append("leave_note", values.note);
    try {
      let response = await req.postForm("Leave/CreateLeave", formData);
    } catch (error) {
      console.log(error);
    }
  },
  update: async (values, id) => {
    let formData = new FormData();
    formData.append("leave_type", parseInt(values.leaveType));
    formData.append("leave_startdate", values.startdate);
    formData.append("leave_enddate", values.enddate);
    formData.append("leave_quantity", values.quantity);
    formData.append("leave_note", values.note);
    try {
      let response = await req.postForm(`Leave/UpdateLeave?id=${id}`, formData);
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (id) => {
    try {
      let response = await req.postForm(`Leave/DeleteLeave/${id}`,{});
    } catch (error) {
      console.log(error);
    }
  },
};

export default Leave;
