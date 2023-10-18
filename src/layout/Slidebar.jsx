import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { config } from "../constants/config";
const Slidebar = () => {
  const navigator = useNavigate();

  const [user, setUser] = useState();
  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    var json = localStorage.getItem("user");
    setUser(JSON.parse(json));
  };

  const SwalLogout = () => {
    Swal.fire({
      title: "ออกจากระบบ?",
      text: "คุณต้องการออกจากระบบใช่หรือไม่!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "ไม่",
      confirmButtonText: "ใช่",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigator(config.BASE_HOST + "login");
  };

  if (!user) return null;
  return (
    <div
      id="main-wrapper"
      data-layout="vertical"
      data-navbarbg="skin5"
      data-sidebartype="full"
      data-sidebar-position="absolute"
      data-header-position="absolute"
      data-boxed-layout="full"
    >
      <aside className="left-sidebar" data-sidebarbg="skin6">
        <div className="scroll-sidebar">
          <nav className="sidebar-nav">
            <ul id="sidebarnav">
              <li className="sidebar-item pt-2">
                <Link
                  to={config.BASE_HOST}
                  className="sidebar-link waves-effect waves-dark sidebar-link"
                  aria-expanded="false"
                >
                  <i className="fa fa-user" aria-hidden="true"></i>
                  <span className="hide-menu">ประวัติส่วนตัว</span>
                </Link>

                <Link
                  to={config.BASE_HOST + `mainPetition/${user.data.id}`}
                  className="sidebar-link waves-effect waves-dark sidebar-link"
                  aria-expanded="false"
                >
                  <i className="fas fa-file-alt" aria-hidden="true"></i>
                  <span className="hide-menu">การยื่นคำร้อง</span>
                </Link>
                <br></br>
                {user.data.statusUname == "เจ้าหน้าที่" ? (
                  <Link
                    to={config.BASE_HOST + "mainuser"}
                    className="sidebar-link waves-effect waves-dark sidebar-link"
                    aria-expanded="false"
                  >
                    <i className="fas fa-address-book" aria-hidden="true"></i>
                    <span className="hide-menu">ข้อมูลบุคลากร</span>
                  </Link>
                ) : null}
                {user.data.statusUname == "เจ้าหน้าที่" ? (
                  <Link
                    to={config.BASE_HOST + "allPetition"}
                    className="sidebar-link waves-effect waves-dark sidebar-link"
                    aria-expanded="false"
                  >
                    <i className="fas fa-pencil-alt" aria-hidden="true"></i>
                    <span className="hide-menu">จัดการการยื่นคำร้อง</span>
                  </Link>
                ) : null}
              </li>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <li className="text-center p-20 upgrade-btn">
                <Link
                  onClick={() => SwalLogout()}
                  className="btn d-grid btn-danger text-white"
                  // target="_blank"
                >
                  ออกจากระบบ
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default Slidebar;
