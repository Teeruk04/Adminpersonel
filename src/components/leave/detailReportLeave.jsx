import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import { LeaveType } from "../../constants/LeaveType";
import { router } from "../../routes/Routes";
import Swal from "sweetalert2";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfLeaveStatisticByUser from "../reportPDF/reportLeaveStatistic";
import PdfLeaveByUser from "../reportPDF/reportLeave";
import { config } from "../../constants/config";
const detailReportLeave = () => {
  const { id } = useParams();
  const [ReportLeave, setReportLeave] = useState();
  const [leave, setLeave] = useState();
  const [local, setLocal] = useState();

  useEffect(() => {
    getSumLeave();
    getReportLeave();
    getUserByLocal();
  }, []);

  const getUserByLocal = () => {
    var json = localStorage.getItem("user");
    setLocal(JSON.parse(json));
  };

  const getSumLeave = async () => {
    var response = await agent.Leave.getByReportId(id);
    setLeave(response);
  };

  const getReportLeave = async () => {
    var response = await agent.ReportLeave.getByReportId(id);
    setReportLeave(response);
  };

  const deleteLeave = async (id) => [
    await agent.Leave.delete(id).then(getSumLeave),
  ];

  const SwalDelete = async (id) => {
    Swal.fire({
      title: "คุณเเน่ใจไหม ?",
      text: "คุณต้องการลบข้อมูลการลาใช่หรือไม่ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteLeave(id);
      }
    });
  };

  const DateTH = (date) =>
    Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(Date.parse(date));
  if (!leave) return <>55555</>;
  if (!ReportLeave) return <>55555</>;
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
            <div className="col-lg-6 col-md-4 col-sm-4 col-xs-12">
              <h4 className="page-title">ข้อมูลสถิติวันลา</h4>
            </div>
            <div className="col-lg-6 col-sm-8 col-md-8 col-xs-12">
              <div className="d-md-flex">
                <ol className="breadcrumb ms-auto">
                  <li>
                    <a href="#" className="fw-normal"></a>
                  </li>
                </ol>
                <PDFDownloadLink
                  document={
                    <PdfLeaveStatisticByUser data={ReportLeave} leave={leave} />
                  }
                  fileName="ข้อมูลบุคลากรทั้งหมด"
                >
                  <button
                    // target="_blank" ลิงค์เปิดเเท็ปใหม่
                    className="btn btn-danger  d-none d-md-block pull-right ms-3 hidden-xs hidden-sm waves-effect waves-light text-white"
                  >
                    PDF
                  </button>
                </PDFDownloadLink>
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
          <div className="row">
            <div className="">
              <div className="white-box">
                <h1 className="text-center">ข้อมูลสถิติวันลา</h1>
                <br></br>
                <br></br>
                <table className="table table-bordered ">
                  <thead>
                    <tr className="table-active">
                      <th className="text-center" scope="col">
                        ประเภทวันลา
                      </th>
                      <th className="text-center" scope="col">
                        ลามาเเล้ว
                      </th>
                      <th className="text-center" scope="col">
                        วันลาคงเหลือ
                      </th>
                      <th className="text-center" scope="col">
                        ประเภทวันลา
                      </th>
                      <th className="text-center" scope="col">
                        ลามาเเล้ว
                      </th>
                      <th className="text-center" scope="col">
                        วันลาคงเหลือ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center fw-bold">ลาพักผ่อน</td>
                      <td className="text-center">{leave.leaveCount}</td>
                      <td className="text-center">
                        {ReportLeave.reportL_leave - leave.leaveCount}
                      </td>
                      <td className="text-center fw-bold">ลาป่วย</td>
                      <td className="text-center">{leave.leavesickCount} </td>
                      <td className="text-center">
                        {ReportLeave.reportL_leavesick - leave.leavesickCount}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center fw-bold">ลากิจ</td>
                      <td className="text-center">
                        {leave.leavepersonalCount}
                      </td>
                      <td className="text-center">
                        {ReportLeave.reportL_leavepersonal -
                          leave.leavepersonalCount}
                      </td>
                      <td className="text-center fw-bold">ลาคลอด</td>
                      <td className="text-center">
                        {leave.leavematerntityCount}
                      </td>
                      <td className="text-center">
                        {ReportLeave.reportL_leavematerntity -
                          leave.leavematerntityCount}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center fw-bold">
                        ลาไปช่วยเหลือภริยาที่คลอดบุตร
                      </td>
                      <td className="text-center">{leave.leaveTHHWWGBCount}</td>
                      <td className="text-center">
                        {ReportLeave.reportL_leaveTHHWWGB -
                          leave.leaveTHHWWGBCount}
                      </td>
                      <td className="text-center fw-bold">ลาอุปสมบท</td>
                      <td className="text-center">
                        {leave.leaveordinationCount}
                      </td>
                      <td className="text-center">
                        {ReportLeave.reportL_leaveordination -
                          leave.leaveordinationCount}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center fw-bold">
                        ลาไปถือศีลเเละปฎิบัติธรรม
                      </td>
                      <td className="text-center">
                        {leave.leaveforstudyCount}
                      </td>
                      <td className="text-center">
                        {ReportLeave.reportL_leaveforfasting -
                          leave.leaveforstudyCount}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="">
              <div className="white-box">
                <h1 className="text-center">
                  ประวัติการลาประจำปี{" "}
                  {new Date(ReportLeave.createdate).getFullYear() + 543}
                </h1>
                <PDFDownloadLink
                  document={
                    <PdfLeaveByUser data={leave} report={ReportLeave} />
                  }
                  fileName="ประวัติการลาประจำปี"
                >
                  <button
                    // target="_blank" ลิงค์เปิดเเท็ปใหม่
                    className="btn btn-danger  d-none d-md-block pull-right ms-3 hidden-xs hidden-sm waves-effect waves-light text-white"
                  >
                    PDF
                  </button>
                </PDFDownloadLink>

                <br></br>
                <br></br>
                <table className="table table-bordered ">
                  <thead>
                    <tr className="table-active">
                      <th className="text-center" scope="col">
                        ประเภทวันลา
                      </th>
                      <th className="text-center" scope="col">
                        จำนวนวัน
                      </th>
                      <th className="text-center" scope="col">
                        วันที่เริ่มลา
                      </th>
                      <th className="text-center" scope="col">
                        วันสุดท้ายที่ลา
                      </th>
                      <th className="text-center" scope="col">
                        หมายเหตุ
                      </th>
                      {local.data.statusUname == "เจ้าหน้าที่" ? (
                        <th className="text-center" scope="col">
                          จัดการ
                        </th>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody>
                    {leave.leaves.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td className="text-center ">
                            {LeaveType[item.leave_type]}
                          </td>
                          <td className="text-center">{item.leave_quantity}</td>
                          <td className="text-center">
                            {DateTH(item.leave_startdate)}
                          </td>
                          <td className="text-center ">
                            {DateTH(item.leave_enddate)}
                          </td>
                          <td className="text-center ">{item.leave_note}</td>
                          {local.data.statusUname == "เจ้าหน้าที่" ? (
                            <td className="text-center">
                              <div className="text-center ">
                                <button
                                  type="button"
                                  id="dropdownMenuButton1"
                                  className="btn btn-danger  dropdown-toggle  waves-effect waves-light text-white"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  ข้อมูลเพิ่มเติม
                                </button>
                                <ul
                                  className="dropdown-menu dropdown-menu-dark   text-white"
                                  aria-labelledby="dropdownMenuButton1"
                                >
                                  <li className="text-center">
                                    <Link
                                      to={
                                        config.BASE_HOST +
                                        `updateLeave/${item.id}`
                                      }
                                      className="dropdown-item text-center text-white"
                                    >
                                      เเก้ไขข้อมูล
                                    </Link>
                                  </li>
                                  <li className="text-center">
                                    <button
                                      onClick={() => SwalDelete(item.id)}
                                      className="dropdown-item text-center text-white"
                                    >
                                      ลบข้อมูล
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </td>
                          ) : null}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default detailReportLeave;
