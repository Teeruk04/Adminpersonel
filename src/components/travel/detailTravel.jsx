import React, { useEffect, useState } from "react";
import { router } from "../../routes/Routes";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";

const detailTravel = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    if (id) getTravelById();
  }, []);

  const getTravelById = async () => {
    var response = await agent.Travel.getTravelById(id);
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
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <h4 className="page-title">
                ข้อมูลประวัติการเดินทางไปต่างประเทศ (เพิ่มเติม)
              </h4>
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
                      <label className="col-md-12 p-0">วันเเรกที่ไป</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{DateTH(data.travel_startdate)}</h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-6 mb-4">
                      <label className="col-md-12 p-0">วันสุดท้ายที่กลับ</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{DateTH(data.travel_enddate)}</h5>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-lg-4 mb-4">
                      <label className="col-md-12 p-0">ชื่อเมือง</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.travel_city}</h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-4 mb-4">
                      <label className="col-md-12 p-0">ประเทศ</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.travel_county}</h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-4 mb-4">
                      <label className="col-md-12 p-0">ทุนที่ได้รับ</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.travel_capital}</h5>
                      </div>
                    </div>
                  </div>

                  <div className="form-group  mb-4">
                    <label className="col-md-12 p-0">
                      ความมุ่งหมายของการเดินทางไปต่างประเทศ
                    </label>
                    <div className="col-md-12 border-bottom p-0">
                      {data.travel_purpose}
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

export default detailTravel;
