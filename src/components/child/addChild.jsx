import React, { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Formik } from "formik";
import { router } from "../../routes/Routes";

const addChild = () => {
  const { id } = useParams();
  const [title, setTitle] = useState();

  useEffect(() => {
    getTitleList();
  }, []);

  const getTitleList = async () => {
    var response = await agent.Title.getTitles();
    console.log(response);
    setTitle(response);
  };

  const submitAddChild = async (value) => {
    console.log(value);
    try {
      var response = await agent.Child.addChild(value, id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const SwalAddChild = async (value) => {
    Swal.fire({
      title: "คุณเเน่ใจไหม ?",
      text: "คุณต้องการเพิ่มข้อมูลประวัติของบุตรใช่หรือไม่ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
    }).then((result) => {
      if (result.isConfirmed) {
        submitAddChild(value);
        router.navigate(-1);
      }
    });
  };

  if (!title) return <>55</>;

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
              <h4 className="page-title">เพิ่มข้อมูลประวัติของบุตร</h4>
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
          {" "}
          <div className="container-fluid">
            <Formik
              initialValues={{
                titleId: "",
                name: "",
                lastname: "",
                birthdate: "",
                race: "",
                nationality: "",
                religion: "",
                address: "",
                occupation: "",
                position: "",
                workplace: "",
                WPphone: "",
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
                if (!value.nationality) {
                  error.nationality = "กรุณากรอกข้อมูล";
                }
                if (!value.religion) {
                  error.religion = "กรุณากรอกข้อมูล";
                }
                if (!value.address) {
                  error.address =
                    'กรุณากรอกข้อมูล ถ้าไม่ทราบข้อมูลให้ใส่เครื่องหมาย "-" ';
                }
                if (!value.occupation) {
                  error.occupation = "กรุณากรอกข้อมูล";
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
                return error;
              }}
              onSubmit={SwalAddChild}
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
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="form-group col-lg-3 mb-4 mb-4">
                            <label className="col-sm-12 ">คำนำหน้าชื่อ</label>
                            <div className="col-sm-12 border-bottom">
                              <select
                                onChange={(e) =>
                                  setFieldValue("titleId", e.target.value)
                                }
                                className="form-select"
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
                            </div>
                            <p className="text-danger">
                              {errors.titleId &&
                                touched.titleId &&
                                errors.titleId}
                            </p>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">ชื่อของบุตร</label>
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
                              นามสกุลของบุตร
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
                              วันเกิดของงบุตร
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
                              เบอร์โทรสัพท์ของบุตร
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="WPphone"
                                placeholder="เบอร์โทรศัพท์ของบุตร"
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

                        <div className="form-group mb-4">
                          <label className="col-md-12 p-0">
                            ที่อยู่ของบุตร
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
    </div>
  );
};

export default addChild;
