import React, { useState, useEffect } from "react";
import { BaseURL } from "../app/api/agent";
import { config } from "../constants/config";

const Navbar = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    var json = localStorage.getItem("user");
    setUser(JSON.parse(json).data);
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
      <header className="topbar" data-navbarbg="skin5">
        <nav className="navbar top-navbar navbar-expand-md navbar-dark">
          <div className="navbar-header bg-dark" data-logobg="skin6">
            <a className="navbar-brand">
              <span className="logo-text">
                <img
                  width={225}
                  height={70}
                  src={config.BASE_HOST + "/images/personel1.png"}
                  alt="homepage"
                />
              </span>
            </a>
            <a className="nav-toggler waves-effect waves-light text-dark d-block d-md-none">
              <i className="ti-menu ti-close"></i>
            </a>
          </div>

          <div
            className="navbar-collapse collapse"
            id="navbarSupportedContent"
            data-navbarbg="skin5"
          >
            <ul className="navbar-nav d-none d-md-block d-lg-none">
              <li className="nav-item">
                <a className="nav-toggler nav-link waves-effect waves-light text-white">
                  <i className="ti-menu ti-close"></i>
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto d-flex align-items-center">
              {/* <li className=" in">
                <form role="search" className="app-search d-none d-md-block me-3">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="form-control mt-0"
                  />
                  <a href="" className="active">
                    <i className="fa fa-search"></i>
                  </a>
                </form>
              </li> */}
              <li>
                <a className="profile-pic" href="#">
                  {user.field ? (
                    <img
                      src={config.BASE_IMAGE + user.field}
                      alt="user-img"
                      width="50"
                      height="50"
                      className="img-circle"
                    />
                  ) : (
                    <img
                      src={config.BASE_HOST + "images/image5.png"}
                      alt="user-img"
                      width="50"
                      height="50"
                      className="img-circle"
                    />
                  )}

                  <span className="text-white font-medium">
                    {user.titlename} {user.user_name} {user.user_lastname}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
