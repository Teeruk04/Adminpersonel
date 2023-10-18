import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import { router } from "../../routes/Routes";

const detailMarriage = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    if (id) getMarriageById();
  }, []);

  const getMarriageById = async () => {
    var response = await agent.Marriage.getMarriageById(id);
    console.log(response);
    setData(response);
  };
  const DateTH = (date) =>
    Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(Date.parse(date));
  if (!data) return <>55555</>;
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
              <h4 className="page-title">ประวัติของคู่สมรส (เพิ่มเติม)</h4>
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
            <div className="">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="form-group col-lg-3 mb-4">
                      <label className="col-md-12 p-0">คำนำหน้าชื่อ</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.title.title_name}</h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <label className="col-md-12 p-0">ชื่อของคู่สมรส</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.marria_name}</h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <label className="col-md-12 p-0">นามสกุลของคู่สมรส</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.marria_lastname}</h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <label className="col-md-12 p-0">วันเกิดของคู่สมรส</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{DateTH(data.marria_birdate)} </h5>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-lg-4 mb-4">
                      <label className="col-md-12 p-0">เชื้อชาติ</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.marria_race} </h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-4 mb-4">
                      <label className="col-md-12 p-0">ศาสนา</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.marria_religion} </h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-4 mb-4">
                      <label className="col-md-12 p-0">สัญชาติ</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.marria_nationality} </h5>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-lg-3 mb-4">
                      <label className="col-md-12 p-0">อาชีพ</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.marria_occupation} </h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <label className="col-md-12 p-0">ตำเเหน่ง</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.marria_position} </h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <label className="col-md-12 p-0">สถานที่ทำงาน</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.marria_workplace} </h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <label className="col-md-12 p-0">
                        เบอร์โทรศัพท์ของที่ทำงาน
                      </label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.marria_WPphone} </h5>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-lg-3 mb-4">
                      <label className="col-md-12 p-0">วันที่ทำการสมรส</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{DateTH(data.marriia_weddingday)} </h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <label className="col-md-12 p-0">เหตุผลที่เเยกย้าย</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.marria_divorce} </h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <label className="col-md-12 p-0">สถานะ</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.statusPC.statusPC_name} </h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <label className="col-md-12 p-0">
                        เบอร์โทรศัพท์ของคู่สมรส
                      </label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.marria_phone} </h5>
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-4">
                    <label className="col-md-12 p-0">ที่อยู่ของคู่สมรส</label>
                    <div className="col-md-12 border-bottom p-0">
                      <h5>{data.marria_address} </h5>
                    </div>
                  </div>
                  <div className="form-group mb-4">
                    <label className="col-md-12 p-0">
                      ที่อยู่ด้วยกันที่สุดท้าย
                    </label>
                    <div className="col-md-12 border-bottom p-0">
                      <h5>{data.marria_lastaddress} </h5>
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

export default detailMarriage;
