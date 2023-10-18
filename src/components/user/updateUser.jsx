import React, { useEffect, useState } from "react";
import { router } from "../../routes/Routes";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import Swal from "sweetalert2";
import { Formik } from "formik";
import { config } from "../../constants/config";

const updateUser = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [title, setTitle] = useState();
  const [sex, setSex] = useState();
  const [status, setStatus] = useState();
  const [imageInput, setImageInput] = useState();

  useEffect(() => {
    getUserById();
    getTitles();
    getSex();
    getStatus();
  }, []);

  const submitUpdate = async (value) => {
    console.log(value);
    try {
      let response = await agent.User.update(value, imageInput, id);
      console.log(response);
      router.navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const SwalUpdate = async (value) => {
    Swal.fire({
      title: "คุณเเน่ใจไหม ?",
      text: "คุณต้องการเเก้ไขข้อมูลบุคคลากรใช่หรือไม่ !",
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

  const getUserById = async () => {
    var response = await agent.User.getUserId(id);
    console.log(response);
    setData(response);
  };
  const getTitles = async () => {
    var response = await agent.Title.getTitles();
    console.log(response);
    setTitle(response);
  };
  const getSex = async () => {
    var response = await agent.Sex.getSexs();
    console.log(response);
    setSex(response);
  };

  const getStatus = async () => {
    var response = await agent.StatusU.getStatusU();
    console.log(response);
    setStatus(response);
  };

  if (!data) return <>5555</>;
  if (!status) return <>5555</>;
  if (!sex) return <>5555</>;
  if (!title)
    return (
      <>
        55ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd55
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
              <h4 className="page-title">เเก้ไขข้อมูลบุคลากร</h4>
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
              name: data.user_name,
              lastname: data.user_lastname,
              cardnumber: data.user_cardnumber,
              birthdate: data.user_birthdate,
              placeofbirth: data.user_placeofbirth,
              race: data.user_race,
              nationality: data.user_nationality,
              religion: data.user_religion,
              titleId: data.id_title,
              statusUId: data.id_statusU,
              sexId: data.id_sex,
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
                                {status.map((item, i) => {
                                  return (
                                    <option key={i} value={item.id}>
                                      {item.statusU_name}
                                    </option>
                                  );
                                })}
                              </select>
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
                              />
                            </div>
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
                          </div>
                        </div>

                        <div className="form-group mb-4">
                          <div className="col-sm-12">
                            <button type="submit" className="btn btn-success">
                              ยืนยัน
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

export default updateUser;
