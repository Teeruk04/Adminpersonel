import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import agent, { BaseURL } from "../../app/api/agent";
import { config } from "../../constants/config";

const detailEducation = () => {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [education, setEducation] = useState();

  useEffect(() => {
    if (id) getUserById();
    if (id) getEducationById();
  }, []);

  const getUserById = async () => {
    const result = await agent.User.getUserId(id);
    console.log(result);
    setUser(result);
  };

  const getEducationById = async () => {
    const response = await agent.Education.getEducationById(id);
    console.log(response);
    setEducation(response);
  };

  if (!user) return <>455444</>;
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
        {" "}
        <div className="page-breadcrumb bg-white">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
              <h4 className="page-title">
                ข้อมูลของ {user.titlename} {user.user_name} {user.user_lastname}
              </h4>
            </div>
            <div className="col-lg-9 col-sm-8 col-md-8 col-xs-12">
              <div className="d-md-flex">
                <ol className="breadcrumb ms-auto">
                  <li>
                    <a href="#" className="fw-normal"></a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-xlg-3 col-md-12">
              <div className="white-box">
                <div className="text-center">
                  <img
                    src={config.BASE_HOST + "/images/image5.png"}
                    width={178}
                    height={178}
                    alt="homepage"
                  />
                  <br></br>
                  <br></br>
                  <h3>ใบรายงานผลการศึกษา</h3>
                  <div className="overlay-box">
                    <div className="user-content">
                      <a>
                        <br></br>
                        <div className="form-group col-md-12 border-bottom p-0"></div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-xlg-9 col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="form-group row align-items-center">
                    <div className="form-group col-lg-6  col-lg-2 mb-4">
                      <label className="col-sm-12">วันที่เริ่มการศึกษา</label>
                      <div className="col-sm-12 border-bottom">
                        <h5>วันที่ 5 มกราคม 2561</h5>
                      </div>
                    </div>

                    <div className="col-lg-6 mb-4">
                      <label className="col-md-6 p-0">วันที่จบการศึกษา</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>วันที่ 15 มกราคม 2565</h5>
                      </div>
                    </div>
                  </div>

                  <div className="row align-items-center">
                    <div className="form-group col-lg-4 mb-4">
                      <label className="col-sm-12">หลักสูตร</label>
                      <div className="col-sm-12 border-bottom">
                        <h5>กฟหกหฟก</h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-4 mb-4">
                      <label className="col-sm-12">ระดับการศึกษา</label>

                      <div className="col-sm-12 border-bottom">
                        <h5>กฟหก</h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-4 mb-4">
                      <label className="col-sm-12">ชื่อสถานที่ศึกษา</label>

                      <div className="col-sm-12 border-bottom">
                        <h5>กฟหก</h5>
                      </div>
                    </div>
                  </div>

                  <div className="form-group row align-items-center">
                    <div className="col-lg-6 mb-4">
                      <label className="col-md-6 p-0">
                        ที่ตั้งสถานที่ศึกษา
                      </label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>ฟหกฟหก</h5>
                      </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <label className="col-md-12 p-0">ผลการศึกษา</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>ฟกฟหก</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default detailEducation;
