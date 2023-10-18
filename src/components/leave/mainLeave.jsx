import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { router } from "../../routes/Routes";
import { config } from "../../constants/config.js";
import { Input, Space } from "antd";

const mainLeave = () => {
  const { id } = useParams();
  const [local, setLocal] = useState();
  const [reprotLeave, setReprotLeave] = useState();
  const [user, setUser] = useState();
  const { Search } = Input;

  const PDF_FILE_URL = `http://tee.kru.ac.th/Cs63/s10/Apppersonel/Leave/ใบลาป่วย ลาคลอดบุตร ลากิจส่วนตัว.pdf`;
  const PDF_THHWWGB_URL =
    "http://tee.kru.ac.th/Cs63/s10/Apppersonel/Leave/แบบใบลาไปช่วยเหลือภริยาที่คลอดบุตร.pdf";
  const PDF_LEAVE_URL =
    "http://tee.kru.ac.th/Cs63/s10/Apppersonel//Leave/แบบใบลาพักผ่อน.pdf";
  const PDF_ORDINATION_URL =
    "http://tee.kru.ac.th/Cs63/s10/Apppersonel/Leave/แบบใบลาอุปสมบท.pdf";
  useEffect(() => {
    getUserByLocal();
    getReportLeave();
    getUserById();
  }, []);

  const downloadFileAtURL = (url) => {
    const fileName = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };

  const getUserById = async () => {
    var response = await agent.User.getUserId(id);
    console.log(response);
    setUser(response);
  };

  const getReportLeave = async (search = "") => {
    var response = await agent.ReportLeave.getByUserId(id, search);
    console.log(response);
    setReprotLeave(response);
  };

  const getUserByLocal = () => {
    var json = localStorage.getItem("user");
    setLocal(JSON.parse(json));
  };

  if (!local) return <>5555</>;
  if (!reprotLeave) return <>5555</>;
  if (!user) return <>5555</>;
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
      <div className="page-wrapper">
        <div className="page-breadcrumb bg-white">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-4 col-sm-4 col-xs-12">
              <h4 className="page-title">
                ข้อมูลประวัติการลาของ {user.title.title_name} {user.user_name}{" "}
                {user.user_lastname}
              </h4>
            </div>
            <div className="col-lg-6 col-sm-8 col-md-8 col-xs-12">
              <div className="d-md-flex">
                <ol className="breadcrumb ms-auto">
                  <li>
                    <a href="#" className="fw-normal"></a>
                  </li>
                </ol>

                <div className="text-center  ">
                  <button
                    type="button"
                    id="dropdownMenuButton1"
                    className="btn btn-danger  dropdown-toggle waves-light text-white"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    เเบบใบลา
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-dark   text-white"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li className="text-center">
                      <button
                        onClick={() => {
                          downloadFileAtURL(PDF_FILE_URL);
                        }}
                        className="dropdown-item text-center text-white"
                      >
                        ใบลาป่วย ลาคลอดบุตร ลากิจส่วนตัว
                      </button>
                    </li>
                    <li className="text-center">
                      <button
                        onClick={() => {
                          downloadFileAtURL(PDF_THHWWGB_URL);
                        }}
                        className="dropdown-item text-center text-white"
                      >
                        ใบลาไปช่วยเหลือภริยาที่คลอดบุตร
                      </button>
                    </li>
                    <li className="text-center">
                      <button
                        onClick={() => {
                          downloadFileAtURL(PDF_LEAVE_URL);
                        }}
                        className="dropdown-item text-center text-white"
                      >
                        ใบลาพักผ่อน
                      </button>
                    </li>
                    <li className="text-center">
                      <button
                        onClick={() => {
                          downloadFileAtURL(PDF_ORDINATION_URL);
                        }}
                        className="dropdown-item text-center text-white"
                      >
                        ใบลาอุปสมบท
                      </button>
                    </li>
                  </ul>
                </div>
                {local.data.statusUname == "เจ้าหน้าที่" ? (
                  <Link
                    to={config.BASE_HOST + `addLeave/${id}`}
                    // target="_blank" ลิงค์เปิดเเท็ปใหม่
                    className="btn btn-success  d-none d-md-block pull-right ms-3 hidden-xs hidden-sm waves-effect waves-light text-white"
                  >
                    เพิ่มประวัติการลา
                  </Link>
                ) : null}

                <button
                  onClick={() => router.navigate(-1)}
                  // target="_blank" ลิงค์เปิดเเท็ปใหม่
                  className="btn btn-danger  d-none d-md-block pull-right ms-3 hidden-xs hidden-sm waves-effect waves-light text-white"
                >
                  ย้อนกลับ
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 ">
              <Search
                placeholder="ค้นหา"
                allowClear
                enterButton="ค้นหา"
                size="large"
                onSearch={getReportLeave}
              />
            </div>
          </div>

          {/* <div className="page-wrapper"> */}
          <div className="page-breadcrumb  mx-2">
            <div className="row justify-content-center">
              {/* {actions.map((item, i) => ( */}

              {reprotLeave.map((item, i) => {
                return (
                  <div key={i} className="col-lg-4 col-md-12">
                    <div className="white-box col  analytics-info">
                      <div className="text-center">
                        <h1>
                          การลาปี{" "}
                          {new Date(item.createdate).getFullYear() + 543}
                        </h1>
                      </div>
                      <div className="row">
                        <h5 className="  text-center">
                          วันลาพักผ่อนคงเหลือจากปีที่ผ่านมา{" "}
                          {item.reportL_lastyear} วัน
                        </h5>
                        <h5 className="  text-center">
                          วันลาพักร้อนประจำปีนี้ {item.reportL_thisyear} วัน
                        </h5>
                        <h5 className="  text-center">
                          รวมวันลาพักผ่อนประจำปีนี้ {item.reportL_leave} วัน
                        </h5>
                      </div>
                      <div className="text-center">
                        <Link
                          to={config.BASE_HOST + `detailReportLeave/${item.id}`}
                          className="btn btn-danger    waves-effect waves-light text-white"
                        >
                          ข้อมูลเพิ่มเติม
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* ))} */}
            </div>
          </div>
          <br></br>
        </div>
      </div>
    </div>
  );
};

export default mainLeave;
