import React, { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import Swal from "sweetalert2";
import { router } from "../../routes/Routes";
import { config } from "../../constants/config";

const addEducation = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [level, setLevel] = useState();
  const [imageInput, setImageInput] = useState();

  useEffect(() => {
    getLevelList();
  }, []);

  const getLevelList = async () => {
    var result = await agent.Level.getLevels();
    console.log(result);
    setLevel(result);
  };

  const submitAddEducation = async (value) => {
    console.log(value);
    try {
      let response = await agent.Education.createEducation(
        value,
        imageInput,
        id
      );
      router.navigate(-1);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const SwalAddEducation = async (vales) => {
    Swal.fire({
      title: "คุณเเน่ใจไหม ?",
      text: "คุณต้องการเพิ่มข้อมูลประวัติการศึกษาใช่หรือไม่ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
    }).then((result) => {
      if (result.isConfirmed) {
        submitAddEducation(vales);
      }
    });
  };

  if (!level) return <>555555</>;
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
              <h4 className="page-title">เพิ่มประวัติการศึกษา</h4>
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
        <br></br>
        <Formik
          initialValues={{
            startdate: "",
            enddate: "",
            placename: "",
            location: "",
            course: "",
            results: "",
            levelId: "",
          }}
          validate={(values) => {
            const error = {};
            if (!values.startdate) {
              error.startdate = "กรุณาเลือกวันที่";
            }
            if (!values.enddate) {
              error.enddate = "กรุณาเลือกวันที่";
            }
            if (values.startdate > values.enddate) {
              error.startdate = "วันที่เริ่มการศึกษามากกว่าวันที่จบการศึกษา";
            }
            if (!values.placename) {
              error.placename = "กรุณากรอกข้อมูล";
            }
            if (!values.location) {
              error.location = "กรุณากรอกข้อมูล";
            }
            if (!values.course) {
              error.course = "กรุณากรอกข้อมูล";
            }
            if (!values.results) {
              error.results = "กรุณากรอกข้อมูล";
            }
            if (!values.levelId) {
              error.levelId = "กรุณาเลือกระดับการศึกษา";
            }
            return error;
          }}
          onSubmit={SwalAddEducation}
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
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-4 col-xlg-3 col-md-12">
                    <div className="white-box">
                      <div className="">
                        {imageInput ? (
                          <img
                            width="100%"
                            style={{ cursor: "pointer" }}
                            src={URL.createObjectURL(imageInput)}
                            alt="..."
                          />
                        ) : (
                          <img
                            width="100%"
                            src={config.BASE_HOST + "images/image5.png"}
                          />
                        )}
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
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className=" text-center ">
                        <h3>ใบรายงานผลการศึกษา</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-xlg-9 col-md-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="row form-group mb-4">
                          <div className="col-lg-6 mb-4">
                            <label className="col-md-12 p-0">
                              วันที่เริ่มการศึกษา
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="date"
                                name="startdate"
                                placeholder="Johnathan Doe"
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
                          <div className="col-lg-6 mb-4">
                            <label className="col-md-12 p-0">
                              วันที่จบการศึกษา
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="date"
                                name="enddate"
                                placeholder="Johnathan Doe"
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
                        <div className="row form-group mb-4">
                          <div className="col-lg-4 mb-4">
                            <label className="col-md-12 p-0">หลักสูตร</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="course"
                                placeholder="สาขา หรือ วิชาที่เรียน"
                                onChange={handleChange}
                                value={values.course}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.course && touched.course && errors.course}
                            </p>
                          </div>
                          <div className="form-group col-lg-4 mb-4 mb-4">
                            <label className="col-sm-12">ระดับการศึกษา</label>

                            <div className="col-sm-12 border-bottom">
                              <select
                                onChange={(e) =>
                                  setFieldValue("levelId", e.target.value)
                                }
                                className="form-select shadow-none p-0 border-0 form-control-line"
                              >
                                <option>กรุณาเลือกข้อมูล</option>
                                {level.map((item, i) => {
                                  return (
                                    <option key={i} value={item.id}>
                                      {item.level_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <p className="text-danger">
                              {errors.levelId &&
                                touched.levelId &&
                                errors.levelId}
                            </p>
                          </div>
                          <div className="col-lg-4 mb-4">
                            <label className="col-md-12 p-0">
                              ชื่อสถานที่ศึกษา
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="placename"
                                placeholder="ชื่อสถานศึกษา หรือ มหาวิทยาลัย"
                                onChange={handleChange}
                                value={values.placename}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.placename &&
                                touched.placename &&
                                errors.placename}
                            </p>
                          </div>
                        </div>

                        <div className="form-group mb-4">
                          <label className="col-md-12 p-0">
                            ที่ตั้งสถานที่ศึกษา
                          </label>
                          <div className="col-md-12 border-bottom p-0">
                            <textarea
                              name="location"
                              onChange={handleChange}
                              value={values.location}
                              rows="5"
                              className="form-control p-0 border-0"
                            ></textarea>
                          </div>
                          <p className="text-danger">
                            {errors.location &&
                              touched.location &&
                              errors.location}
                          </p>
                        </div>
                        <div className="row form-group mb-4">
                          <div className="col-lg-4 mb-4">
                            <label className="col-md-12 p-0">ผลการศึกษา</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="results"
                                placeholder="ผลการศึกษา"
                                onChange={handleChange}
                                value={values.results}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.results &&
                                touched.results &&
                                errors.results}
                            </p>
                          </div>
                          <div className="col-lg-4 mb-4"></div>
                          <div className="col-lg-4 mb-4"></div>
                        </div>

                        <div className="form-group mb-4">
                          <div className="col-sm-12">
                            <button type="submit" className="btn btn-success">
                              เพิ่มประวัติการศึกษา
                            </button>
                          </div>
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
  );
};

export default addEducation;
