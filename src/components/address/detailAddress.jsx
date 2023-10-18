import React, { useState, useEffect } from "react";
import { router } from "../../routes/Routes";
import agent from "../../app/api/agent";
import { useParams } from "react-router-dom";
const detailAddress = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    getAddress();
  }, []);

  const getAddress = async () => {
    var response = await agent.Address.getAddressById(id);
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
              <h4 className="page-title">ประวัติที่อยู่อาศัย (เพิ่มเติม)</h4>
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
                  <div className="form-group row align-items-center">
                    <div className="form-group col-lg-4 mb-4">
                      <label className="col-md-12 p-0">วันเเรก</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{DateTH(data.address_startdate)}</h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-4 mb-4">
                      <label className="col-md-12 p-0">วันสุดท้าย</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>
                          {DateTH(data.address_enddate)}
                        </h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-4 mb-4">
                      <label className="col-md-12 p-0">สถานะ</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.statusA.name}</h5>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-lg-4 mb-4">
                      <label className="col-md-12 p-0">บ้านเลขที่</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.address_housenumber}</h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-4 mb-4">
                      <label className="col-md-12 p-0">ซอย</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>
                          {data.address_alley != null
                            ? data.address_alley
                            : "ไม่ระบุ"}
                        </h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-4 mb-4">
                      <label className="col-md-12 p-0">ถนน</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>
                          {data.address_road != null
                            ? data.address_road
                            : "ไม่ระบุ"}
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-lg-3 mb-4">
                      <label className="col-md-12 p-0">ตำบล</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.address_canton}</h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <label className="col-md-12 p-0">อำเภอ</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.address_district}</h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <label className="col-md-12 p-0">จังหวัด</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.address_province}</h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <label className="col-md-12 p-0">ประเทศ</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.address_country}</h5>
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

export default detailAddress;
