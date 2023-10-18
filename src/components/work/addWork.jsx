import React from "react";
import agent from "../../app/api/agent";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import Swal from "sweetalert2";
import { router } from "../../routes/Routes";
import { config } from "../../constants/config";

const addWork = () => {
  const { id } = useParams();
  var navigate = useNavigate();

  const submitAddWork = async (value) => {
    console.log(value);
    try {
      var response = await agent.Work.createWork(value, id);
      console.log(response);
      router.navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const SWalAddWork = async (value) => {
    Swal.fire({
      title: "คุณเเน่ใจไหม ?",
      text: "คุณต้องการเพิ่มข้อมูลประวัติการทำงานใช่หรือไม่ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
    }).then((result) => {
      if (result.isConfirmed) {
        submitAddWork(value);
      }
    });
  };
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
              <h4 className="page-title">เพิ่มประวัติการทำงาน</h4>
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
          <Formik
            initialValues={{
              startdate: "",
              enddate: "",
              employer: "",
              placename: "",
              position: "",
              reason: "",
            }}
            validate={(value) => {
              const error = {};
              if (!value.startdate) {
                error.startdate = "กรุณากรอกข้อมูล";
              }
              if (!value.enddate) {
                error.enddate = "กรุณากรอกข้อมูล";
              }
              if (value.startdate > value.enddate) {
                error.startdate = "วันที่เริ่มทำงานมากกว่าวันที่ลาออกจากงาน";
              }
              if (!value.employer) {
                error.employer = "กรุณากรอกข้อมูล";
              }
              if (!value.placename) {
                error.placename = "กรุณากรอกข้อมูล";
              }
              if (!value.position) {
                error.position = "กรุณากรอกข้อมูล";
              }
              if (!value.reason) {
                error.reason = "กรุณากรอกข้อมูล";
              }
              return error;
            }}
            onSubmit={SWalAddWork}
          >
            {({ values, handleChange, handleSubmit, errors, touched }) => (
              <form
                className="form-horizontal form-material"
                onSubmit={handleSubmit}
              >
                <div className="container-fluid">
                  <div className="">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="form-group col-lg-4 mb-4">
                            <label className="col-md-12 p-0">
                              วันที่เริ่มทำงาน
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="date"
                                name="startdate"
                                onChange={handleChange}
                                value={values.startdate}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.startdate &&
                                touched.startdate &&
                                errors.startdate}
                            </p>
                          </div>
                          <div className="form-group col-lg-4 mb-4">
                            <label className="col-md-12 p-0">
                              วันที่ลาออกจากงาน
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="date"
                                name="enddate"
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
                          <div className="form-group col-lg-4 mb-4">
                            <label className="col-md-12 p-0">ตำเเหน่ง</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="position"
                                placeholder="ตำเเหน่ง หน้าที่"
                                onChange={handleChange}
                                value={values.position}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.position &&
                                touched.position &&
                                errors.position}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-lg-6 mb-4">
                            <label className="col-md-12 p-0">
                              นายจ้าง หรือ บริษัท
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="employer"
                                placeholder="ชื่อนายจ้าง หรือ ชื่อบริษัท"
                                className="form-control p-0 border-0"
                                onChange={handleChange}
                                value={values.employer}
                              />
                            </div>
                            <p className="text-danger">
                              {errors.employer &&
                                touched.employer &&
                                errors.employer}
                            </p>
                          </div>
                          <div className="form-group col-lg-6 mb-4">
                            <label className="col-md-12 p-0">
                              เหตุผลที่ย้าย
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="reason"
                                placeholder="เหตุผลที่ย้ายออกจากงานเก่า"
                                className="form-control p-0 border-0"
                                onChange={handleChange}
                                value={values.reason}
                              />
                            </div>
                            <p className="text-danger">
                              {errors.reason && touched.reason && errors.reason}
                            </p>
                          </div>
                        </div>
                        <div className="form-group mb-4">
                          <label className="col-md-12 p-0">
                            ที่ตั้งของที่ทำงาน
                          </label>
                          <div className="col-md-12 border-bottom p-0">
                            <textarea
                              name="placename"
                              onChange={handleChange}
                              value={values.placename}
                              rows="5"
                              className="form-control p-0 border-0"
                            ></textarea>
                          </div>
                          <p className="text-danger">
                            {errors.placename &&
                              touched.placename &&
                              errors.placename}
                          </p>
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
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default addWork;
