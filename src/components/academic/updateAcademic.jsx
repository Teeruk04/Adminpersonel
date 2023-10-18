import React, { useState, useEffect } from "react";
import { router } from "../../routes/Routes";
import agent, { BaseURL } from "../../app/api/agent";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import Swal from "sweetalert2";
import { config } from "../../constants/config";

const updateAcademic = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [imageInput, setImageInput] = useState();

  useEffect(() => {
    getAcademicMyId();
  }, []);

  const getAcademicMyId = async () => {
    var response = await agent.Academic.getAcademicById(id);
    console.log(response);
    setData(response);
  };

  const submitUpdate = async (value) => {
    try {
      let response = await agent.Academic.update(value, imageInput, id);
      console.log(response);
      router.navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const SwalUpdate = async (value) => {
    Swal.fire({
      title: "คุณเเน่ใจไหม ?",
      text: "คุณต้องการเเก้ไขข้อมูลตำเเหน่งทางวิชาการใช่หรือไม่ !",
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
            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
              <h4 className="page-title">
                เเก้ไขข้อมูลประวัติตำเเหน่งทางวิชาการ
              </h4>
            </div>
            <div className="col-lg-9 col-sm-8 col-md-8 col-xs-12">
              <div className="d-md-flex">
                <ol className="breadcrumb ms-auto">
                  <li>
                    <a href="#" className="fw-normal"></a>
                  </li>
                </ol>
                <button
                  onClick={() => router.navigate(-1)}
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
              position: data.academic_position,
              branchcode: data.academic_branchcode,
              branchname: data.academic_branchname,
              startdate: data.academic_startdate,
              refer: data.academic_refer,
            }}
            onSubmit={SwalUpdate}
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
                <div className="row">
                  <div className="col-lg-4 col-xlg-3 col-md-12">
                    <div className="white-box">
                      <div className="">
                        <img
                          width="100%"
                          alt="user"
                          src={config.BASE_HOST + "images/image5.png"}
                        />
                        <div className="overlay-box">
                          <div className="user-content">
                            <a>
                              <br></br>
                              <div className="form-group col-md-12 border-bottom p-0">
                                <input
                                  className="form-control p-0 border-0"
                                  type="file"
                                  multiple
                                  onChange={(e) => {
                                    e.preventDefault();
                                    if (e.currentTarget.files.length > 0)
                                      setImageInput(e.currentTarget.files[0]);
                                  }}
                                />
                                <br></br>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-xlg-9 col-md-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="form-group row align-items-center">
                          <div className="col-lg-4 mb-4">
                            <label className="col-md-6 p-0">ตำเเหน่ง</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="position"
                                placeholder="ตำเเหน่งทางวิชาการ"
                                onChange={handleChange}
                                value={values.position}
                                className="form-control p-0 border-0"
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 mb-4">
                            <label className="col-md-12 p-0">รหัสสาขา</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                className="form-control p-0 border-0"
                                type="text"
                                name="branchcode"
                                placeholder="รหัสของสาขา"
                                onChange={handleChange}
                                value={values.branchcode}
                              />
                            </div>
                          </div>{" "}
                          <div className="col-lg-4 mb-4">
                            <label className="col-md-12 p-0">ชื่อสาขา</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                className="form-control p-0 border-0"
                                type="text"
                                name="branchname"
                                placeholder="ชื่อของสาขา"
                                onChange={handleChange}
                                value={values.branchname}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="form-group row align-items-center">
                          <div className="col-lg-6 mb-4">
                            <label className="col-md-6 p-0">
                              วันที่ดำรงตำเเหน่ง
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                className="form-control p-0 border-0"
                                type="date"
                                name="startdate"
                                placeholder="ชื่อ"
                                onChange={handleChange}
                                value={values.startdate}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group row align-items-center">
                          <div className="col-lg-12 mb-4">
                            <label className="col-md-6 p-0">อ้างอิง</label>
                            <div className="col-md-12 border-bottom p-0">
                              <textarea
                                name="refer"
                                onChange={handleChange}
                                value={values.refer}
                                rows="2"
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

export default updateAcademic;
