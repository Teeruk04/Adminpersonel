import React, { useEffect, useState } from "react";
import { router } from "../../routes/Routes";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import { Formik } from "formik";
import Swal from "sweetalert2";

const updateChild = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [title, setTitle] = useState();

  useEffect(() => {
    getChildById();
    getTitle();
  }, []);

  const submitUpdate = async (value) => {
    try {
      let response = await agent.Child.update(value, id);
      router.navigate(-1)
    } catch (error) {
      console.log(error);
    }
  };

  const SwalUpdate = async (value) => {
    Swal.fire({
      title: "คุณเเน่ใจไหม ?",
      text: "คุณต้องการเเก้ไขข้อมูลของบุตรใช่หรือไม่ !",
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

  const getChildById = async () => {
    var response = await agent.Child.getChildById(id);
    setData(response);
  };

  const getTitle = async () => {
    var response = await agent.Title.getTitles();
    setTitle(response);
  };

  if (!data) return <>55555</>;
  if (!title) return <>55555</>;
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
              <h4 className="page-title">เเก้ไขข้อมูลประวัติของบุตร</h4>
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
          <div className="container-fluid">
            <Formik
              enableReinitialize={true}
              initialValues={{
                titleId: data.id_title,
                name: data.child_name,
                lastname: data.child_lastname,
                birthdate: data.child_birthdate,
                race: data.child_race,
                nationality: data.child_nationlyty,
                religion: data.child_religion,
                address: data.chaild_address,
                occupation: data.child_occupation,
                position: data.child_position,
                workplace: data.child_workplace,
                WPphone: data.child_phone,
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
                              />{" "}
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
                                name="workplace"
                                placeholder="ที่ตั้งของสถานที่ทำงาน"
                                onChange={handleChange}
                                value={values.workplace}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
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
                        </div>

                        <div className="form-group mb-4">
                          <div className="col-sm-12">
                            <button type="submit" className="btn btn-success">
                              เเก้ไขข้อมูล
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

export default updateChild;
