import { config } from "./config";

export const RoutePath = {
  home: config.BASE_HOST,
  test: config.BASE_HOST + "test",
  login: config.BASE_HOST + "login",
  mainuser: config.BASE_HOST + "mainuser",
  register: config.BASE_HOST + "register",
  detailUser: config.BASE_HOST + "detail/:id",
  specsUser: config.BASE_HOST,
  updateUser: config.BASE_HOST + "updateUser/:id",

  addEducation: config.BASE_HOST + "addEducation/:id",
  mainEducationByUserId: config.BASE_HOST + "mainEducationByUserId/:id",
  detailEducation: config.BASE_HOST + "detailEducation/:id",
  updateEducation: config.BASE_HOST + "updateEducation/:id",

  mainWork: config.BASE_HOST + "mainWork/:id",
  addWork: config.BASE_HOST + "addWork/:id",
  updateWork: config.BASE_HOST + "updateWork/:id",

  mainArrest: config.BASE_HOST + "mainArrest/:id",
  addArrest: config.BASE_HOST + "addArrest/:id",
  updateArrest: config.BASE_HOST + "updateArrest/:id",

  mainFaAndMo: config.BASE_HOST + "mainFaAndMo/:id",
  addFaAndMo: config.BASE_HOST + "addFaAndMo/:id",
  updateFaAndMo: config.BASE_HOST + "updateFaAndMo/:id",

  mainMarriage: config.BASE_HOST + "mainmarriage/:id",
  addMarriage: config.BASE_HOST + "addmarriage/:id",
  detailMarriage: config.BASE_HOST + "detailMarriage/:id",
  updateMarriage: config.BASE_HOST + "updateMarriage/:id",

  mainChild: config.BASE_HOST + "mainChild/:id",
  addChild: config.BASE_HOST + "addChild/:id",
  detailChild: config.BASE_HOST + "detailChild/:id",
  updateChild: config.BASE_HOST + "updateChild/:id",

  mainActivity: config.BASE_HOST + "mainActivity/:id",
  addActivity: config.BASE_HOST + "addActivity/:id",
  updateActivity: config.BASE_HOST + "updateActivity/:id",

  mainTarvel: config.BASE_HOST + "maintarvel/:id",
  addTarvel: config.BASE_HOST + "addTarvel/:id",
  detailTarvel: config.BASE_HOST + "detailTarvel/:id",
  updateTarvel: config.BASE_HOST + "updateTarvel/:id",

  mainManagePos: config.BASE_HOST + "mainManagePos/:id",
  addManagePos: config.BASE_HOST + "addManagePos/:id",
  detailManagePos: config.BASE_HOST + "detailManagePos/:id",
  updateManagePos: config.BASE_HOST + "updateManagePos/:id",

  mainAcademic: config.BASE_HOST + "mainAcademic/:id",
  addAcademic: config.BASE_HOST + "addAcademic/:id",
  detailAcademic: config.BASE_HOST + "detailAcademic/:id",
  updateAcademic: config.BASE_HOST + "updateAcademic/:id",

  mainSalary: config.BASE_HOST + "mainSalary/:id",
  addSalary: config.BASE_HOST + "addSalary/:id",
  detailSalary: config.BASE_HOST + "detailSalary/:id",

  mainIngisnia: config.BASE_HOST + "mainIngisnia/:id",
  addIngisnia: config.BASE_HOST + "addIngisnia/:id",
  updateIngisnia: config.BASE_HOST + "updateIngisnia/:id",

  mainAddress: config.BASE_HOST + "mainAddress/:id",
  addAddress: config.BASE_HOST + "addAddress/:id",
  detailAddress: config.BASE_HOST + "detailAddress/:id",
  updateAddress: config.BASE_HOST + "updateAddress/:id",

  allPetition: config.BASE_HOST + "allPetition",
  mainPetition: config.BASE_HOST + "mainPetition/:id",
  addPetition: config.BASE_HOST + "addPetition/:id",
  detailPetition: config.BASE_HOST + "detailPetition/:id",

  mainLeave: config.BASE_HOST + "mainLeave/:id",
  addLeave: config.BASE_HOST + "addLeave/:id",
  updateLeave: config.BASE_HOST + "updateLeave/:id",
  detailReportLeave: config.BASE_HOST + "detailReportLeave/:id",
};
