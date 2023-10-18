import React, { useState, useEffect } from "react";
import { router } from "../../routes/Routes";
import agent from "../../app/api/agent";
import { useParams } from "react-router-dom";

const detailManagePos = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    if (id) getManagePos();
  }, []);

  const getManagePos = async () => {
    var response = await agent.ManagePos.getById(id);
    console.log(response);
    setData(response);
  };
  const DateTH = (date) =>
    Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(Date.parse(date));

  if (!data) return <></>;
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
              <h4 className="page-title">ข้อมูลประวัติตำเเหน่งบริหาร (เพิ่มเติม)</h4>
            </div>
            <div className="col-lg-8 col-sm-8 col-md-8 col-xs-12">
              <div className="d-md-flex">
                <ol className="breadcrumb ms-auto">
                  <li>
                    <a href="#" className="fw-normal"></a>
                  </li>
                </ol>
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
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="form-group col-lg-6 mb-4">
                      <label className="col-md-12 p-0">ตำเเหน่ง</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.manageP_position}</h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-6 mb-4">
                      <label className="col-md-12 p-0">หน่วยงาน</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.manageP_agency}</h5>
                      </div>
                    </div>
                  </div>
                  <div className="form-group  mb-4">
                    <label className="col-md-12 p-0">รายละเอียด</label>
                    <div className="col-md-12 border-bottom p-0">
                      <h5>{data.manageP_details}</h5>
                    </div>

                    <br></br>

                    <div className="row">
                      <div className="form-group col-lg-4 mb-4">
                        <label className="col-md-12 p-0">
                          วันที่เริ่มบริหาร
                        </label>
                        <div className="col-md-12 border-bottom p-0">
                          <h5>{DateTH(data.manageP_startdate)}</h5>
                        </div>
                      </div>
                      <div className="form-group col-lg-4 mb-4">
                        <label className="col-md-12 p-0">
                          วันสุดท้ายที่บริหาร
                        </label>
                        <div className="col-md-12 border-bottom p-0">
                          <h5>
                            {data.manageP_enddate == null
                              ? "ยังดำรงตำเเหน่งอยู่"
                              : DateTH(data?.manageP_enddate)}
                          </h5>
                        </div>
                      </div>
                      <div className="form-group col-lg-4 mb-4 mb-4">
                        <label className="col-sm-12">สถานะ</label>

                        <div className="col-sm-12 border-bottom">
                          <h5>{data.status.name}</h5>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group  mb-4">
                    <label className="col-md-12 p-0">อ้างอิง</label>
                    <div className="col-md-12 border-bottom p-0">
                      {data.manageP_refer}
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

export default detailManagePos;
