import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import agent, { BaseURL } from "../../app/api/agent";
import Swal from "sweetalert2";
import { router } from "../../routes/Routes";
import { Image } from "antd";
import { config } from "../../constants/config";

const mainEducationByUserId = () => {
  let navigator = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState();
  const [user, setUser] = useState();
  const [local, setLocal] = useState();

  useEffect(() => {
    if (id) getEducationById();
    if (id) getUserById();
    getUserByLocal();
  }, []);

  const getUserByLocal = () => {
    var json = localStorage.getItem("user");
    console.log(JSON.parse(json));
    setLocal(JSON.parse(json));
  };

  const getEducationById = async () => {
    const response = await agent.Education.getByUserId(id);
    console.log(response);
    setData(response);
  };

  const getUserById = async () => {
    const result = await agent.User.getUserId(id);
    console.log(result);
    setUser(result);
  };

  const deleteEducation = async (id) => {
    console.log(id);
    await agent.Education.delete(id).then(getEducationById);
  };

  const DateTH = (date) =>
    Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(Date.parse(date));

  const SwalDelete = async (id) => {
    Swal.fire({
      title: "คุณเเน่ใจไหม ?",
      text: "คุณต้องการลบข้อมูลประวัติการศึกษาใช่หรือไม่ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteEducation(id);
      }
    });
  };

  if (!data) return <>55555</>;
  if (!user) return <>5555</>;
  if (!local) return <>5555</>;
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
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <h4 className="page-title">
                ข้อมูลประวัติการศึกษาของ {user.title.title_name} {user.user_name}{" "}
                {user.user_lastname}
              </h4>
            </div>
            <div className="col-lg-8 col-sm-8 col-md-8 col-xs-12">
              <div className="d-md-flex">
                <ol className="breadcrumb ms-auto">
                  <li>
                    <a href="#" className="fw-normal"></a>
                  </li>
                </ol>
                {local.data.statusUname == "เจ้าหน้าที่" ? (
                  <Link
                    to={config.BASE_HOST + `addEducation/${user.id}`}
                    // target="_blank" ลิงค์เปิดเเท็ปใหม่
                    className="btn btn-success  d-none d-md-block pull-right ms-3 hidden-xs hidden-sm waves-effect waves-light text-white"
                  >
                    เพิ่มประวัติการศึกษา
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
          <div className="container-fluid">
            <div className="row justify-content-center">
              {data.map((item, i) => {
                return (
                  <div key={i} className="col-lg-4 col-md-12">
                    <div className="white-box col  analytics-info">
                      <div className="text-center">
                        {item.file ? (
                          <Image
                            src={config.BASE_IMAGE + item.file}
                            height={150}
                            width={150}
                            alt="homepage"
                          />
                        ) : (
                          <img
                            src={config.BASE_HOST + "images/image5.png"}
                            height={150}
                            width={150}
                            alt="homepage"
                          />
                        )}
                      </div>
                      <br></br>
                      <h5 className=" text-center ">
                        วันที่ {DateTH(item.educa_startdate)} ถึง{" "}
                        {DateTH(item.educa_enddate)}
                      </h5>
                      <h5 className="text-center">
                        หลักสูตร {item.educa_course}
                      </h5>
                      <h5 className="text-center">
                        ระดับ {item.level.level_name} จาก {item.educa_placename}
                      </h5>
                      <h5 className="text-center">
                        {" "}
                        ที่ตั้งสถานที่ศึกษา {
                          item.educa_location
                        } ผลการศึกษา {item.educa_results}
                      </h5>
                      {local.data.statusUname == "เจ้าหน้าที่" ? (
                        <div className="dropdown text-center ">
                          <a
                            className="btn btn-secondary dropdown-toggle  btn-warning"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            จัดการ
                          </a>

                          <ul className="dropdown-menu">
                            <li>
                              <Link
                                className="dropdown-item"
                                to={
                                  config.BASE_HOST +
                                  `updateEducation/${item.id}`
                                }
                              >
                                เเก้ไขข้อมูล
                              </Link>
                            </li>
                            <li>
                              <button
                                onClick={() => SwalDelete(item.id)}
                                className="dropdown-item"
                              >
                                ลบข้อมูล
                              </button>
                            </li>
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default mainEducationByUserId;
