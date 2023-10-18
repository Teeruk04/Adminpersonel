import React, { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import Swal from "sweetalert2";
import { router } from "../../routes/Routes";

const addFaAndMo = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [titleM, setTitleM] = useState();
  useEffect(() => {
    getTitleM();
  }, []);

  const getTitleM = async () => {
    var response = await agent.TitleM.getTitleMs();
    console.log(response);
    setTitleM(response);
  };

  const submitAddFaAndMo = async (value) => {
    console.log(value);
    try {
      let response = await agent.FatherAndMother.addFatherAndMother(value, id);
      console.log(response);
      router.navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const SwalAddFaAndMo = async (value) => {
    Swal.fire({
      title: "คุณเเน่ใจไหม ?",
      text: "คุณต้างการเพิ่มข้อมูลประวัติบิดาเเละมารดาใช่หรือไม่ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
    }).then((result) => {
      if (result.isConfirmed) {
        submitAddFaAndMo(value);
      }
    });
  };

  if (!titleM) return <>555555</>;
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
              <h4 className="page-title">
                เพิ่มประวัติการถูกจับหรือการฟ้องศาล
              </h4>
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
        <div class="container-fluid">
          <Formik
            initialValues={{
              nameF: "",
              lastNameF: "",
              birthDateF: "",
              placebirthF: "",
              raceF: "",
              religionF: "",
              nationalityF: "",
              addressF: "",
              phoneF: "",
              occupationF: "",
              positionF: "",
              workplaceF: "",
              WPhoneF: "",
              titleM: "",
              nameM: "",
              lastNameM: "",
              birthDateM: "",
              placebirthM: "",
              raceM: "",
              religionM: "",
              nationalityM: "",
              addressM: "",
              phoneM: "",
              occupationM: "",
              positionM: "",
              workplaceM: "",
              WPhoneM: "",
            }}
            validate={(value) => {
              const error = {};
              if (!value.nameF) {
                error.nameM = 'กรุณากรอกข้อมูล ถ้าไม่มีกรุณาใส่ " - "  ';
              }
              if (!value.lastNameF) {
                error.lastNameF = 'กรุณากรอกข้อมูล ถ้าไม่มีกรุณาใส่ " - "  ';
              }
              if (!value.birthDateF) {
                error.birthDateF = 'กรุณากรอกข้อมูล ถ้าไม่มีกรุณาใส่ " - "  ';
              }
              if (!value.placebirthF) {
                error.placebirthF = 'กรุณากรอกข้อมูล ถ้าไม่มีกรุณาใส่ " - "  ';
              }
              if (!value.raceF) {
                error.raceF = 'กรุณากรอกข้อมูล ถ้าไม่มีกรุณาใส่ " - "  ';
              }
              if (!value.religionF) {
                error.religionF = 'กรุณากรอกข้อมูล ถ้าไม่มีกรุณาใส่ " - "  ';
              }
              if (!value.nationalityF) {
                error.nationalityF = 'กรุณากรอกข้อมูล ถ้าไม่มีกรุณาใส่ " - "  ';
              }
              if (!value.addressF) {
                error.addressF = 'กรุณากรอกข้อมูล ถ้าไม่มีกรุณาใส่ " - "  ';
              }
              if (!value.phoneF) {
                error.phoneF = 'กรุณากรอกข้อมูล ถ้าไม่มีกรุณาใส่ " - "  ';
              }
              if (!value.occupationF) {
                error.occupationF = 'กรุณากรอกข้อมูล ถ้าไม่มีกรุณาใส่ " - "  ';
              }
              if (!value.positionF) {
                error.positionF = 'กรุณากรอกข้อมูล ถ้าไม่มีกรุณาใส่ " - "  ';
              }
              if (!value.workplaceF) {
                error.workplaceF = 'กรุณากรอกข้อมูล ถ้าไม่มีกรุณาใส่ " - "  ';
              }
              if (!value.WPhoneF) {
                error.WPhoneF = 'กรุณากรอกข้อมูล ถ้าไม่มีกรุณาใส่ " - "  ';
              }
              if (!value.titleM) {
                error.titleM = 'กรุณากรอกข้อมูล ถ้าไม่มีกรุณาใส่ " - "  ';
              }
              if (!value.nameM) {
                error.nameM = 'กรุณากรอกข้อมูล ถ้าไม่มีกรุณาใส่ " - "  ';
              }
              if (!value.lastNameM) {
                error.lastNameM = 'กรุณากรอกข้อมูล ถ้าไม่มีกรุณาใส่ " - "  ';
              }
              if (!value.birthDateM) {
                error.birthDateM = 'กรุณากรอกข้อมูล ถ้าไม่มีกรุณาใส่ " - "  ';
              }
              if (!value.placebirthM) {
                error.placebirthM = 'กรุณากรอกข้อมูล ถ้าไม่มีกรุณาใส่ " - "  ';
              }
              if (!value.raceM) {
                error.raceM = 'กรุณากรอกข้อมูล ถ้าไม่มีกรุณาใส่ " - "  ';
              }
              if (!value.religionM) {
                error.religionM = 'กรุณากรอกข้อมูล ถ้าไม่มีกรุณาใส่ " - "  ';
              }
              if (!value.nationalityM) {
                error.nationalityM = 'กรุณากรอกข้อมูล ถ้าไม่มีกรุณาใส่ " - "  ';
              }
              if (!value.addressM) {
                error.addressM = 'กรุณากรอกข้อมูล ถ้าไม่มีกรุณาใส่ " - "  ';
              }
              if (!value.phoneM) {
                error.phoneM = 'กรุณากรอกข้อมูล ถ้าไม่มีกรุณาใส่ " - "  ';
              }
              if (!value.occupationM) {
                error.occupationM = 'กรุณากรอกข้อมูล ถ้าไม่มีกรุณาใส่ " - "  ';
              }
              if (!value.positionM) {
                error.positionM = 'กรุณากรอกข้อมูล ถ้าไม่มีกรุณาใส่ " - "  ';
              }
              if (!value.workplaceM) {
                error.workplaceM = 'กรุณากรอกข้อมูล ถ้าไม่มีกรุณาใส่ " - "  ';
              }
              if (!value.WPhoneM) {
                error.WPhoneM = 'กรุณากรอกข้อมูล ถ้าไม่มีกรุณาใส่ " - "  ';
              }
              return error;
            }}
            onSubmit={SwalAddFaAndMo}
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
                className="form-horizontal form-material "
                onSubmit={handleSubmit}
              >
                <div class="container-fluid">
                  <div class="col-md-12">
                    <div class="card">
                      <div class="card-body">
                        <h3>ประวัติของบิดา</h3>
                        <div className="form-group row align-items-center">
                          <div class="form-group col-lg-3 mb-4">
                            <label class="col-md-12 p-0">ชื่อ</label>
                            <div class="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="nameF"
                                onChange={handleChange}
                                value={values.nameF}
                                class="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.nameF && touched.nameF && errors.nameF}
                            </p>
                          </div>
                          <div class="form-group col-lg-3 mb-4">
                            <label class="col-md-12 p-0">นามสกุล</label>
                            <div class="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="lastNameF"
                                onChange={handleChange}
                                value={values.lastNameF}
                                class="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.lastNameF &&
                                touched.lastNameF &&
                                errors.lastNameF}
                            </p>
                          </div>
                          <div class="form-group col-lg-3 mb-4">
                            <label class="col-md-12 p-0">วันเดือนปีเกิด</label>
                            <div class="col-md-12 border-bottom p-0">
                              <input
                                type="date"
                                name="birthDateF"
                                onChange={handleChange}
                                value={values.birthDateF}
                                class="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.birthDateF &&
                                touched.birthDateF &&
                                errors.birthDateF}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div class="form-group col-lg-3 mb-4">
                            <label class="col-md-12 p-0">
                              สถานที่ทะเบียนเกิด
                            </label>
                            <div class="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="placebirthF"
                                onChange={handleChange}
                                value={values.placebirthF}
                                class="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.placebirthF &&
                                touched.placebirthF &&
                                errors.placebirthF}
                            </p>
                          </div>
                          <div class="form-group col-lg-3 mb-4">
                            <label class="col-md-12 p-0">เชื้อชาติ</label>
                            <div class="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="raceF"
                                onChange={handleChange}
                                value={values.raceF}
                                class="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.raceF && touched.raceF && errors.raceF}
                            </p>
                          </div>
                          <div class="form-group col-lg-3 mb-4">
                            <label class="col-md-12 p-0">ศาสนา</label>
                            <div class="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="religionF"
                                onChange={handleChange}
                                value={values.religionF}
                                class="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.religionF &&
                                touched.religionF &&
                                errors.religionF}
                            </p>
                          </div>
                          <div class="form-group col-lg-3 mb-4">
                            <label class="col-md-12 p-0">สัญชาติ</label>
                            <div class="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="nationalityF"
                                onChange={handleChange}
                                value={values.nationalityF}
                                class="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.nationalityF &&
                                touched.nationalityF &&
                                errors.nationalityF}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div class="form-group col-lg-6 mb-4">
                            <label class="col-md-12 p-0">ที่อยุ่ปัจจุบัน</label>
                            <div class="col-md-12 border-bottom p-0">
                              <textarea
                                type="text"
                                name="addressF"
                                rows={5}
                                onChange={handleChange}
                                value={values.addressF}
                                class="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.addressF &&
                                touched.addressF &&
                                errors.addressF}
                            </p>
                          </div>
                          <div class="form-group col-lg-6 mb-4">
                            <label class="col-md-12 p-0">
                              เบอร์โทรศัพท์มือถือ
                            </label>
                            <div class="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="phoneF"
                                onChange={handleChange}
                                value={values.phoneF}
                                class="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.phoneF && touched.phoneF && errors.phoneF}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div class="form-group col-lg-3 mb-4">
                            <label class="col-md-12 p-0">บิดามีอาชีพ</label>
                            <div class="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="occupationF"
                                onChange={handleChange}
                                value={values.occupationF}
                                class="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.occupationF &&
                                touched.occupationF &&
                                errors.occupationF}
                            </p>
                          </div>
                          <div class="form-group col-lg-3 mb-4">
                            <label class="col-md-12 p-0">ตำเเหน่งหน้าที่</label>
                            <div class="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="positionF"
                                onChange={handleChange}
                                value={values.positionF}
                                class="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.positionF &&
                                touched.positionF &&
                                errors.positionF}
                            </p>
                          </div>
                          <div class="form-group col-lg-3 mb-4">
                            <label class="col-md-12 p-0">สถานที่ทำงาน</label>
                            <div class="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="workplaceF"
                                onChange={handleChange}
                                value={values.workplaceF}
                                class="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.workplaceF &&
                                touched.workplaceF &&
                                errors.workplaceF}
                            </p>
                          </div>
                          <div class="form-group col-lg-3 mb-4">
                            <label class="col-md-12 p-0">
                              เบอร์โทรศัพท์ที่ทำงาน
                            </label>
                            <div class="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="WPhoneF"
                                onChange={handleChange}
                                value={values.WPhoneF}
                                class="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.WPhoneF &&
                                touched.WPhoneF &&
                                errors.WPhoneF}
                            </p>
                          </div>
                        </div>
                        <h3>ประวัติของมารดา</h3>
                        <div className="form-group row align-items-center">
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-sm-12">คำนำหน้า</label>

                            <div className="col-sm-12 border-bottom">
                              <select
                                onChange={(e) =>
                                  setFieldValue("titleM", e.target.value)
                                }
                                as="select"
                                name="titleM"
                                className="form-select shadow-none p-0 border-0 form-control-line"
                              >
                                <option>เลือก</option>
                                {titleM.map((item, i) => {
                                  return (
                                    <option key={i} value={item.id}>
                                      {item.title}
                                    </option>
                                  );
                                })}
                              </select>
                              <p className="text-danger">
                                {errors.titleM &&
                                  touched.titleM &&
                                  errors.titleM}
                              </p>
                            </div>
                          </div>
                          <div class="form-group col-lg-3 mb-4">
                            <label class="col-md-12 p-0">ชื่อ</label>
                            <div class="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="nameM"
                                onChange={handleChange}
                                value={values.nameM}
                                class="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.nameM && touched.nameM && errors.nameM}
                            </p>
                          </div>
                          <div class="form-group col-lg-3 mb-4">
                            <label class="col-md-12 p-0">นามสกุล</label>
                            <div class="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="lastNameM"
                                onChange={handleChange}
                                value={values.lastNameM}
                                class="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.lastNameM &&
                                touched.lastNameM &&
                                errors.lastNameM}
                            </p>
                          </div>
                          <div class="form-group col-lg-3 mb-4">
                            <label class="col-md-12 p-0">วันเดือนปีเกิด</label>
                            <div class="col-md-12 border-bottom p-0">
                              <input
                                type="date"
                                name="birthDateM"
                                onChange={handleChange}
                                value={values.birthDateM}
                                class="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.birthDateM &&
                                touched.birthDateM &&
                                errors.birthDateM}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div class="form-group col-lg-3 mb-4">
                            <label class="col-md-12 p-0">
                              สถานที่ทะเบียนเกิด
                            </label>
                            <div class="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="placebirthM"
                                onChange={handleChange}
                                value={values.placebirthM}
                                class="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.placebirthM &&
                                touched.placebirthM &&
                                errors.placebirthM}
                            </p>
                          </div>
                          <div class="form-group col-lg-3 mb-4">
                            <label class="col-md-12 p-0">เชื้อชาติ</label>
                            <div class="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="raceM"
                                onChange={handleChange}
                                value={values.raceM}
                                class="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.raceM && touched.raceM && errors.raceM}
                            </p>
                          </div>
                          <div class="form-group col-lg-3 mb-4">
                            <label class="col-md-12 p-0">ศาสนา</label>
                            <div class="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="religionM"
                                onChange={handleChange}
                                value={values.religionM}
                                class="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.religionM &&
                                touched.religionM &&
                                errors.religionM}
                            </p>
                          </div>
                          <div class="form-group col-lg-3 mb-4">
                            <label class="col-md-12 p-0">สัญชาติ</label>
                            <div class="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="nationalityM"
                                onChange={handleChange}
                                value={values.nationalityM}
                                class="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.nationalityM &&
                                touched.nationalityM &&
                                errors.nationalityM}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div class="form-group col-lg-6 mb-4">
                            <label class="col-md-12 p-0">ที่อยุ่ปัจจุบัน</label>
                            <div class="col-md-12 border-bottom p-0">
                              <textarea
                                type="text"
                                name="addressM"
                                rows={5}
                                onChange={handleChange}
                                value={values.addressM}
                                class="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.addressM &&
                                touched.addressM &&
                                errors.addressM}
                            </p>
                          </div>
                          <div class="form-group col-lg-6 mb-4">
                            <label class="col-md-12 p-0">
                              เบอร์โทรศัพท์มือถือ
                            </label>
                            <div class="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="phoneM"
                                onChange={handleChange}
                                value={values.phoneM}
                                class="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.phoneM && touched.phoneM && errors.phoneM}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div class="form-group col-lg-3 mb-4">
                            <label class="col-md-12 p-0">บิดามีอาชีพ</label>
                            <div class="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="occupationM"
                                onChange={handleChange}
                                value={values.occupationM}
                                class="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.occupationM &&
                                touched.occupationM &&
                                errors.occupationM}
                            </p>
                          </div>
                          <div class="form-group col-lg-3 mb-4">
                            <label class="col-md-12 p-0">ตำเเหน่งหน้าที่</label>
                            <div class="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="positionM"
                                onChange={handleChange}
                                value={values.positionM}
                                class="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.positionM &&
                                touched.positionM &&
                                errors.positionM}
                            </p>
                          </div>
                          <div class="form-group col-lg-3 mb-4">
                            <label class="col-md-12 p-0">สถานที่ทำงาน</label>
                            <div class="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="workplaceM"
                                onChange={handleChange}
                                value={values.workplaceM}
                                class="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.workplaceM &&
                                touched.workplaceM &&
                                errors.workplaceM}
                            </p>
                          </div>
                          <div class="form-group col-lg-3 mb-4">
                            <label class="col-md-12 p-0">
                              เบอร์โทรศัพท์ที่ทำงาน
                            </label>
                            <div class="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="WPhoneM"
                                onChange={handleChange}
                                value={values.WPhoneM}
                                class="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.WPhoneM &&
                                touched.WPhoneM &&
                                errors.WPhoneM}
                            </p>
                          </div>
                        </div>

                        <div class="form-group mb-4">
                          <div class="col-sm-12">
                            <button type="submit" class="btn btn-success">
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

export default addFaAndMo;
