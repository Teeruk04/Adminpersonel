import React, { useEffect, useState } from "react";
import agent, { BaseURL } from "../../app/api/agent";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Input, Space } from "antd";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfUserAll from "../reportPDF/reportUser";
import PdfUserBureaucrat from "../reportPDF/reportUserbureaucrat";
import PdfUserCivilServant from "../reportPDF/reportUsercivilservant";
import { config } from "../../constants/config";
import { Pagination } from "react-bootstrap";

const mainUser = () => {
  const [data, setData] = useState([]);
  const { Search } = Input;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async (search = "") => {
    var result = await agent.User.getUsers(search);
    console.log(result);
    setData(result);
  };

  const deleteUser = async (id) => {
    await agent.User.deleteUser(id).then(getUserList);
  };

  const SwalDelete = async (id) => {
    Swal.fire({
      title: "คุณเเน่ใจไหม ?",
      text: "คุณต้างการลบข้อมูลบุคลากรใช่หรือไม่ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteUser(id);
      }
    });
  };
  if (!data)
    return (
      <>
        <h1></h1>
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
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <h4 className="page-title">
                ข้อมูลบุคลากรในมหาวิทยาลัยราชภัฏกาญจนบุรี
              </h4>
            </div>
            <div className="col-lg-8 col-sm-8 col-md-8 col-xs-12">
              <div className="d-md-flex">
                <ol className="breadcrumb ms-auto">
                  <li></li>
                </ol>
                <div className="text-center  ">
                  <button
                    type="button"
                    id="dropdownMenuButton1"
                    className="btn btn-danger  dropdown-toggle  waves-effect waves-light text-white"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    PDF
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-dark   text-white"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li className="text-center">
                      <PDFDownloadLink
                        document={<PdfUserAll />}
                        fileName="ข้อมูลบุคลากรทั้งหมด"
                      >
                        <button className="dropdown-item text-center text-white">
                          ข้อมูลบุคลากรทั้งหมด
                        </button>
                      </PDFDownloadLink>{" "}
                    </li>
                    <li className="text-center">
                      <PDFDownloadLink
                        document={<PdfUserBureaucrat />}
                        fileName="ข้อมูลข้าราชการทั้งหมด"
                      >
                        <button className="dropdown-item text-center text-white">
                          ข้อมูลข้าราชการ
                        </button>
                      </PDFDownloadLink>{" "}
                    </li>
                    <li className="text-center">
                      <PDFDownloadLink
                        document={<PdfUserCivilServant />}
                        fileName="ข้อมูลพนักงานข้าราชการทั้งหมด"
                      >
                        <button className="dropdown-item text-center text-white">
                          ข้อมูลพนักงานข้าราชการ
                        </button>
                      </PDFDownloadLink>
                    </li>
                  </ul>
                </div>

                <Link
                  to={config.BASE_HOST + "register"}
                  // target="_blank" ลิงค์เปิดเเท็ปใหม่
                  className="btn btn-danger  d-none d-md-block pull-right ms-3 hidden-xs hidden-sm waves-effect waves-light text-white"
                >
                  เพิ่มบุคคลากร
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 ">
                <Search
                  placeholder="ค้นหา"
                  allowClear
                  enterButton="ค้นหา"
                  size="large"
                  onSearch={getUserList}
                />
              </div>
            </div>

            <br></br>

            <div className="row justify-content-center">
              {currentItems.map((item, i) => {
                return (
                  <div key={i} className="col-lg-3 col-md-12">
                    <div className="white-box col  analytics-info">
                      <div className="text-center">
                        <b className="logo-icon ">
                          {item.field ? (
                            <img
                              src={config.BASE_IMAGE + item.field}
                              height={200}
                              width={200}
                              alt="homepage"
                            />
                          ) : (
                            <img
                              src={config.BASE_HOST + "images/image5.png"}
                              height={200}
                              width={200}
                              alt="homepage"
                            />
                          )}
                        </b>
                      </div>
                      <br></br>
                      <h5 className=" text-center ">
                        {item.titlename} {item.user_name} {item.user_lastname}
                      </h5>
                      <h5 className="text-center">{item.statusUname}</h5>
                      <div className="text-center  dropend">
                        <button
                          type="button"
                          id="dropdownMenuButton1"
                          className="btn btn-danger  dropdown-toggle  waves-effect waves-light text-white"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          จัดการ
                        </button>
                        <ul
                          className="dropdown-menu dropdown-menu-dark   text-white"
                          aria-labelledby="dropdownMenuButton1"
                        >
                          <li className="text-center">
                            <Link
                              to={config.BASE_HOST + `detail/${item.id}`}
                              className="dropdown-item text-center text-white"
                            >
                              ข้อมูลเพิ่มเติม
                            </Link>
                          </li>
                          <li className="text-center">
                            <Link
                              to={config.BASE_HOST + `updateUser/${item.id}`}
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
                    </div>
                  </div>
                );
              })}
            </div>
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
  );
};

export default mainUser;
