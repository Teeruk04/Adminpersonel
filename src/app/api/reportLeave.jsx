import { req } from "./agent";

const ReportLeave = {
  getByUserId: async (id, search = "") => {
    console.log(search);
    try {

      return await req.get(`ReponseLeave/FindByUserId/${id}${search ? `?search=${search}` : ''}`);
    } catch (error) {
      console.log(error);
    }
  },

  getByReportId: async (id) => {
    try {
      return await req.get(`ReponseLeave/GetReportLeaveById?id=${id}`);
    } catch (error) {
      console.log(error);
    }
  },
};

export default ReportLeave;
