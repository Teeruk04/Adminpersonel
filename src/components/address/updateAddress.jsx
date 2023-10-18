import React, { useEffect, useState } from "react";
import { router } from "../../routes/Routes";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import Swal from "sweetalert2";
import { Formik } from "formik";

const updateAddress = () => {
  const { id } = useParams();
  const [status, setStatus] = useState();
  const [data, setData] = useState();
  useEffect(() => {
    getStatus();
    getAddressById();
  }, []);

  const submitUpdate = async (value) => {
    try {
      let response = await agent.Address.update(value, id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const SwalUpdate = async (value) => {
    Swal.fire({
      title: "คุณเเน่ใจไหม ?",
      text: "คุณต้องการเเก้ไขข้อมูลที่อยู่อาศัยใช่หรือไม่ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
    }).then((result) => {
      if (result.isConfirmed) {
        submitUpdate(value);
        router.navigate(-1)
      }
    });
  };
  const getAddressById = async () => {
    var response = await agent.Address.getAddressById(id);
    console.log(response);
    setData(response);
  };

  const getStatus = async () => {
    var response = await agent.StatusA.getStatusA();
    console.log(response);
    setStatus(response);
  };
  if (!status) return <>555555</>;
  if (!data) return <>555555</>;
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
              <h4 className="page-title">เเก้ไขประวัติที่อยู่อาศัย</h4>
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
                startdate: data.address_startdate,
                enddate: data.address_enddate,
                housenumber: data.address_housenumber,
                alley: data.address_alley,
                road: data.address_road,
                canton: data.address_country,
                district: data.address_district,
                province: data.address_province,
                country: data.address_country,
                statusA: data.id_statusA,
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
                        <div className="form-group row align-items-center">
                          <div className="form-group col-lg-4 mb-4">
                            <label className="col-md-12 p-0">วันเเรก</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="date"
                                name="startdate"
                                placeholder="ชื่อของเครื่องราชอิสริยาภรณ์"
                                  onChange={handleChange}
                                  value={values.startdate}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                          <div className="form-group col-lg-4 mb-4">
                            <label className="col-md-12 p-0">วันสุดท้าย</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="date"
                                name="enddate"
                                placeholder="ปีของเครื่องราชอิสริยาภรณ์"
                                  onChange={handleChange}
                                  value={values.enddate}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                          <div className="form-group col-lg-4 mb-4">
                            <label className="col-md-12 p-0">สถานะ</label>

                            <div className="col-sm-12 border-bottom">
                              <select
                                onChange={(e) =>
                                  setFieldValue("statusA", e.target.value)
                                }
                                as="select"
                                name="statusA"
                                className="form-select shadow-none p-0 border-0 form-control-line"
                              >
                                <option>เลือก</option>
                                {status.map((item, i) => {
                                  return (
                                    <option key={i} value={item.id}>
                                      {item.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="form-group col-lg-4 mb-4">
                            <label className="col-md-12 p-0">บ้านเลขที่</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="housenumber"
                                placeholder="บ้านเลขที่"
                                  onChange={handleChange}
                                  value={values.housenumber}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                          <div className="form-group col-lg-4 mb-4">
                            <label className="col-md-12 p-0">ซอย</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="alley"
                                placeholder="ชื่อซอย ไม่มีไม่ต้องใส่"
                                  onChange={handleChange}
                                  value={values.alley}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                          <div className="form-group col-lg-4 mb-4">
                            <label className="col-md-12 p-0">ถนน</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="road"
                                placeholder="ชื่อถนน ไม่มีไม่ต้องใส่"
                                  onChange={handleChange}
                                  value={values.road}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">ตำบล</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="canton"
                                placeholder="ชื่อตำบล"
                                  onChange={handleChange}
                                  value={values.canton}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">อำเภอ</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="district"
                                placeholder="ชื่ออำเภอ"
                                  onChange={handleChange}
                                  value={values.district}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">จังหวัด</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="province"
                                placeholder="ชื่อจังหวัด"
                                  onChange={handleChange}
                                  value={values.province}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
                          </div>
                          <div className="form-group col-lg-3 mb-4">
                            <label className="col-md-12 p-0">ประเทศ</label>
                            <div className="col-md-12 border-bottom p-0">
                              <input
                                type="text"
                                name="country"
                                placeholder="ชื่อประเทศ"
                                  onChange={handleChange}
                                  value={values.country}
                                className="form-control p-0 border-0"
                              />{" "}
                            </div>
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
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default updateAddress;
