import React from "react";
import { UserOutlined } from "@ant-design/icons";
const Footer = () => {
  return (
      <footer className="footer text-center ">
        {" "}
        {/* 2021 © Ample Admin brought to you by{" "}
      <a href="https://www.wrappixel.com/">wrappixel.com</a> */}
        <h5>
          <i className="fa fa-user" aria-hidden="true"></i> นาย ผดุงเกียรติ
          มณีวงษ์
        </h5>
        <h5>
          <i className="fab fa-facebook" aria-hidden="true"></i> Mai Phadungkiad
        </h5>
        <h5>
          <i className="fas fa-home" aria-hidden="true"></i> 105 หมู่ 1
          ตำบลสระกระโจม อำเภอดอนเจดีย์ จังหวัดสุพนนณบุรี 72250
        </h5>
        <h5>
          <i className="fas fa-phone" aria-hidden="true"></i> 065-637-8742
        </h5>
      </footer>
  );
};

export default Footer;
