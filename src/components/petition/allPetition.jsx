import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import agent, { BaseURL } from "../../app/api/agent";
import Swal from "sweetalert2";
import { router } from "../../routes/Routes";
import { Image } from "antd";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfPetitionAll from "../reportPDF/reportPetitionAll";
import { config } from "../../constants/config";
import { Pagination } from "react-bootstrap";
import { Input, Space } from "antd";

const allPetition = () => {
  const [data, setData] = useState([]);
  const { Search } = Input;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    getPetitionList();
  }, []);

  const getPetitionList = async (search = "") => {
    var result = await agent.Petition.getPetitionAll(search);
    setData(result);
  };
  const confirmPetition = async (id) => {
    await agent.Petition.confirm(id).then(getPetitionList);
  };
  const acceptPetition = async (id) => {
    await agent.Petition.accept(id).then(getPetitionList);
  };
  const cancelPetition = async (id) => {
    await agent.Petition.cancel(id).then(getPetitionList);
  };

  const SwalConfirm = async (id) => {
    Swal.fire({
      title: "คุณเเน่ใจไหม ?",
      text: "คุณต้องการเปลี่ยนสถานะเป็น วินิจฉัยเสร็จสิ้น ใช่หรือไม่ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await confirmPetition(id);
      }
    });
  };

  const SwalAccept = async (id) => {
    Swal.fire({
      title: "คุณเเน่ใจไหม ?",
      text: "คุณต้องการเปลี่ยนสถานะเป็น ตรวจสอบรายละเอียด ใช่หรือไม่ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await acceptPetition(id);
      }
    });
  };

  const SwalCancel = async (id) => {
    Swal.fire({
      title: "คุณเเน่ใจไหม ?",
      text: "คุณต้องการเปลี่ยนสถานะเป็น รอเจ้าหน้าที่รับเรื่อง ใช่หรือไม่ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await cancelPetition(id);
      }
    });
  };

  const DateTH = (date) =>
    Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(Date.parse(date));
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
        <div className="page-breadcrumb bg-white">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-4 col-sm-4 col-xs-12">
              <h4 className="page-title">ประวัติการยื่นคำร้องทั้งหมด</h4>
            </div>
            <div className="col-lg-6 col-sm-8 col-md-8 col-xs-12">
              <div className="d-md-flex">
                <ol className="breadcrumb ms-auto">
                  <li>
                    <a href="#" className="fw-normal"></a>
                  </li>
                </ol>
                {/* {local.data.statusUname == "เจ้าหน้าที่" ? ( */}
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="white-box">
                <h3 className="box-title">ประวัติการยื่นคำร้อง</h3>
                <div className="row justify-content-between">
                  <div className="col-lg-3 ">
                    <Search
                      placeholder="input search text"
                      allowClear
                      enterButton="Search"
                      size="large"
                      onSearch={getPetitionList}
                    />
                  </div>
                  <div className="col-lg-3 ">
                    <PDFDownloadLink
                      document={<PdfPetitionAll data={data} />}
                      fileName="ประวัติการยื่นคำร้องทั้งหมด"
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
            
                <p className="text-muted"></p>
                <div className="table-responsive">
                  <table className="table text-nowrap">
                    <thead>
                      <tr>
                        <th className="border-top-0 text-center">หลักฐาน</th>
                        <th className="border-top-0 text-center">ชื่อ</th>
                        <th className="border-top-0 text-center">นามสกุล</th>
                        <th className="border-top-0 text-center">รายละเอียด</th>
                        <th className="border-top-0 text-center">
                          วันที่ยื่นคำร้อง
                        </th>
                        <th className="border-top-0 text-center">สถานะ</th>
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
                            <td className="text-center">
                              {item.author.user_name}
                            </td>
                            <td className="text-center">
                              {item.author.user_lastname}
                            </td>
                            <td className="text-center">{item.peti_message}</td>
                            <td className="text-center">
                              {DateTH(item.createdate)}
                            </td>
                            <td className="text-center">{item.peti_staus}</td>

                            {/* {local.data.statusUname == "เจ้าหน้าที่" ? ( */}
                            <td className="text-center">
                              <div className="dropdown ">
                                <a
                                  className="btn btn-secondary dropdown-toggle  btn-warning"
                                  href="#"
                                  role="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  จัดการ
                                </a>

                                <ul className="dropdown-menu">
                                  <li>
                                    <button
                                      onClick={() => SwalCancel(item.id)}
                                      className="dropdown-item"
                                    >
                                      รอเจ้าหน้าที่รับเรื่อง
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      onClick={() => SwalAccept(item.id)}
                                      className="dropdown-item"
                                    >
                                      ตรวจสอบรายละเอียด
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      onClick={() => SwalConfirm(item.id)}
                                      className="dropdown-item"
                                    >
                                      วินิจฉัยเสร็จสิ้น
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </td>
                            {/* // ) : null} */}
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

export default allPetition;
