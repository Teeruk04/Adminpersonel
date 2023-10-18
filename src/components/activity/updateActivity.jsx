import React, { useEffect, useState } from "react";
import { router } from "../../routes/Routes";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import Swal from "sweetalert2";
import { Formik } from "formik";

const updateActivity = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    getActivityById();
  }, []);

  const submitUpdate = async (value) => {
    try {
      let response = await agent.Activity.update(value, id);
      console.log(response);
      router.navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };
  const SwalUpdate = async (value) => {
    Swal.fire({
      title: "คุณเเน่ใจไหม ?",
      text: "คุณต้องการเเก้ไขข้อมูลกิจกรรมพิเศษใช่หรือไม่ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
    }).then((result) => {
      if (result.isConfirmed) {
        submitUpdate(value);
      }
    });
  };

  const getActivityById = async () => {
    var response = await agent.Activity.getActivityById(id);
    console.log(response);
    setData(response);
  };
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
              <h4 className="page-title">เเก้ไขประวัติการทำกิจกรรมพิเศษ</h4>
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
            enableReinitialize={true}
            initialValues={{
              startdate: data.activi_startdate,
              enddate: data.activi_enddate,
              placename: data.activi_placename,
              position: data.activi_position,
            }}
            onSubmit={SwalUpdate}
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

export default updateActivity;
