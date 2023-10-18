import React, { useState, useEffect } from "react";
import { router } from "../../routes/Routes";
import agent from "../../app/api/agent";
import { useParams } from "react-router-dom";

const detailSalary = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    getSalaryById();
  }, []);

  const getSalaryById = async () => {
    var response = await agent.Salary.getSalaryById(id);
    console.log(response);
    setData(response);
  };

  const DateTH = (date) =>
    Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(Date.parse(date));

  const IntMoney = (int) => {
    var money = new Intl.NumberFormat("th-TH");
    return money.format(int);
  };
  if (!data) return <>555</>;
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
              <h4 className="page-title">ข้อมูลประวัติการเลื่อนขั้นเงินเดือน (เพิ่มเติม)</h4>
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
                    <div className="form-group col-lg-3 mb-4 mb-4">
                      <label className="col-sm-12">สถานะ</label>

                      <div className="col-sm-12 border-bottom">
                        <h5>{data.status.name}</h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4 mb-4">
                      <label className="col-sm-12">ประเภท</label>

                      <div className="col-sm-12 border-bottom">
                        <h5>{data.types.name}</h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-6 mb-4">
                      <label className="col-md-12 p-0">รายละเอียด</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.salary_details}</h5>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-lg-3 mb-4">
                      <label className="col-md-12 p-0">เลขที่คำสั่ง</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.salary_ordernum}</h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <label className="col-md-12 p-0">วันที่คำสั่ง</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{DateTH(data.salary_datenum)}</h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <label className="col-md-12 p-0">วันที่มีผล</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{DateTH(data.salary_effectivedate)}</h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <label className="col-md-12 p-0">ถึงวันที่</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>
                          {data.salary_enddate == null
                            ? "ยังไม่ระบุ"
                            : DateTH(data.salary_enddate)}{" "}
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-lg-3 mb-4">
                      <label className="col-md-12 p-0">เงินเดือน (บาท)</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{IntMoney(data.salary_salary)}</h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <label className="col-md-12 p-0">
                        เงินเดือนก่อนเลื่อน (บาท)
                      </label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{IntMoney(data.salary_beforepostpone)}</h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <label className="col-md-12 p-0">ร้อยละ (%)</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{data.salary_percentage}</h5>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <label className="col-md-12 p-0">ฐานคำนวณ (บาท)</label>
                      <div className="col-md-12 border-bottom p-0">
                        <h5>{IntMoney(data.salary_calculationbase)}</h5>
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

export default detailSalary;
