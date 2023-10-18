import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import { router } from "../../routes/Routes";

const detailChild = () => {
  const [data, setData] = useState();
  const { id } = useParams();

  useEffect(() => {
    if (id) getChildById();
  }, []);
  const getChildById = async () => {
    var response = await agent.Child.getChildById(id);
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
              <h4 className="page-title">ข้อมูลประวัติบุตร (เพิ่มเติม)</h4>
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
                    <label className="col-md-12 p-0">ชื่อของบุตร</label>
                    <div className="col-md-12 border-bottom p-0">
                      <h5>{data.child_name}</h5>
                    </div>
                  </div>
                  <div className="form-group col-lg-3 mb-4">
                    <label className="col-md-12 p-0">นามสกุลของบุตร</label>
                    <div className="col-md-12 border-bottom p-0">
                      <h5>{data.child_lastname}</h5>
                    </div>
                  </div>
                  <div className="form-group col-lg-3 mb-4">
                    <label className="col-md-12 p-0">วันเกิดของงบุตร</label>
                    <div className="col-md-12 border-bottom p-0">
                      <h5>{DateTH(data.child_birthdate)}</h5>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-lg-4 mb-4">
                    <label className="col-md-12 p-0">เชื้อชาติ</label>
                    <div className="col-md-12 border-bottom p-0">
                      <h5>{data.child_race}</h5>
                    </div>
                  </div>
                  <div className="form-group col-lg-4 mb-4">
                    <label className="col-md-12 p-0">ศาสนา</label>
                    <div className="col-md-12 border-bottom p-0">
                      <h5>{data.child_religion}</h5>
                    </div>
                  </div>
                  <div className="form-group col-lg-4 mb-4">
                    <label className="col-md-12 p-0">สัญชาติ</label>
                    <div className="col-md-12 border-bottom p-0">
                      <h5>{data.child_nationlyty}</h5>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-lg-3 mb-4">
                    <label className="col-md-12 p-0">อาชีพ</label>
                    <div className="col-md-12 border-bottom p-0">
                      <h5>{data.child_occupation}</h5>
                    </div>
                  </div>
                  <div className="form-group col-lg-3 mb-4">
                    <label className="col-md-12 p-0">ตำเเหน่ง</label>
                    <div className="col-md-12 border-bottom p-0">
                      <h5>{data.child_position}</h5>
                    </div>
                  </div>
                  <div className="form-group col-lg-3 mb-4">
                    <label className="col-md-12 p-0">สถานที่ทำงาน</label>
                    <div className="col-md-12 border-bottom p-0">
                      <h5>{data.child_workplace}</h5>
                    </div>
                  </div>
                  <div className="form-group col-lg-3 mb-4">
                    <label className="col-md-12 p-0">
                      เบอร์โทรศัพท์ของบุตร
                    </label>
                    <div className="col-md-12 border-bottom p-0">
                      <h5>{data.child_phone}</h5>
                    </div>
                  </div>
                </div>

                <div className="form-group mb-4">
                  <label className="col-md-12 p-0">ที่อยู่ของบุตร</label>
                  <div className="col-md-12 border-bottom p-0">
                    <h5>{data.chaild_address}</h5>
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

export default detailChild;
