import React, { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import { router } from "../../routes/Routes";
import { Formik } from "formik";
import Swal from "sweetalert2";
import { config } from "../../constants/config";

const addPetition = () => {
  const [imageInput, setImageInput] = useState();

  const submitAddPetition = async (value) => {
    console.log(value);
    try {
      let response = await agent.Petition.createPetition(value, imageInput);
      console.log(response);
      router.navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };
  const SwalAddPetition = async (value) => {
    Swal.fire({
      title: "คุณเเน่ใจไหม ?",
      text: "คุณต้องการยืนคำร้องใช่หรือไม่ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
    }).then((result) => {
      if (result.isConfirmed) {
        submitAddPetition(value);
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
            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
              <h4 className="page-title">การยื่นคำร้อง</h4>
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
          <div className="container-fluid">
            <Formik
              initialValues={{
                message: "",
              }}
              validate={(value) => {
                const error = {};
                if (!value.message) {
                  error.message = "กรุณากรอกข้อมูล";
                }
                return error;
              }}
              onSubmit={SwalAddPetition}
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
                          {" "}
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
                              alt="user"
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
                      </div>
                    </div>
                    <div className="col-lg-8 col-xlg-9 col-md-12">
                      <div className="card">
                        <div className="card-body">
                          <div className="form-group row align-items-center">
                            <div className=" mb-4">
                              <label className=" p-0">รายละเอียด</label>
                              <div className="col-md-12 border-bottom p-0">
                                <textarea
                                  name="message"
                                  placeholder="รายละเอียดการยื่นคำร้อง"
                                  onChange={handleChange}
                                  value={values.message}
                                  rows="5"
                                  className="form-control p-0 border-0"
                                ></textarea>
                              </div>
                              <p className="text-danger">
                                {errors.message &&
                                  touched.message &&
                                  errors.message}
                              </p>
                            </div>
                          </div>

                          <div className="form-group mb-4">
                            <div className="col-sm-12">
                              <button type="submit" className="btn btn-success">
                                ยื่นคำร้อง
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
    </div>
  );
};

export default addPetition;
