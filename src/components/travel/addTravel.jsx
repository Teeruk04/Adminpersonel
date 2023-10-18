import React from "react";
import { router } from "../../routes/Routes";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import { Formik } from "formik";
import Swal from "sweetalert2";

const addTravel = () => {
  const { id } = useParams();

  const submitAddTravel = async (value) => {
    console.log(value);
    try {
      let response = await agent.Travel.addTravel(value, id);
      console.log(response);
      router.navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };
  const SwalAddTravel = async (value) => {
    Swal.fire({
      title: "คุณเเน่ใจไหม ?",
      text: "คุณต้องการเพิ่มข้อมูลประวัติการเดินทางไปต่างประเทศใช่หรือไม่ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
    }).then((result) => {
      if (result.isConfirmed) {
        submitAddTravel(value);
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
              <h4 className="page-title">เพิ่มประวัติการเดินทางไปต่างประเทศ</h4>
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
              city: "",
              county: "",
              purpose: "",
              capital: "",
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
                error.startdate = "วันเเรกที่ไปมากกว่าวันสุดท้ายที่กลับ";
              }
              if (!value.city) {
                error.city = "กรุณากรอกข้อมูล";
              }
              if (!value.county) {
                error.county = "กรุณากรอกข้อมูล";
              }
              if (!value.purpose) {
                error.purpose = "กรุณากรอกข้อมูล";
              }
              if (!value.capital) {
                error.capital = "กรุณากรอกข้อมูล";
              }
              return error;
            }}
            onSubmit={SwalAddTravel}
          >
            {({ values, handleChange, handleSubmit, errors, touched }) => (
              <form
                className="form-horizontal form-material"
                onSubmit={handleSubmit}
              >
                <div className="container-fluid">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="form-group col-lg-6 mb-4">
                            <label className="col-md-12 p-0">
                              วันเเรกที่ไป
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
                          <div className="form-group col-lg-6 mb-4">
                            <label className="col-md-12 p-0">
                              วันสุดท้ายที่กลับ
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="date"
                                name="enddate"
                                onChange={handleChange}
                                value={values.enddate}
                                placeholder="ข้อหา หรือ คดี ที่ถูกฟ้อง"
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
                            <label className="col-md-12 p-0">ชื่อเมือง</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="city"
                                onChange={handleChange}
                                value={values.city}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.city && touched.city && errors.city}
                            </p>
                          </div>
                          <div className="form-group col-lg-4 mb-4">
                            <label className="col-md-12 p-0">ประเทศ</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="county"
                                onChange={handleChange}
                                value={values.county}
                                placeholder="ข้อหา หรือ คดี ที่ถูกฟ้อง"
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.county && touched.county && errors.county}
                            </p>
                          </div>
                          <div className="form-group col-lg-4 mb-4">
                            <label className="col-md-12 p-0">
                              ทุนที่ได้รับ
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="capital"
                                onChange={handleChange}
                                value={values.capital}
                                placeholder="ข้อหา หรือ คดี ที่ถูกฟ้อง"
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.capital &&
                                touched.capital &&
                                errors.capital}
                            </p>
                          </div>
                        </div>

                        <div className="form-group  mb-4">
                          <label className="col-md-12 p-0">
                            ความมุ่งหมายของการเดินทางไปต่างประเทศ
                          </label>
                          <div className="col-md-12 border-bottom p-0">
                            <textarea
                              name="purpose"
                              onChange={handleChange}
                              value={values.purpose}
                              rows="5"
                              className="form-control p-0 border-0"
                            ></textarea>
                          </div>
                          <p className="text-danger">
                            {errors.purpose &&
                              touched.purpose &&
                              errors.purpose}
                          </p>
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
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default addTravel;
