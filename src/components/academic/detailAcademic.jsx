import React, { useState, useEffect } from "react";
import { router } from "../../routes/Routes";
import { useParams } from "react-router-dom";
import agent, { BaseURL } from "../../app/api/agent";
import { Image } from "antd";
import { config } from "../../constants/config";

const detailAcademic = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    getAcademicById();
  }, []);

  const getAcademicById = async () => {
    var response = await agent.Academic.getAcademicById(id);
    console.log(response);
    setData(response);
  };

  const DateTH = (date) =>
    Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(Date.parse(date));
  if (!data) return <>5555</>;
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
            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
              <h4 className="page-title">
                ข้อมูลประวัติตำเเหน่งทางวิชาการ (เพิ่มเติม)
              </h4>
            </div>
            <div className="col-lg-9 col-sm-8 col-md-8 col-xs-12">
              <div className="d-md-flex">
                <ol className="breadcrumb ms-auto">
                  <li>
                    <a href="#" className="fw-normal"></a>
                  </li>
                </ol>
                <button
                  onClick={() => router.navigate(-1)}
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
            <div className="col-lg-4 col-xlg-3 col-md-12">
              <div className="white-box">
                <div className="text-center">
                  {data.file ? (
                    <Image
                      width={274}
                      height={274}
                      alt="user"
                      src={BaseURL + data.file}
                    />
                  ) : (
                    <img
                      width={274}
                      height={274}
                      alt="user"
                      src={config.BASE_HOST + "images/image5.png"}
                    />
                  )}

                  <div className="overlay-box">
                    <div className="user-content">
                      <a>
                        <br></br>
                        <div className="form-group col-md-12 border-bottom p-0">
                          <h3>รูปคำสั่ง</h3>
                        </div>
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
                    <div className="col-lg-4 mb-4">
                      <label className="col-md-6 p-0">ตำเเหน่ง</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.academic_position}</h5>
                      </div>
                    </div>
                    <div className="col-lg-4 mb-4">
                      <label className="col-md-12 p-0">รหัสสาขา</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.academic_branchcode}</h5>
                      </div>
                    </div>{" "}
                    <div className="col-lg-4 mb-4">
                      <label className="col-md-12 p-0">ชื่อสาขา</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.academic_branchname}</h5>
                      </div>
                    </div>
                  </div>

                  <div className="form-group row align-items-center">
                    <div className="col-lg-6 mb-4">
                      <label className="col-md-6 p-0">วันที่ดำรงตำเเหน่ง</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{DateTH(data.academic_startdate)}</h5>
                      </div>
                    </div>
                  </div>
                  <div className="form-group row align-items-center">
                    <div className="col-lg-12 mb-4">
                      <label className="col-md-6 p-0">อ้างอิง</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.academic_refer}</h5>
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

export default detailAcademic;
