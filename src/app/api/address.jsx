import { req } from "./agent";
const address = {
  getAddressById: async (id) => {
    try {
      return await req.get(`Address/GetAddressById?id=${id}`);
    } catch (error) {
      console.log(error);
    }
  },
  getAddressByUserId: async (id) => {
    try {
      return await req.get(`Address/FindByUserId${id}`);
    } catch (error) {
      console.log(error);
    }
  },
  createAddress: async (values, id) => {
    let formData = new FormData();
    formData.append("address_startdate", values.startdate);
    formData.append("address_enddate", values.enddate);
    formData.append("address_housenumber", values.housenumber);
    formData.append("address_alley", values.alley);
    formData.append("address_road", values.road);
    formData.append("address_canton", values.canton);
    formData.append("address_district", values.district);
    formData.append("address_province", values.province);
    formData.append("address_country", values.country);
    formData.append("id_statusA", parseInt(values.statusA));

    try {
      let response = await req.postForm(
        `Address/CreateAddress?userid=${id}`,
        formData
      );
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (id) => {
    try {
      let response = await req.postForm(`Address/DeleteAddress/${id}`,{});
    } catch (error) {
      console.log(error);
    }
  },

  update: async (values, id) => {
    let formData = new FormData();
    formData.append("address_startdate", values.startdate);
    formData.append("address_enddate", values.enddate);
    formData.append("address_housenumber", values.housenumber);
    formData.append("address_alley", values.alley);
    formData.append("address_road", values.road);
    formData.append("address_canton", values.canton);
    formData.append("address_district", values.district);
    formData.append("address_province", values.province);
    formData.append("address_country", values.country);
    formData.append("id_statusA", parseInt(values.statusA));

    try {
      let response = await req.postForm(
        `Address/UpdateAddress?id=${id}`,
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

export default address;
