import React from "react";
import { useParams } from "react-router-dom";
import { router } from "../../routes/Routes";
import agent from "../../app/api/agent";
import { Formik } from "formik";
import Swal from "sweetalert2";

const addActivity = () => {
  const { id } = useParams();

  const submitAddActivity = async (value) => {
    console.log(value);
    try {
      let response = await agent.Activity.addActivity(value, id);
      console.log(response);
      router.navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const SwalAddArest = async (value) => {
    Swal.fire({
      title: "คุณเเน่ใจไหม ?",
      text: "คุณต้องการเพิ่มข้อมูลประวัติการทำกิจกรรมพิเศษใช่หรือไม่ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
    }).then((result) => {
      if (result.isConfirmed) {
        submitAddActivity(value);
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
              <h4 className="page-title">เพิ่มประวัติการทำกิจกรรมพิเศษ</h4>
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
              placename: "",
              position: "",
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
                error.startdate =
                  "วันที่เริ่มทำกิจกรรมมากกว่าวันสุดท้ายที่ทำกิจกรรม";
              }
              if (!value.placename) {
                error.placename =
                  'กรุณากรอกข้อมูล ถ้าไม่ทราบข้อมูลให้ใส่เครื่องหมาย "-"';
              }
              if (!value.position) {
                error.position =
                  'กรุณากรอกข้อมูล ถ้าไม่ทราบข้อมูลให้ใส่เครื่องหมาย "-"';
              }
              return error;
            }}
            onSubmit={SwalAddArest}
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
                              วันที่เริ่มทำกิจกรรม
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
                              วันสุดท้ายที่ทำกิจกรรม
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
                          <div className="form-group col-lg-6 mb-4">
                            <label className="col-md-12 p-0">
                              สถานศึกษาหรือสถานที่ไปทำกิจกรรม
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
                          <div className="form-group col-lg-6 mb-4">
                            <label className="col-md-12 p-0">
                              ตำเเหน่งหน้าที่
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <textarea
                                name="position"
                                onChange={handleChange}
                                value={values.position}
                                rows="5"
                                className="form-control p-0 border-0"
                              ></textarea>
                            </div>
                            <p className="text-danger">
                              {errors.position &&
                                touched.position &&
                                errors.position}
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
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default addActivity;
