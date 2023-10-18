import React, { useEffect, useState } from "react";
import agent, { BaseURL } from "../../app/api/agent";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { router } from "../../routes/Routes";
import { config } from "../../constants/config";

const Register = () => {
  var navigate = useNavigate();

  const [imageInput, setImageInput] = useState();
  const [title, setTitle] = useState();
  const [sex, setSex] = useState();
  const [statusU, setStatusU] = useState();

  useEffect(() => {
    getTitleList();
    getSexList();
    getStatusU();
  }, []);

  const getTitleList = async () => {
    var result = await agent.Title.getTitles();
    console.log(result);
    setTitle(result);
  };

  const getSexList = async () => {
    var result = await agent.Sex.getSexs();
    console.log(result);
    setSex(result);
  };

  const getStatusU = async () => {
    var result = await agent.StatusU.getStatusU();
    console.log(result);
    setStatusU(result);
  };

  const submitRegister = async (value) => {
    console.log(value);
    try {
      let response = await agent.User.register(value, imageInput);
      if (response.statusCode == 200) {
        navigate(config.BASE_HOST + "mainuser");
      } else {
        Swal.fire({
          icon: "error",

          title: "ชื่อเข้าใช้งานซ้ำ \nกรุณาเปลี่ยนชื่อใช้งานใหม่",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
      console.log(response);
    } catch (error) {
      Swal.fire({
        icon: "error",

        title: "ชื่อเข้าใช้งานซ้ำ \nกรุณาเปลี่ยนชื่อใช้งานใหม่",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    }
  };

  const SwalRegister = async (value) => {
    Swal.fire({
      title: "คุณเเน่ใจไหม ?",
      text: "คุณต้องการลงชื่อเข้าใช้งานใช่หรือไม่ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
    }).then((result) => {
      if (result.isConfirmed) {
        submitRegister(value);
      }
    });
  };
  if (!title)
    return (
      <>
        <h1>555</h1>
      </>
    );
  if (!statusU)
    return (
      <>
        <h1>5555</h1>
      </>
    );
  if (!sex)
    return (
      <>
        <h1>55555</h1>
      </>
    );
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
              <h4 className="page-title">เพิ่มข้อมูลบุคลากร</h4>
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
            username: "",
            password: "",
            name: "",
            lastname: "",
            cardnumber: "",
            birthdate: "",
            placeofbirth: "",
            race: "",
            nationality: "",
            religion: "",
            titleId: "",
            statusUId: "",
            sexId: "",
          }}
          validate={(value) => {
            const error = {};
            if (!value.username) {
              error.username = "กรุณากรอกชื่อเข้าใช้งาน";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.username)
            ) {
              error.username = "รูปเเบบอีเมลผิด";
            }
            if (!value.password) {
              error.password = "กรุณากรอกข้อมูล";
            }
            if (!value.name) {
              error.name = "กรุณากรอกข้อมูล";
            }
            if (!value.lastname) {
              error.lastname = "กรุณากรอกข้อมูล";
            }
            if (!value.cardnumber) {
              error.cardnumber = "กรุณากรอกข้อมูล";
            }
            if (value.cardnumber.length != 13) {
              error.cardnumber = "รูปเเบบเลขบัตรประจำตัวผิด";
            }
            if (!value.birthdate) {
              error.birthdate = "กรุณากรอกข้อมูล";
            }
            if (!value.placeofbirth) {
              error.placeofbirth = 'ไม่ทราบข้อมูล กรุณาใส่เครื่องหมาย " - "';
            }
            if (!value.race) {
              error.race = 'ไม่ทราบข้อมูล กรุณาใส่เครื่องหมาย " - "';
            }
            if (!value.nationality) {
              error.nationality = 'ไม่ทราบข้อมูล กรุณาใส่เครื่องหมาย " - "';
            }
            if (!value.religion) {
              error.religion = 'ไม่ทราบข้อมูล กรุณาใส่เครื่องหมาย " - "';
            }
            if (!value.titleId) {
              error.titleId = "กรุณาเลือก";
            }
            if (!value.statusUId) {
              error.statusUId = "กรุณาเลือกประเภทบุคลากร";
            }
            if (!value.sexId) {
              error.sexId = "กรุณาเลือกเพศ";
            }
            return error;
          }}
          onSubmit={SwalRegister}
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
                          <div className="col-lg-6 mb-4">
                            <label className="col-md-6 p-0">
                              ชื่อเข้าใช้งาน
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="email"
                                name="username"
                                placeholder="XXX@gmail.com"
                                onChange={handleChange}
                                value={values.username}
                                className="form-control p-0 border-0"
                              />
                            </div>
                            <p className="text-danger">
                              {errors.username &&
                                touched.username &&
                                errors.username}
                            </p>
                          </div>

                          <div className="col-lg-6 mb-4">
                            <label className="col-md-12 p-0">รหัสผ่าน</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                className="form-control p-0 border-0"
                                type="text"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                value={values.password}
                              />
                            </div>
                            <p className="text-danger">
                              {errors.password &&
                                touched.password &&
                                errors.password}
                            </p>
                          </div>
                        </div>

                        <div className="form-group row align-items-center">
                          <div className="form-group col-lg-2 mb-4">
                            <label className="col-sm-12">คำนำหน้า</label>

                            <div className="col-sm-12 border-bottom">
                              <select
                                onChange={(e) =>
                                  setFieldValue("titleId", e.target.value)
                                }
                                as="select"
                                name="titleId"
                                className="form-select shadow-none p-0 border-0 form-control-line"
                              >
                                <option>เลือก</option>
                                {title.map((item, i) => {
                                  return (
                                    <option key={i} value={item.id}>
                                      {item.title_name}
                                    </option>
                                  );
                                })}
                              </select>
                              <p className="text-danger">
                                {errors.titleId &&
                                  touched.titleId &&
                                  errors.titleId}
                              </p>
                            </div>
                          </div>

                          <div className="col-lg-5 mb-4">
                            <label className="col-md-6 p-0">ชื่อ</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                className="form-control p-0 border-0"
                                type="text"
                                name="name"
                                placeholder="ชื่อ"
                                onChange={handleChange}
                                value={values.name}
                              />
                            </div>
                            <p className="text-danger">
                              {errors.name && touched.name && errors.name}
                            </p>
                          </div>
                          <div className="col-lg-5 mb-4">
                            <label className="col-md-12 p-0">นามสกุล</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                className="form-control p-0 border-0"
                                type="text"
                                name="lastname"
                                placeholder="นามสกุล"
                                onChange={handleChange}
                                value={values.lastname}
                              />
                            </div>
                            <p className="text-danger">
                              {errors.lastname &&
                                touched.lastname &&
                                errors.lastname}
                            </p>
                          </div>
                        </div>

                        <div className="row align-items-center">
                          <div className="form-group col-lg-6 mb-4">
                            <label className="col-sm-12">เพศ</label>

                            <div className="col-sm-12 border-bottom">
                              <select
                                onChange={(e) =>
                                  setFieldValue("sexId", e.target.value)
                                }
                                name="sexId"
                                className="form-select shadow-none p-0 border-0 form-control-line"
                              >
                                <option>กรุณากรอกข้อมูล</option>
                                {sex.map((item, i) => {
                                  return (
                                    <option key={i} value={item.id}>
                                      {item.sex_name}
                                    </option>
                                  );
                                })}
                              </select>
                              <p className="text-danger">
                                {errors.sexId && touched.sexId && errors.sexId}
                              </p>
                            </div>
                          </div>
                          <div className="form-group col-lg-6 mb-4">
                            <label className="col-sm-12">ประเภทบุคลากร</label>

                            <div className="col-sm-12 border-bottom">
                              <select
                                onChange={(e) =>
                                  setFieldValue("statusUId", e.target.value)
                                }
                                name="statusUId"
                                className="form-select shadow-none p-0 border-0 form-control-line"
                              >
                                <option>กรุณากรอกข้อมูล</option>
                                {statusU.map((item, i) => {
                                  return (
                                    <option key={i} value={item.id}>
                                      {item.statusU_name}
                                    </option>
                                  );
                                })}
                              </select>
                              <p className="text-danger">
                                {errors.statusUId &&
                                  touched.statusUId &&
                                  errors.statusUId}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="form-group row align-items-center">
                          <div className="col-lg-4 mb-4">
                            <label className="col-md-6 p-0">
                              เลขบัตรประชาชน
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                className="form-control p-0 border-0"
                                type="text"
                                name="cardnumber"
                                placeholder="x-xxxx-xxxx-xx-x-x"
                                onChange={handleChange}
                                value={values.cardnumber}
                              />
                            </div>
                            <p className="text-danger">
                              {errors.cardnumber &&
                                touched.cardnumber &&
                                errors.cardnumber}
                            </p>
                          </div>
                          <div className="col-lg-4 mb-4">
                            <label className="col-md-12 p-0">
                              วันเดือนปีเกิด
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                className="form-control p-0 border-0"
                                type="date"
                                name="birthdate"
                                onChange={handleChange}
                                value={values.birthdate}
                              />
                            </div>
                            <p className="text-danger">
                              {errors.birthdate &&
                                touched.birthdate &&
                                errors.birthdate}
                            </p>
                          </div>
                          <div className="form-group col-lg-4 mb-4">
                            <label className="col-md-12 p-0">สถานที่เกิด</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                className="form-control p-0 border-0"
                                type="text"
                                name="placeofbirth"
                                placeholder="โรงพยาบาล หรือ สถานที่ต่างๆ"
                                onChange={handleChange}
                                value={values.placeofbirth}
                              />
                            </div>
                            <p className="text-danger">
                              {errors.placeofbirth &&
                                touched.placeofbirth &&
                                errors.placeofbirth}
                            </p>
                          </div>
                        </div>

                        <div className="form-group row align-items-center">
                          <div className="col-lg-4 mb-4">
                            <label className="col-md-6 p-0">เชื้อชาติ</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                className="form-control p-0 border-0"
                                type="text"
                                name="race"
                                placeholder="เชื้อชาติ"
                                onChange={handleChange}
                                value={values.race}
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.race && touched.race && errors.race}
                            </p>
                          </div>
                          <div className="col-lg-4 mb-4">
                            <label className="col-md-12 p-0">สัญชาติ</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                className="form-control p-0 border-0"
                                type="text"
                                name="nationality"
                                placeholder="สัญชาติ"
                                onChange={handleChange}
                                value={values.nationality}
                              />
                            </div>
                            <p className="text-danger">
                              {errors.nationality &&
                                touched.nationality &&
                                errors.nationality}
                            </p>
                          </div>
                          <div className="form-group col-lg-4 mb-4">
                            <label className="col-md-12 p-0">ศาสนา</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                className="form-control p-0 border-0"
                                type="text"
                                name="religion"
                                placeholder="ศาสนา"
                                onChange={handleChange}
                                value={values.religion}
                              />
                            </div>
                            <p className="text-danger">
                              {errors.religion &&
                                touched.religion &&
                                errors.religion}
                            </p>
                          </div>
                        </div>

                        <div className="form-group mb-4">
                          <div className="col-sm-12">
                            <button type="submit" className="btn btn-success">
                              เพิ่มข้อมูลบุคลากร
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

export default Register;
