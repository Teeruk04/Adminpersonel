import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from "react-router-dom";
import App from "../App.jsx";
import LayoutPrivate from "../layout";

import LoginScreen from "../components/user/login.jsx";
import TestScreen from "../components/user/test.jsx";
import MainUserScreen from "../components/user/mainUser";
import Register from "../components/user/register.jsx";
import DetailUser from "../components/user/detailUser.jsx";
import SpecsUser from "../components/user/specsUser.jsx";
import UpdateUser from "../components/user/updateUser.jsx";

import AddEducation from "../components/education/addEducation";
import MainEducationByUserId from "../components/education/mainEducationByUserId.jsx";
import DetailEducation from "../components/education/detailEducation";
import UpdateEducation from "../components/education/updateEducation";

import MainWork from "../components/work/mainWork.jsx";
import AddWork from "../components/work/addWork.jsx";
import UpdateWork from "../components/work/updateWork.jsx";

import MainArrest from "../components/arrest/mainArrest.jsx";
import AddArrest from "../components/arrest/addArrest.jsx";
import UpdateArrest from "../components/arrest/updateArrest.jsx";

import MainFaAndMo from "../components/FatherAndMother/mainFaAndMo.jsx";
import AddFaAndMo from "../components/FatherAndMother/addFaAndMo";
import UpdateFaAndMo from "../components/FatherAndMother/updateFaAndMo.jsx";

import MainMarriage from "../components/marriage/mainMarriage.jsx";
import AddMarriage from "../components/marriage/addMarriage.jsx";
import DetailMarriage from "../components/marriage/detailMarriage.jsx";
import UpdateMarriage from "../components/marriage/updateMarriage.jsx";

import MainChild from "../components/child/mainChild.jsx";
import AddChild from "../components/child/addChild.jsx";
import DetailChild from "../components/child/detailChild.jsx";
import UpdateChild from "../components/child/updateChild.jsx";

import MainActivity from "../components/activity/mainActivity.jsx";
import AddActivity from "../components/activity/addActivity.jsx";
import UpdateActivity from "../components/activity/updateActivity.jsx";

import MainTravel from "../components/travel/mainTravel.jsx";
import AddTravel from "../components/travel/addTravel.jsx";
import DetailTravel from "../components/travel/detailTravel.jsx";
import UpdateTravel from "../components/travel/updateTravel.jsx";

import MainManagePos from "../components/managePos/mainManagePos.jsx";
import AddManagePos from "../components/managePos/addManagePos.jsx";
import DetailManagePos from "../components/managePos/detailManagePos.jsx";
import UpdateManagePos from "../components/managePos/updateManagePos.jsx";

import MainAcademic from "../components/academic/mainAcademic.jsx";
import AddAcademic from "../components/academic/addAcademic.jsx";
import DetailAcademic from "../components/academic/detailAcademic.jsx";
import UpdateAcademic from "../components/academic/updateAcademic.jsx";

import MainSalary from "../components/salary/mainSalary";
import AddSalary from "../components/salary/addSalary";
import DetailSalary from "../components/salary/detailSalary";

import MainIngisnia from "../components/ingisnia/mainIngisnia.jsx";
import AddIngisnia from "../components/ingisnia/addIngisnia.jsx";
import UpdateIngisnia from "../components/ingisnia/updateIngisnia.jsx";

import MainAddress from "../components/address/mainAddress.jsx";
import AddAddress from "../components/address/addAddress.jsx";
import DetailAddress from "../components/address/detailAddress.jsx";
import UpdateAddress from "../components/address/updateAddress.jsx";

import AllPetition from "../components/petition/allPetition.jsx";
import MainPetition from "../components/petition/mainPetition.jsx";
import AddPetition from "../components/petition/addPetition.jsx";
import DetailPetition from "../components/petition/detailPetition.jsx";

import AddLeave from "../components/leave/addLeave.jsx";
import MainLeave from "../components/leave/mainLeave.jsx";
import UpdateLeave from "../components/leave/updateLeave";
import DetailReportLeave from "../components/leave/detailReportLeave.jsx";
import { config } from "../constants/config";
import { RoutePath } from "../constants/RoutePath.js";
import mainIngisnia from "../components/ingisnia/mainIngisnia.jsx";

const PrivateRoute = () => {
  if (!localStorage.getItem("user")) {
    router.navigate("/login");
  }
  return (
    <LayoutPrivate>
      <Outlet />
    </LayoutPrivate>
  );
};

const PublicRoute = () => {
  if (localStorage.getItem("user")) {
    router.navigate("/");
  }
  return <Outlet />;
};

