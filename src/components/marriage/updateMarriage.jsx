import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import agent from "../../app/api/agent";
import { Formik } from "formik";
import Swal from "sweetalert2";
import { router } from "../../routes/Routes";

const updateMarriage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState();
  const [data, setData] = useState();
  const [statusPC, setStatusPC] = useState();
  useEffect(() => {
    getMarriage();
    getTitle();
    getStatusPC();
  }, []);

  const submitUpdate = async (value) => {
    console.log(value);
    try {
      let response = await agent.Marriage.update(value, id);
      console.log(response);
      router.navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const SwalAddMarriage = async (value) => {
    Swal.fire({
      title: "คุณเเน่ใจไหม ?",
      text: "คุณต้องการเเก้ไขข้อมูลประวัติการสมรสใช่หรือไม่ !",
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

  const getMarriage = async () => {
    var response = await agent.Marriage.getMarriageById(id);
    console.log(response);
    setData(response);
  };
  const getTitle = async () => {
    var response = await agent.Title.getTitles();
    console.log(response);
    setTitle(response);
  };

  const getStatusPC = async () => {
    var response = await agent.StatusPC.getStatusPC();
    console.log(response);
    setStatusPC(response);
  };
  if (!data) return <>5555555</>;
  if (!title) return <>5555555</>;
  if (!statusPC) return <>5555555</>;
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
              <h4 className="page-title">เเก้ไขประวัติการสมรส</h4>
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
              titleId: data.id_title,
              name: data.marria_name,
              lastname: data.marria_lastname,
              birthdate: data.marria_birdate,
              race: data.marria_race,
              religion: data.marria_religion,
              nationality: data.marria_nationality,
              position: data.marria_position,
              workplace: data.marria_position,
              WPphone: data.marria_WPphone,
              occupation: data.marria_occupation,
              address: data.marria_address,
              phone: data.marria_phone,
              divorce: data.marria_phone,
              lastaddress: data.marria_lastaddress,
              statusPCId: data.id_statusPC,
              weddingday: data.marriia_weddingday,
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
                              className="form-select"
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
                              />
                            </div>
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
                              />
                            </div>
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
                              />
                            </div>
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
                              />
                            </div>
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
                              />
                            </div>
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
                              />
                            </div>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">สถานะ</label>
                            <select
                              className="form-select"
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
                              />
                            </div>
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

export default updateMarriage;
