import React, { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { router } from "../../routes/Routes";
import { LeaveType } from "../../constants/LeaveType";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import Swal from "sweetalert2";
import Datepicker from "react-tailwindcss-datepicker";
const addLeave = () => {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [isValidDateRange, setIsValidDateRange] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    var response = await agent.User.getUserId(id);
    console.log(response);
    setUser(response);
  };

  const submitAddLeave = async (value) => {
    try {
      let response = await agent.Leave.createLeave(value);
      router.navigate(-1);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const SwalAddLeave = async (vales) => {
    Swal.fire({
      title: "คุณเเน่ใจไหม ?",
      text: "คุณต้องการเพิ่มข้อมูลประวัติการลาใช่หรือไม่ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
    }).then((result) => {
      if (result.isConfirmed) {
        submitAddLeave(vales);
      }
    });
  };
  if (!user) return <>5555</>;
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
              <h4 className="page-title">เพิ่มประวัติการลา</h4>
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
              userId: user.id,
              leaveType: "",
              startdate: "",
              enddate: "",
              note: "",
              dateRang: {
                startDate: new Date(),
                endDate: new Date(),
              },
            }}
            validate={(vales) => {
              const error = {};
              if (!vales.leaveType) {
                error.leaveType = "กรุณากรอกข้อมูล";
              }
              if (!vales.startdate) {
                error.startdate = "กรุณากรอกข้อมูล";
              }
              if (vales.startdate > vales.enddate) {
                error.startdate = "วันเเรกที่ลามากกว่าวันสุดท้ายที่ลา";
              }
              if (!vales.enddate) {
                error.enddate = "กรุณากรอกข้อมูล";
              }
              if (!vales.note) {
                error.note =
                  "กรุณากรอกข้อมูล ถ้าไม่ทราบข้อมูลให้ใส่เครื่องหมาย ( - )";
              }
              return error;
            }}
            onSubmit={SwalAddLeave}
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
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="form-group col-lg-4 mb-4 mb-4">
                            <label className="">ประเภทการลา</label>

                            <div className=" border-bottom">
                              <select
                                onChange={(e) =>
                                  setFieldValue("leaveType", e.target.value)
                                }
                                className="form-select "
                              >
                                <option className="text-center">
                                  กรุณาเลือกข้อมูล
                                </option>

                                {Object.entries(LeaveType).map(
                                  ([key, text]) => (
                                    <option key={key} value={key}>
                                      {text}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                            <p className="text-danger">
                              {errors.leaveType &&
                                touched.leaveType &&
                                errors.leaveType}
                            </p>
                          </div>
                        </div>
                        {/* <Datepicker
                          value={values.dateRang}
                          onChange={handleChange}
                        /> */}
                        <div className="row">
                          <div className="form-group col-lg-4 mb-4">
                            <label className="col-md-12 p-0">
                              วันที่เเรกที่ลา
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
                              วันสุดท้ายที่ลา
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
                        </div>
                        {!isValidDateRange && (
                          <p>Start date must be before end date.</p>
                        )}
                        <div className="form-group  mb-4">
                          <label className="col-md-12 p-0">หมายเหตุ</label>
                          <div className="col-md-12 border-bottom p-0">
                            <textarea
                              name="note"
                              placeholder="หมายเหตุหรือสาเหตุของการลา"
                              onChange={handleChange}
                              value={values.note}
                              rows="5"
                              className="form-control p-0 border-0"
                            ></textarea>
                          </div>
                          <p className="text-danger">
                            {errors.note && touched.note && errors.note}
                          </p>
                          <br></br>
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
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default addLeave;
