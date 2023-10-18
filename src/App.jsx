import React from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../src/utils/ScrollToTop";
import { Font } from "@react-pdf/renderer";
import { config } from "./constants/config";

const App = () => {
  Font.register({
    family: "K2D",
    src: config.BASE_HOST + "fonts/K2D-Bold.ttf",
  });
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

export default App;
