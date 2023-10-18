import { req } from "./agent";
const Salary = {
  getSalaryById: async (id) => {
    try {
      return await req.get(`Salary/GetSalaryById?id=${id}`);
    } catch (error) {
      console.log(error);
    }
  },

  getSalaryByUserId: async (id, search = "") => {
    try {
      return await req.get(`Salary/FindByUserId${id}${search ? `?search=${search}` : ''}`);
    } catch (error) {
      console.log(error);
    }
  },

  createSalary: async (values, id) => {
    let formData = new FormData();
    formData.append("id_statusS", parseInt(values.statusS));
    formData.append("id_typeS", parseInt(values.typeS));
    formData.append("salary_details", values.detail);
    formData.append("salary_ordernum", values.ordernum);
    formData.append("salary_datenum", values.datenum);
    formData.append("salary_effectivedate", values.effectivedate);
    formData.append("salary_enddate", values.enddate);
    formData.append("salary_beforepostpone", values.beforepostpone);
    formData.append("salary_percentage", values.percentage);
    formData.append("salary_calculationbase", values.calculationbase);

    try {
      let response = await req.postForm(
        `Salary/CreateSalary?userid=${id}`,
        formData
      );
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (id) => {
    try {
      let response = await req.postForm(`Salary/DeleteSalary/${id}`, {});
    } catch (error) {
      console.log(error);
    }
  },
};

export default Salary;
