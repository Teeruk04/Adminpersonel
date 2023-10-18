import React, { useEffect, useState } from "react";
import { router } from "../../routes/Routes";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import Swal from "sweetalert2";
import { Formik } from "formik";

const updateFaAndMo = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [titleM, setTitleM] = useState();
  useEffect(() => {
    getFaANdMoById();
    getStatus();
  }, []);

  const submitUpdate = async (value) => {
    console.log(value);
    try {
      let response = await agent.FatherAndMother.update(value, id);
      console.log(response);
      router.navigate(-1)
    } catch (error) {
      console.log(error);
    }
  };

  const SwalUpdate = async (value) => {
    Swal.fire({
      title: "คุณเเน่ใจไหม ?",
      text: "คุณต้องการเเก้ไขข้อมูลบิดาเเละมารดาใช่หรือไม่ !",
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

  const getFaANdMoById = async () => {
    var response = await agent.FatherAndMother.getById(id);
    console.log(response);
    setData(response);
  };

  const getStatus = async () => {
    var response = await agent.TitleM.getTitleMs();
    console.log(response);
    setTitleM(response);
  };

  if (!data) return <>55555</>;
  if (!titleM) return <>55555</>;
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
              <h4 className="page-title">เเก้ไขประวัติของบิดาเเละมารดา</h4>
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
              nameF: data.fa_name,
              lastNameF: data.fa_lastname,
              birthDateF: data.fa_birthdate,
              placebirthF: data.fa_placebirth,
              raceF: data.fa_race,
              religionF: data.fa_religion,
              nationalityF: data.fa_nationality,
              addressF: data.fa_address,
              phoneF: data.fa_phone,
              occupationF: data.fa_occupation,
              positionF: data.fa_position,
              workplaceF: data.fa_workplace,
              WPhoneF: data.fa_WPphone,
              titleM: data.mO_title,
              nameM: data.mo_name,
              lastNameM: data.mo_lastname,
              birthDateM: data.mo_birthdate,
              placebirthM: data.mo_placebirth,
              raceM: data.mo_race,
              religionM: data.mo_religion,
              nationalityM: data.mo_nationality,
              addressM: data.mo_address,
              phoneM: data.mo_phone,
              occupationM: data.mo_occupation,
              positionM: data.mo_position,
              workplaceM: data.mo_workplace,
              WPhoneM: data.mo_WPphone,
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
                className="form-horizontal form-material "
                onSubmit={handleSubmit}
              >
                <div className="container-fluid">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-body">
                        <h3>ประวัติของบิดา</h3>
                        <div className="form-group row align-items-center">
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">ชื่อ</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="nameF"
                                onChange={handleChange}
                                value={values.nameF}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">นามสกุล</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="lastNameF"
                                onChange={handleChange}
                                value={values.lastNameF}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">
                              วันเดือนปีเกิด
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="date"
                                name="birthDateF"
                                onChange={handleChange}
                                value={values.birthDateF}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">
                              สถานที่ทะเบียนเกิด
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="placebirthF"
                                onChange={handleChange}
                                value={values.placebirthF}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">เชื้อชาติ</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="raceF"
                                onChange={handleChange}
                                value={values.raceF}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">ศาสนา</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="religionF"
                                onChange={handleChange}
                                value={values.religionF}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">สัญชาติ</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="nationalityF"
                                onChange={handleChange}
                                value={values.nationalityF}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-lg-6 mb-4">
                            <label className="col-md-12 p-0">
                              ที่อยุ่ปัจจุบัน
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <textarea
                                type="text"
                                name="addressF"
                                rows={5}
                                onChange={handleChange}
                                value={values.addressF}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                          <div className="form-group col-lg-6 mb-4">
                            <label className="col-md-12 p-0">
                              เบอร์โทรศัพท์มือถือ
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="phoneF"
                                onChange={handleChange}
                                value={values.phoneF}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">บิดามีอาชีพ</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="occupationF"
                                onChange={handleChange}
                                value={values.occupationF}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">
                              ตำเเหน่งหน้าที่
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="positionF"
                                onChange={handleChange}
                                value={values.positionF}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">
                              สถานที่ทำงาน
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="workplaceF"
                                onChange={handleChange}
                                value={values.workplaceF}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">
                              เบอร์โทรศัพท์ที่ทำงาน
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="WPhoneF"
                                onChange={handleChange}
                                value={values.WPhoneF}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
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
                            </div>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">ชื่อ</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="nameM"
                                onChange={handleChange}
                                value={values.nameM}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">นามสกุล</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="lastNameM"
                                onChange={handleChange}
                                value={values.lastNameM}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">
                              วันเดือนปีเกิด
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="date"
                                name="birthDateM"
                                onChange={handleChange}
                                value={values.birthDateM}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">
                              สถานที่ทะเบียนเกิด
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="placebirthM"
                                onChange={handleChange}
                                value={values.placebirthM}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">เชื้อชาติ</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="raceM"
                                onChange={handleChange}
                                value={values.raceM}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">ศาสนา</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="religionM"
                                onChange={handleChange}
                                value={values.religionM}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">สัญชาติ</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="nationalityM"
                                onChange={handleChange}
                                value={values.nationalityM}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-lg-6 mb-4">
                            <label className="col-md-12 p-0">
                              ที่อยุ่ปัจจุบัน
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <textarea
                                type="text"
                                name="addressM"
                                rows={5}
                                onChange={handleChange}
                                value={values.addressM}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                          <div className="form-group col-lg-6 mb-4">
                            <label className="col-md-12 p-0">
                              เบอร์โทรศัพท์มือถือ
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="phoneM"
                                onChange={handleChange}
                                value={values.phoneM}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">บิดามีอาชีพ</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="occupationM"
                                onChange={handleChange}
                                value={values.occupationM}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">
                              ตำเเหน่งหน้าที่
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="positionM"
                                onChange={handleChange}
                                value={values.positionM}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">
                              สถานที่ทำงาน
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="workplaceM"
                                onChange={handleChange}
                                value={values.workplaceM}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">
                              เบอร์โทรศัพท์ที่ทำงาน
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="WPhoneM"
                                onChange={handleChange}
                                value={values.WPhoneM}
                                className="form-control p-0 border-0"
                              />{" "}
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

export default updateFaAndMo;
