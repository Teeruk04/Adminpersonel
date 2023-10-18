import React, { useEffect, useState } from "react";
import { router } from "../../routes/Routes";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import Swal from "sweetalert2";
import { Formik } from "formik";

const updateArrest = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    getArrestById();
  }, []);

  const submitUpdate = async (value) => {
    try {
      let response = await agent.Arrest.update(value, id);
      console.log(response);
      router.navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const SwalUpdate = async (value) => {
    Swal.fire({
      title: "คุณเเน่ใจไหม ?",
      text: "คุณต้องการเเก้ไขข้อมูลการถูกจับใช่หรือไม่ !",
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

  const getArrestById = async () => {
    var response = await agent.Arrest.getById(id);
    console.log(response);
    setData(response);
  };

  if (!data) return <>55555</>;

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
        {" "}
        <div className="page-breadcrumb bg-white">
          <div className="row align-items-center">
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <h4 className="page-title">
                เเก้ไขประวัติการถูกจับหรือการฟ้องศาล
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
        <div className="container-fluid">
          <Formik
            enableReinitialize={true}
            initialValues={{
              date: data.arrest_date,
              crimescene: data.arrest_crimescene,
              plaint: data.arrest_plaint,
              outcomeofthecase: data.arrest_outcomeofthecase,
            }}
            onSubmit={SwalUpdate}
          >
            {({ values, handleChange, handleSubmit, errors, touched }) => (
              <form
                class="form-horizontal form-material"
                onSubmit={handleSubmit}
              >
                <div className="container-fluid">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="form-group col-lg-6 mb-4">
                            <label className="col-md-12 p-0">
                              วันที่เกิดเหตุ
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="date"
                                name="date"
                                onChange={handleChange}
                                value={values.date}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                          <div className="form-group col-lg-6 mb-4">
                            <label className="col-md-12 p-0">
                              ข้อหา หรือ คดี
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="plaint"
                                onChange={handleChange}
                                value={values.plaint}
                                placeholder="ข้อหา หรือ คดี ที่ถูกฟ้อง"
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-lg-6 mb-4">
                            <label className="col-md-12 p-0">
                              สถานที่เกิดเหตุ
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <textarea
                                name="crimescene"
                                onChange={handleChange}
                                value={values.crimescene}
                                rows="5"
                                className="form-control p-0 border-0"
                              ></textarea>
                            </div>
                          </div>
                          <div className="form-group col-lg-6 mb-4">
                            <label className="col-md-12 p-0">
                              ผลที่สุดเเห่งคดี
                            </label>
                            <div className="col-md-12 border-bottom p-0">
                              <textarea
                                name="outcomeofthecase"
                                onChange={handleChange}
                                value={values.outcomeofthecase}
                                rows="5"
                                className="form-control p-0 border-0"
                              ></textarea>
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

export default updateArrest;
