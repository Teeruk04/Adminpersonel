import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { router } from "../../routes/Routes";
import agent, { BaseURL } from "../../app/api/agent";
import Swal from "sweetalert2";
import { Image } from "antd";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfPetitionByUser from "../reportPDF/reportPetition";
import { config } from "../../constants/config";
import { Pagination } from "react-bootstrap";
import { Input, Space } from "antd";

const mainPetition = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const { Search } = Input;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const PDF_FILE_URL = `http://tee.kru.ac.th/Cs63/s10/Apppersonel/Leave/ใบลาป่วย ลาคลอดบุตร ลากิจส่วนตัว.pdf`;
  const PDF_THHWWGB_URL =
    "http://tee.kru.ac.th/Cs63/s10/Apppersonel/Leave/แบบใบลาไปช่วยเหลือภริยาที่คลอดบุตร.pdf";
  const PDF_LEAVE_URL =
    "http://tee.kru.ac.th/Cs63/s10/Apppersonel//Leave/แบบใบลาพักผ่อน.pdf";
  const PDF_ORDINATION_URL =
    "http://tee.kru.ac.th/Cs63/s10/Apppersonel/Leave/แบบใบลาอุปสมบท.pdf";

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    getPetition();
  }, []);

  const downloadFileAtURL = (url) => {
    const fileName = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;

    aTag.setAttribute("download", fileName);
    aTag.setAttribute("target", "_blank");
    document.body.appendChild(aTag);

    aTag.click();

    aTag.remove();
  };

  const getPetition = async (search = "") => {
    var result = await agent.Petition.getPetitionByUserId(id, search);
    console.log(result);
    setData(result);
  };

  const deletePetition = async (id) => {
    await agent.Petition.delete(id).then(getPetition);
  };
  const SwalDelete = async (id) => {
    Swal.fire({
      title: "คุณเเน่ใจไหม ?",
      text: "คุณต้องการยกเลิกการยื่นคำร้องใช่หรือไม่ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deletePetition(id);
      }
    });
  };
  const SwalTest = async () => {
    Swal.fire("การยื่นคำร้องอยู่ในขั้นตอนการตรวจสอบ ไม่สามารถยกเลิกได้");
  };
  const SwalTest1 = async () => {
    Swal.fire("การยื่นคำร้องได้ทำการวินิจฉัยเรียบร้อยเเล้ว ไม่สามารถยกเลิกได้");
  };

  const DateTH = (date) =>
    Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(Date.parse(date));
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
            <div className="col-lg-6 col-md-4 col-sm-4 col-xs-12">
              <h4 className="page-title">ประวัติการยื่นคำร้อง</h4>
            </div>
            <div className="col-lg-6 col-sm-8 col-md-8 col-xs-12">
              <div className="d-md-flex">
                <ol className="breadcrumb ms-auto">
                  <li>
                    <a href="#" className="fw-normal"></a>
                  </li>
                </ol>
                {/* <a href="https://sites.google.com/kru.ac.th/hrm/form?authuser=0"
                  class="btn d-grid btn-danger text-white" target="_blank">
                  ดาวน์โหลดใบลา</a> */}

                <div className="text-center  ">
                  <button
                    type="button"
                    id="dropdownMenuButton1"
                    className="btn btn-danger  dropdown-toggle waves-light text-white"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    เเบบใบลา
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-dark   text-white"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li className="text-center">
                      <button
                        onClick={() => {
                          downloadFileAtURL(PDF_FILE_URL);
                        }}
                        className="dropdown-item text-center text-white"
                      >
                        ใบลาป่วย ลาคลอดบุตร ลากิจส่วนตัว
                      </button>
                    </li>
                    <li className="text-center">
                      <button
                        onClick={() => {
                          downloadFileAtURL(PDF_THHWWGB_URL);
                        }}
                        className="dropdown-item text-center text-white"
                      >
                        ใบลาไปช่วยเหลือภริยาที่คลอดบุตร
                      </button>
                    </li>
                    <li className="text-center">
                      <button
                        onClick={() => {
                          downloadFileAtURL(PDF_LEAVE_URL);
                        }}
                        className="dropdown-item text-center text-white"
                      >
                        ใบลาพักผ่อน
                      </button>
                    </li>
                    <li className="text-center">
                      <Link
                        onClick={() => {
                          downloadFileAtURL(PDF_ORDINATION_URL);
                        }}
                        className="dropdown-item text-center text-white"
                      >
                        ใบลาอุปสมบท
                      </Link>
                    </li>
                  </ul>
                </div>
                <Link
                  to={config.BASE_HOST + `addPetition/${id}`}
                  // target="_blank"
                  className="btn btn-success  d-none d-md-block pull-right ms-3 hidden-xs hidden-sm waves-effect waves-light text-white"
                >
                  ยื่นคำร้อง
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="white-box">
                <h3 className="box-title">การยื่นคำร้อง</h3>
                <p className="text-muted"></p>
                <div className="row justify-content-between">
                  <div className="col-lg-3 ">
                    <Search
                      placeholder="ค้นหา"
                      allowClear
                      enterButton="ค้นหา"
                      size="large"
                      onSearch={getPetition}
                    />
                  </div>
                  <div className="col-lg-3 ">
                    <PDFDownloadLink
                      document={<PdfPetitionByUser data={data} />}
                      fileName="ประวัติการยื่นคำร้อง"
                    >
                      <button
                        // target="_blank" ลิงค์เปิดเเท็ปใหม่
                        className="btn btn-danger  d-none d-md-block pull-right ms-3 hidden-xs hidden-sm waves-effect waves-light text-white"
                      >
                        PDF
                      </button>
                    </PDFDownloadLink>
                  </div>
                </div>

                <br></br>
                <br></br>
                <div className="table-responsive">
                  <table className="table text-nowrap">
                    <thead>
                      <tr>
                        <th className="border-top-0 text-center">หลักฐาน</th>
                        <th className="border-top-0 text-center">รายละเอียด</th>
                        <th className="border-top-0 text-center">
                          วันที่ยื่นคำร้อง
                        </th>
                        <th className="border-top-0 text-center">สถานะ</th>
                        <th className="border-top-0 text-center">จัดการ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td className="text-center">
                              {item.file ? (
                                <Image
                                  width={100}
                                  height={100}
                                  alt="user"
                                  src={config.BASE_IMAGE + item.file}
                                />
                              ) : (
                                <img
                                  src={config.BASE_HOST + "images/image5.png"}
                                  width={100}
                                  height={100}
                                  alt="homepage"
                                />
                              )}
                            </td>

                            <td className="text-center">{item.peti_message}</td>
                            <td className="text-center">
                              {DateTH(item.createdate)}
                            </td>
                            <td className="text-center">{item.peti_staus}</td>

                            <td className="text-center">
                              {item.peti_staus == "รอเจ้าหน้าที่รับเรื่อง" ? (
                                <button
                                  onClick={() => SwalDelete(item.id)}
                                  // target="_blank" ลิงค์เปิดเเท็ปใหม่
                                  className="btn btn-danger   text-white"
                                >
                                  ยกเลิกการยืนคำร้อง
                                </button>
                              ) : null}
                              {item.peti_staus == "วินิจฉัยเสร็จสิ้น" ? (
                                <button
                                  onClick={() => SwalTest1()}
                                  // target="_blank" ลิงค์เปิดเเท็ปใหม่
                                  className="btn btn-danger   text-white"
                                  disabled
                                >
                                  ยกเลิกการยืนคำร้อง
                                </button>
                              ) : null}
                              {item.peti_staus == "ตรวจสอบรายละเอียด" ? (
                                <button
                                  onClick={() => SwalTest()}
                                  // target="_blank" ลิงค์เปิดเเท็ปใหม่
                                  className="btn btn-danger   text-white"
                                  disabled
                                >
                                  ยกเลิกการยืนคำร้อง
                                </button>
                              ) : null}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-end">
                    <Pagination>
                      <Pagination.Prev
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      />
                      {Array.from(
                        { length: Math.ceil(data.length / itemsPerPage) },
                        (_, index) => (
                          <Pagination.Item
                            key={index}
                            active={index + 1 === currentPage}
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </Pagination.Item>
                        )
                      )}
                      <Pagination.Next
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={
                          currentPage === Math.ceil(data.length / itemsPerPage)
                        }
                      />
                    </Pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default mainPetition;
