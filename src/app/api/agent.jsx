import axios from "axios";
import User from "./user";
import Title from "./title";
import Sex from "./sex";
import StatusU from "./statusU";
import Education from "./education";
import Level from "./level";
import Work from "./work";
import Arrest from "./arrest";
import FatherAndMother from "./fatherAndmother";
import TitleM from "./titleM";
import StatusPC from "./statuxPC";
import Marriage from "./marriage";
import Child from "./child";
import Activity from "./activity";
import Travel from "./travel";
import StatusS from "./statusS";
import ManagePos from "./managePos";
import Academic from "./academic";
import Salary from "./salary";
import TypeS from "./typeS";
import Insignia from "./insignia";
import Address from "./address";
import StatusA from "./statusA";
import Petition from "./petition";
import Leave from "./leave";
import ReportLeave from "./reportLeave";
const options = {
  baseURL: import.meta.env.VITE_API_URL,
};

export const BaseURL = import.meta.env.VITE_API_URL_IMAGE;

export const multipleDataOption = {
  headers: { "Content-Type": "multipart/formData" },
};

const instance = axios.create(options);

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

const ResponseBody = (res) => res.data;

// instance.interceptors.response.use(
//   async (res) => {
//     if (import.meta.env.VITE_ENV_NODE === "development") await sleep();
//     return res;
//   },
//   (err) => {
//     // var data = err.response?.data;
//     // var json = JSON.stringify(data);
//     // var result = JSON.parse(json);
//     // switch (result.status) {
//     //   case 400:
//     //     if (result.errors) {
//     //       const modelStateErrors = [];
//     //       for (const key in result.errors)
//     //         if (result.errors[key]) modelStateErrors.push(result.errors[key]);
//     //       throw modelStateErrors.flat();
//     //     }
//     //     toast.error(result.title);
//     //     break;
//     //   case 401:
//     //     toast.error(result.title);
//     //     break;
//     //   case 403:
//     //     toast.error('You are not allowed to do that!');
//     //     break;
//     //   case 404:
//     //     toast.error(result.title);
//     //     break;
//     //   case 500:
//     //     toast.error(result.title);
//     //     history.push("/server-error", { state: result });
//     //     break;
//     //   default:
//     //     break;
//     // }
//   }
// );

instance.interceptors.request.use((config) => {
  var token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `bearer ${token}`;
  }
  return config;
});

export const req = {
  get: (url, params) => instance.get(url, params).then(ResponseBody),
  getToken: (url, { params, headers }) =>
    instance.get(url, { params, headers }).then(ResponseBody),
  post: (url, body = {}) =>
    instance
      .post(url, body, {
        headers: { "Content-type": "application/json" },
      })
      .then(ResponseBody),
  put: (url, body) => instance.put(url, body).then(ResponseBody),
  delete: (url) => instance.delete(url).then(ResponseBody),

  postForm: (url, data) =>
    instance.post(url, data, multipleDataOption).then(ResponseBody),
  putForm: (url, data) =>
    instance.put(url, data, multipleDataOption).then(ResponseBody),
};

export function createFormData(item) {
  let formData = new FormData();
  for (const key in item) {
    formData.append(key, item[key]);
  }
  return formData;
}

export default {
  User,
  Title,
  Sex,
  StatusU,
  Education,
  Level,
  Work,
  Arrest,
  FatherAndMother,
  TitleM,
  StatusPC,
  Marriage,
  Child,
  Activity,
  Travel,
  StatusS,
  ManagePos,
  Academic,
  Salary,
  TypeS,
  Insignia,
  Address,
  StatusA,
  Petition,
  Leave,
  ReportLeave,
};