export const Routes = (
  <Route path={RoutePath.home} element={<App />}>
    <Route path="*" element={<h1>not found</h1>} />

    <Route element={<PublicRoute />}>
      <Route path={RoutePath.login} element={<LoginScreen />} />
    </Route>
    <Route element={<PrivateRoute />}>
      <Route
        path={RoutePath.mainuser}
        element={<MainUserScreen />}
      />
      <Route path={RoutePath.register} element={<Register />} />
      <Route path={RoutePath.detailUser} element={<DetailUser />} />
      <Route path={RoutePath.specsUser} element={<SpecsUser />} />
      <Route path={RoutePath.updateUser} element={<UpdateUser />} />

      <Route path={RoutePath.addEducation} element={<AddEducation />} />
      <Route
        path={RoutePath.mainEducationByUserId}
        element={<MainEducationByUserId />}
      />
      <Route path={RoutePath.detailEducation} element={<DetailEducation />} />
      <Route path={RoutePath.updateEducation} element={<UpdateEducation />} />

      <Route path={RoutePath.mainWork} element={<MainWork />} />
      <Route path={RoutePath.addWork} element={<AddWork />} />
      <Route path={RoutePath.updateWork} element={<UpdateWork />} />

      <Route path={RoutePath.mainArrest} element={<MainArrest />} />
      <Route path={RoutePath.addArrest} element={<AddArrest />} />
      <Route path={RoutePath.updateArrest} element={<UpdateArrest />} />

      <Route path={RoutePath.mainFaAndMo} element={<MainFaAndMo />} />
      <Route path={RoutePath.addFaAndMo} element={<AddFaAndMo />} />
      <Route path={RoutePath.updateFaAndMo} element={<UpdateFaAndMo />} />

      <Route path={RoutePath.mainMarriage} element={<MainMarriage />} />
      <Route path={RoutePath.addMarriage} element={<AddMarriage />} />
      <Route path={RoutePath.detailMarriage} element={<DetailMarriage />} />
      <Route path={RoutePath.updateMarriage} element={<UpdateMarriage />} />

      <Route path={RoutePath.mainChild} element={<MainChild />} />
      <Route path={RoutePath.addChild} element={<AddChild />} />
      <Route path={RoutePath.detailChild} element={<DetailChild />} />
      <Route path={RoutePath.updateChild} element={<UpdateChild />} />

      <Route path={RoutePath.mainActivity} element={<MainActivity />} />
      <Route path={RoutePath.addActivity} element={<AddActivity />} />
      <Route path={RoutePath.updateActivity} element={<UpdateActivity />} />

      <Route path={RoutePath.mainTarvel} element={<MainTravel />} />
      <Route path={RoutePath.addTarvel} element={<AddTravel />} />
      <Route path={RoutePath.detailTarvel} element={<DetailTravel />} />
      <Route path={RoutePath.updateTarvel} element={<UpdateTravel />} />

      <Route path={RoutePath.mainManagePos} element={<MainManagePos />} />
      <Route path={RoutePath.addManagePos} element={<AddManagePos />} />
      <Route path={RoutePath.detailManagePos} element={<DetailManagePos />} />
      <Route path={RoutePath.updateManagePos} element={<UpdateManagePos />} />

      <Route path={RoutePath.mainAcademic} element={<MainAcademic />} />
      <Route path={RoutePath.addAcademic} element={<AddAcademic />} />
      <Route path={RoutePath.detailAcademic} element={<DetailAcademic />} />
      <Route path={RoutePath.updateAcademic} element={<UpdateAcademic />} />

      <Route path={RoutePath.mainSalary} element={<MainSalary />} />
      <Route path={RoutePath.addSalary} element={<AddSalary />} />
      <Route path={RoutePath.detailSalary} element={<DetailSalary />} />

      <Route path={RoutePath.mainIngisnia} element={<MainIngisnia />} />
      <Route path={RoutePath.addIngisnia} element={<AddIngisnia />} />
      <Route path={RoutePath.updateIngisnia} element={<UpdateIngisnia />} />

      <Route path={RoutePath.mainAddress} element={<MainAddress />} />
      <Route path={RoutePath.addAddress} element={<AddAddress />} />
      <Route path={RoutePath.detailAddress} element={<DetailAddress />} />
      <Route path={RoutePath.updateAddress} element={<UpdateAddress />} />

      <Route path={RoutePath.allPetition} element={<AllPetition />} />
      <Route path={RoutePath.mainPetition} element={<MainPetition />} />
      <Route path={RoutePath.addPetition} element={<AddPetition />} />
      <Route path={RoutePath.detailPetition} element={<DetailPetition />} />

      <Route path={RoutePath.mainLeave} element={<MainLeave />} />
      <Route path={RoutePath.addLeave} element={<AddLeave />} />
      <Route path={RoutePath.updateLeave} element={<UpdateLeave />} />
      <Route path={RoutePath.detailReportLeave} element={<DetailReportLeave />} />
    </Route>
  </Route>
);

export const router = createBrowserRouter(createRoutesFromElements(Routes));
