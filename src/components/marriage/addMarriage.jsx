import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import agent from "../../app/api/agent";
import { Formik } from "formik";
import Swal from "sweetalert2";
import { router } from "../../routes/Routes";

const addMarriage = () => {
  const { id } = useParams();
  var navigate = useNavigate();

  const [title, setTitle] = useState();
  const [statusPC, setStatusPC] = useState();

  useEffect(() => {
    getTitleList();
    getStatusPCList();
  }, []);

  const getTitleList = async () => {
    var response = await agent.Title.getTitles();
    console.log(response);
    setTitle(response);
  };

  const getStatusPCList = async () => {
    var response = await agent.StatusPC.getStatusPC();
    console.log(response);
    setStatusPC(response);
  };

  const submitAddMarriage = async (value) => {
    console.log(value);
    try {
      var response = await agent.Marriage.addMarriage(value, id);
      console.log(response);
      router.navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const SwalAddMarriage = async (value) => {
    Swal.fire({
      title: "คุณเเน่ใจไหม ?",
      text: "คุณต้องการเพิ่มข้อมูลประวัติการสมรสใช่หรือไม่ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
    }).then((result) => {
      if (result.isConfirmed) {
        submitAddMarriage(value);
      }
    });
  };

  if (!title) return <>asdasdasdasdasdasd</>;
  if (!statusPC) return <>asdasdasdasdasdasd</>;

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
              <h4 className="page-title">เพิ่มประวัติการสมรส</h4>
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
              titleId: "",
              name: "",
              lastname: "",
              birthdate: "",
              race: "",
              religion: "",
              nationality: "",
              position: "",
              workplace: "",
              WPphone: "",
              occupation: "",
              address: "",
              phone: "",
              divorce: "",
              lastaddress: "",
              statusPCId: "",
              weddingday: "",
            }}
            validate={(value) => {
              const error = {};
              if (!value.titleId) {
                error.titleId = "กรุณาเลือกคำนำหน้าชื่อ";
              }
              if (!value.name) {
                error.name = "กรุณากรอกข้อมูล";
              }
              if (!value.lastname) {
                error.lastname = "กรุณากรอกข้อมูล";
              }
              if (!value.birthdate) {
                error.birthdate = "กรุณากรอกข้อมูล";
              }
              if (!value.race) {
                error.race = "กรุณากรอกข้อมูล";
              }
              if (!value.religion) {
                error.religion = "กรุณากรอกข้อมูล";
              }
              if (!value.nationality) {
                error.nationality = "กรุณากรอกข้อมูล";
              }
              if (!value.position) {
                error.position = "กรุณากรอกข้อมูล";
              }
              if (!value.workplace) {
                error.workplace = "กรุณากรอกข้อมูล";
              }
              if (!value.WPphone) {
                error.WPphone = "กรุณากรอกข้อมูล";
              }
              if (!value.address) {
                error.address =
                  'กรุณากรอกข้อมูล ถ้าไม่ทราบข้อมูลให้ใส่เครื่องหมาย "-" ';
              }
              if (!value.phone) {
                error.phone = "กรุณากรอกข้อมูล";
              }
              if (!value.divorce) {
                error.divorce = "กรุณากรอกข้อมูล";
              }
              if (!value.lastaddress) {
                error.lastaddress =
                  'กรุณากรอกข้อมูล ถ้าไม่ทราบข้อมูลให้ใส่เครื่องหมาย "-" ';
              }
              if (!value.statusPCId) {
                error.statusPCId = "กรุณากรอกข้อมูล";
              }
              if (!value.occupation) {
                error.occupation = "กรุณากรอกข้อมูล";
              }
              if (!value.weddingday) {
                error.weddingday = "กรุณากรอกข้อมูล";
              }
              return error;
            }}
            onSubmit={SwalAddMarriage}
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
                  <div className="">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">
                              คำนำหน้าชื่อ
                            </label>
                            <select
                              onChange={(e) =>
                                setFieldValue("titleId", e.target.value)
                              }
                              as="select"
                              class="form-select"
                              aria-label="Default select example"
                            >
                              <option selected>กรุณาเลือก</option>
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
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">
                              ชื่อของคู่สมรส
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="name"
                                placeholder="ชื่อจริง"
                                onChange={handleChange}
                                value={values.name}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.name && touched.name && errors.name}
                            </p>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">
                              นามสกุลของคู่สมรส
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="lastname"
                                placeholder="นามสกุลจริง"
                                onChange={handleChange}
                                value={values.lastname}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.lastname &&
                                touched.lastname &&
                                errors.lastname}
                            </p>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">
                              วันเกิดของคู่สมรส
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="date"
                                name="birthdate"
                                placeholder="ตำเเหน่ง หน้าที่"
                                onChange={handleChange}
                                value={values.birthdate}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.birthdate &&
                                touched.birthdate &&
                                errors.birthdate}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-lg-4 mb-4">
                            <label className="col-md-12 p-0">เชื้อชาติ</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="race"
                                placeholder="เชื้อชาติ"
                                className="form-control p-0 border-0"
                                onChange={handleChange}
                                value={values.race}
                              />
                            </div>
                            <p className="text-danger">
                              {errors.race && touched.race && errors.race}
                            </p>
                          </div>
                          <div className="form-group col-lg-4 mb-4">
                            <label className="col-md-12 p-0">ศาสนา</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="religion"
                                placeholder="ศาสนา"
                                className="form-control p-0 border-0"
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
                          <div className="form-group col-lg-4 mb-4">
                            <label className="col-md-12 p-0">สัญชาติ</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="nationality"
                                placeholder="สัญชาติ"
                                className="form-control p-0 border-0"
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
                        </div>
                        <div className="row">
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">อาชีพ</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="occupation"
                                placeholder="ประกอบอาชีพ"
                                onChange={handleChange}
                                value={values.occupation}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.occupation &&
                                touched.occupation &&
                                errors.occupation}
                            </p>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
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
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">
                              สถานที่ทำงาน
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="workplace"
                                placeholder="ที่ตั้งของสถานที่ทำงาน"
                                onChange={handleChange}
                                value={values.workplace}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.workplace &&
                                touched.workplace &&
                                errors.workplace}
                            </p>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">
                              เบอร์โทรศัพท์ของที่ทำงาน
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="WPphone"
                                placeholder="เบอร์โทรศัพท์ของที่ทำงาน"
                                onChange={handleChange}
                                value={values.WPphone}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.WPphone &&
                                touched.WPphone &&
                                errors.WPphone}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">
                              วันที่ทำการสมรส
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="date"
                                name="weddingday"
                                placeholder="ตำเเหน่ง หน้าที่"
                                onChange={handleChange}
                                value={values.weddingday}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.weddingday &&
                                touched.weddingday &&
                                errors.weddingday}
                            </p>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">
                              เหตุผลที่เเยกย้าย
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="divorce"
                                placeholder="เหตุผลที่เเยกย้าย"
                                onChange={handleChange}
                                value={values.divorce}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.divorce &&
                                touched.divorce &&
                                errors.divorce}
                            </p>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">สถานะ</label>
                            <select
                              class="form-select"
                              aria-label="Default select example"
                              onChange={(e) =>
                                setFieldValue("statusPCId", e.target.value)
                              }
                            >
                              <option selected>กรุณาเลือก</option>
                              {statusPC.map((item, i) => {
                                return (
                                  <option key={i} value={item.id}>
                                    {item.statusPC_name}
                                  </option>
                                );
                              })}
                            </select>
                            <p className="text-danger">
                              {errors.statusPCId &&
                                touched.statusPCId &&
                                errors.statusPCId}
                            </p>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">
                              เบอร์โทรศัพท์ของคู่สมรส
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="phone"
                                placeholder="เบอร์โทรศัพท์ของคู่สมรส"
                                onChange={handleChange}
                                value={values.phone}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.phone && touched.phone && errors.phone}
                            </p>
                          </div>
                        </div>
                        <div className="form-group mb-4">
                          <label className="col-md-12 p-0">
                            ที่อยู่ของคู่สมรส
                          </label>
                          <div className="col-md-12 border-bottom p-0">
                            <textarea
                              name="address"
                              onChange={handleChange}
                              value={values.address}
                              rows="5"
                              className="form-control p-0 border-0"
                            ></textarea>
                          </div>
                          <p className="text-danger">
                            {errors.address &&
                              touched.address &&
                              errors.address}
                          </p>
                        </div>
                        <div className="form-group mb-4">
                          <label className="col-md-12 p-0">
                            ที่อยู่ด้วยกันที่สุดท้าย
                          </label>
                          <div className="col-md-12 border-bottom p-0">
                            <textarea
                              name="lastaddress"
                              onChange={handleChange}
                              value={values.lastaddress}
                              rows="5"
                              className="form-control p-0 border-0"
                            ></textarea>
                          </div>
                          <p className="text-danger">
                            {errors.lastaddress &&
                              touched.lastaddress &&
                              errors.lastaddress}
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

export default addMarriage;
