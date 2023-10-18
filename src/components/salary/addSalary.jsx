import React, { useState, useEffect } from "react";
import { router } from "../../routes/Routes";
import agent from "../../app/api/agent";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Formik } from "formik";

const addSalary = () => {
  const { id } = useParams();
  const [status, setStatus] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    getStatus();
    getType();
  }, []);

  const getStatus = async () => {
    var response = await agent.StatusS.getStatusS();
    console.log(response);
    setStatus(response);
  };

  const getType = async () => {
    var response = await agent.TypeS.getTypeS();
    console.log(response);
    setType(response);
  };

  const submitAddSalary = async (value) => {
    console.log(value);
    try {
      let response = await agent.Salary.createSalary(value, id);
      console.log(response);
      router.navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };
  const SwalAddSalary = async (value) => {
    Swal.fire({
      title: "คุณเเน่ใจไหม ?",
      text: "คุณต้องการเพิ่มข้อมูลประวัติการเลื่อนขั้นเงินเดือนใช่หรือไม่ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
    }).then((result) => {
      if (result.isConfirmed) {
        submitAddSalary(value);
      }
    });
  };
  if (!status) return <>5555</>;
  if (!type) return <>5555</>;
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
              <h4 className="page-title">เพิ่มประวัติการเลื่อนขั้นเงินเดือน</h4>
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
            <Formik
              initialValues={{
                statusS: "",
                typeS: "",
                detail: "",
                ordernum: "",
                datenum: "",
                effectivedate: "",
                enddate: "",
                beforepostpone: "",
                percentage: "",
                calculationbase: "",
              }}
              validate={(value) => {
                const error = {};
                if (!value.statusS) {
                  error.statusS = "กรุณาเลือกข้อมูล";
                }
                if (!value.typeS) {
                  error.typeS = "กรุณาเลือกข้อมูล";
                }
                if (!value.detail) {
                  error.detail = "กรุณากรอกข้อมูล";
                }
                if (!value.ordernum) {
                  error.ordernum = "กรุณากรอกข้อมูล";
                }
                if (!value.datenum) {
                  error.datenum = "กรุณากรอกข้อมูล";
                }
                if (!value.effectivedate) {
                  error.effectivedate = "กรุณากรอกข้อมูล";
                }
                if (!value.enddate) {
                  error.enddate = "กรุณากรอกข้อมูล";
                }
                if (value.datenum > value.effectivedate) {
                  error.datenum = "วันที่คำสั่งมากกว่าวันที่มีผล";
                }
                if (value.effectivedate > value.enddate) {
                  error.effectivedate = "วันที่มีผลมากกว่าวันสุดท้ายที่มีผล";
                }
                if (!value.beforepostpone) {
                  error.beforepostpone = "กรุณากรอกข้อมูล";
                }
                if (!value.percentage) {
                  error.percentage = "กรุณากรอกข้อมูล";
                }
                if (!value.calculationbase) {
                  error.calculationbase = "กรุณากรอกข้อมูล";
                }

                return error;
              }}
              onSubmit={SwalAddSalary}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                errors,
                touched,
                setFieldValue,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  className="form-horizontal form-material"
                >
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="form-group col-lg-3 mb-4 mb-4">
                            <label className="col-sm-12">สถานะ</label>

                            <div className="col-sm-12 border-bottom">
                              <select
                                onChange={(e) =>
                                  setFieldValue("statusS", e.target.value)
                                }
                                className="form-select "
                              >
                                <option>กรุณาเลือกข้อมูล</option>
                                {status.map((item, i) => {
                                  return (
                                    <option key={i} value={item.id}>
                                      {item.name}
                                    </option>
                                  );
                                })}
                                );
                              </select>
                            </div>
                            <p className="text-danger">
                              {errors.statusS &&
                                touched.statusS &&
                                errors.statusS}
                            </p>
                          </div>
                          <div className="form-group col-lg-3 mb-4 mb-4">
                            <label className="col-sm-12">ประเภท</label>

                            <div className="col-sm-12 border-bottom">
                              <select
                                onChange={(e) =>
                                  setFieldValue("typeS", e.target.value)
                                }
                                className="form-select "
                              >
                                <option>กรุณาเลือกข้อมูล</option>
                                {type.map((item, i) => {
                                  return (
                                    <option key={i} value={item.id}>
                                      {item.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <p className="text-danger">
                              {errors.typeS && touched.typeS && errors.typeS}
                            </p>
                          </div>
                          <div className="form-group col-lg-6 mb-4">
                            <label className="col-md-12 p-0">รายละเอียด</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="detail"
                                placeholder="รายละเอียดการเลื่อนขั้นเงินเดือน"
                                onChange={handleChange}
                                value={values.detail}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.detail && touched.detail && errors.detail}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">
                              เลขที่คำสั่ง
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="ordernum"
                                placeholder="เลขที่คำสั่ง"
                                onChange={handleChange}
                                value={values.ordernum}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.ordernum &&
                                touched.ordernum &&
                                errors.ordernum}
                            </p>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">
                              วันที่คำสั่ง
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="date"
                                name="datenum"
                                onChange={handleChange}
                                value={values.datenum}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.datenum &&
                                touched.datenum &&
                                errors.datenum}
                            </p>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">วันที่มีผล</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="date"
                                name="effectivedate"
                                onChange={handleChange}
                                value={values.effectivedate}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.effectivedate &&
                                touched.effectivedate &&
                                errors.effectivedate}
                            </p>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">ถึงวันที่</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="date"
                                name="enddate"
                                placeholder="หน่วยงานที่บริหาร"
                                onChange={handleChange}
                                value={values.enddate}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.enddate &&
                                touched.enddate &&
                                errors.enddate}
                            </p>
                          </div>
                        </div>

                        <div className="row">
                          <div className="form-group col-lg-4 mb-4">
                            <label className="col-md-12 p-0">
                              เงินเดือนก่อนเลื่อน
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="beforepostpone"
                                placeholder="เงินเดือนเดิม"
                                onChange={handleChange}
                                value={values.beforepostpone}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.beforepostpone &&
                                touched.beforepostpone &&
                                errors.beforepostpone}
                            </p>
                          </div>
                          <div className="form-group col-lg-4 mb-4">
                            <label className="col-md-12 p-0">ร้อยละ</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="percentage"
                                placeholder="ร้อยละที่เพิ่ม"
                                onChange={handleChange}
                                value={values.percentage}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.percentage &&
                                touched.percentage &&
                                errors.percentage}
                            </p>
                          </div>
                          <div className="form-group col-lg-4 mb-4">
                            <label className="col-md-12 p-0">ฐานคำนวณ</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="calculationbase"
                                placeholder="ฐานคำนวณ"
                                onChange={handleChange}
                                value={values.calculationbase}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.calculationbase &&
                                touched.calculationbase &&
                                errors.calculationbase}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="form-group mb-4">
                        <div className="col-sm-12">
                          <button type="submit" className="btn btn-success">
                            บันทึกข้อมูล
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default addSalary;
