import React, { useState, useEffect } from "react";
import { router } from "../../routes/Routes";
import { LeaveType } from "../../constants/LeaveType";
import agent from "../../app/api/agent";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { Formik } from "formik";

const updateLeave = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    getLeaveById();
  }, []);

  const getLeaveById = async () => {
    var response = await agent.Leave.getLeaveById(id);
    console.log(response);
    setData(response);
  };

  const submitUpdate = async (vales) => {
    try {
      let response = await agent.Leave.update(vales, id);
      console.log(response);
      router.navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const SwalUpdate = async (value) => {
    Swal.fire({
      title: "คุณเเน่ใจไหม ?",
      text: "คุณต้องการเเก้ไขข้อมูลเครื่องราชฯใช่หรือไม่ !",
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

  if (!data) return <>5555</>;
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
              <h4 className="page-title">เเก้ไขข้อมูลการลา</h4>
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
                leaveType: data.leave_type,
                startdate: data.leave_startdate,
                enddate: data.leave_enddate,
                quantity: data.leave_quantity,
                note: data.leave_note,
              }}
              validate={(values) => {
                const error = {};
                if (values.startdate > values.enddate) {
                  error.startdate = "วันเเรกที่ลามากกว่าวันสุดท้ายที่ลา";
                }
                return error;
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
                          </div>
                        </div>

                        <div className="row">
                          <div className="form-group col-lg-4 mb-4">
                            <label className="col-md-12 p-0">
                              วันที่เริ่มลา
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
                          </div>
                          <div className="form-groupmb-4 col-lg-4">
                            <label className="col-md-12 p-0">
                              จำนวนวันที่ลา
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="quantity"
                                placeholder="หน่วยงานที่บริหาร"
                                onChange={handleChange}
                                value={values.quantity}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                        </div>
                        <br></br>
                        <div className="form-group  mb-4">
                          <label className="col-md-4 p-0">หมายเหตุ</label>
                          <div className="col-md-12 border-bottom p-0">
                            <textarea
                              name="note"
                              placeholder="รายละเอียดตำเเหน่งที่บริหาร"
                              onChange={handleChange}
                              value={values.note}
                              rows="5"
                              className="form-control p-0 border-0"
                            ></textarea>
                          </div>

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
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default updateLeave;
