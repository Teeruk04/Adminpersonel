import React, { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import { router } from "../../routes/Routes";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import Swal from "sweetalert2";

const addManagePos = () => {
  const { id } = useParams();
  const [status, setStatus] = useState();

  useEffect(() => {
    getStatus();
  }, []);

  const getStatus = async () => {
    var response = await agent.StatusS.getStatusS();
    console.log(response);
    setStatus(response);
  };

  const submitAddManagePos = async (value) => {
    console.log(value);
    try {
      let response = await agent.ManagePos.createManagePos(value, id);
      router.navigate(-1);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const SwalAddManagePos = async (vales) => {
    Swal.fire({
      title: "คุณเเน่ใจไหม ?",
      text: "คุณต้องการเพิ่มข้อมูลประวัติตำเเหน่งบริหารใช่หรือไม่ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
    }).then((result) => {
      if (result.isConfirmed) {
        submitAddManagePos(vales);
      }
    });
  };
  if (!status) return <>555</>;
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
              <h4 className="page-title">เพิ่มประวัติตำเเหน่งบริหาร</h4>
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
              initialValues={{
                position: "",
                agency: "",
                detail: "",
                startdate: "",
                enddate: "",
                refer: "",
                status: "",
              }}
              validate={(value) => {
                const error = {};
                if (!value.position) {
                  error.position = "กรุณากรอกข้อมูล";
                }
                if (!value.agency) {
                  error.agency = "กรุณากรอกข้อมูล";
                }
                if (!value.detail) {
                  error.detail = "กรุณากรอกข้อมูล";
                }
                if (!value.startdate) {
                  error.startdate = "กรุณากรอกข้อมูล";
                }
                if (!value.enddate) {
                  error.enddate = "กรุณากรอกข้อมูล";
                }
                if (value.startdate > value.enddate) {
                  error.startdate =
                    "วันที่เริ่มบริหารมากกว่าวันสุดท้ายที่บริหาร";
                }
                if (!value.refer) {
                  error.refer = "กรุณากรอกข้อมูล";
                }
                if (!value.status) {
                  error.status = "กรุณากรอกข้อมูล";
                }
                return error;
              }}
              onSubmit={SwalAddManagePos}
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
                          <div className="form-group col-lg-6 mb-4">
                            <label className="col-md-12 p-0">ตำเเหน่ง</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="position"
                                placeholder="ตำเเหน่งที่บริหาร"
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
                          <div className="form-group col-lg-6 mb-4">
                            <label className="col-md-12 p-0">หน่วยงาน</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="agency"
                                placeholder="หน่วยงานที่บริหาร"
                                onChange={handleChange}
                                value={values.agency}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                            <p className="text-danger">
                              {errors.agency && touched.agency && errors.agency}
                            </p>
                          </div>
                        </div>
                        <div className="form-group  mb-4">
                          <label className="col-md-12 p-0">รายละเอียด</label>
                          <div className="col-md-12 border-bottom p-0">
                            <textarea
                              name="detail"
                              placeholder="รายละเอียดตำเเหน่งที่บริหาร"
                              onChange={handleChange}
                              value={values.detail}
                              rows="5"
                              className="form-control p-0 border-0"
                            ></textarea>
                          </div>
                          <p className="text-danger">
                            {errors.detail && touched.detail && errors.detail}
                          </p>
                          <br></br>
                          <div className="row">
                            <div className="form-group col-lg-4 mb-4">
                              <label className="col-md-12 p-0">
                                วันที่เริ่มบริหาร
                              </label>
                              <div className="col-md-12 border-bottom p-0">
                                <input
                                  type="date"
                                  name="startdate"
                                  placeholder="ตำเเหน่งที่บริหาร"
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
                            <div className="form-group col-lg-4 mb-4">
                              <label className="col-md-12 p-0">
                                วันสุดท้ายที่บริหาร
                              </label>
                              <div className="col-md-12 border-bottom p-0">
                                <input
                                  type="date"
                                  name="enddate"
                                  placeholder="หน่วยงานที่บริหาร"
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
                            <div className="form-group col-lg-4 mb-4 mb-4">
                              <label className="col-sm-12">สถานะ</label>

                              <div className="col-sm-12 border-bottom">
                                <select
                                  onChange={(e) =>
                                    setFieldValue("status", e.target.value)
                                  }
                                  className="form-select "
                                >
                                  <option>กรุณาเลือกข้อมูล</option>
                                  {status.map((item, i) => {
                                    return (
                                      <option key={i} value={item.id}>
                                        {item.name}
                                      </option>
                                    );
                                  })}
                                  );
                                </select>
                              </div>
                              <p className="text-danger">
                                {errors.status &&
                                  touched.status &&
                                  errors.status}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="form-group  mb-4">
                          <label className="col-md-12 p-0">อ้างอิง</label>
                          <div className="col-md-12 border-bottom p-0">
                            <textarea
                              name="refer"
                              onChange={handleChange}
                              value={values.refer}
                              rows="5"
                              className="form-control p-0 border-0"
                            ></textarea>
                          </div>
                          <p className="text-danger">
                            {errors.refer && touched.refer && errors.refer}
                          </p>
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
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default addManagePos;
