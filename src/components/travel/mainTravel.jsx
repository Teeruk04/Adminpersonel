import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { router } from "../../routes/Routes";
import agent from "../../app/api/agent";
import Swal from "sweetalert2";
import { config } from "../../constants/config";
import { Pagination } from "react-bootstrap";
import { Input, Space } from "antd";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfTravel from "../reportPDF/reportTravel";

const mainTravel = () => {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [data, setData] = useState([]);
  const [local, setLocal] = useState();
  const { Search } = Input;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (id) getUserById();
    if (id) getTravelByUserId();
    getUserByLocal();
  }, []);

  const getUserByLocal = () => {
    var json = localStorage.getItem("user");
    setLocal(JSON.parse(json));
  };

  const getUserById = async () => {
    const result = await agent.User.getUserId(id);
    setUser(result);
  };

  const getTravelByUserId = async (search = "") => {
    const response = await agent.Travel.getTravel(id, search);
    setData(response);
  };

  const deleteTravel = async (id) => {
    await agent.Travel.delete(id).then(getTravelByUserId);
  };

  const SwalDelete = async (id) => {
    Swal.fire({
      title: "คุณเเน่ใจไหม ?",
      text: "คุณต้องการลบข้อมูลประวัติการเดินทางไปต่างประเทศใช่หรือไม่ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteTravel(id);
      }
    });
  };

  const DateTH = (date) =>
    Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(Date.parse(date));
  if (!user) return <>55555555</>;
  if (!data) return <>55555555</>;
  if (!local) return <>55555555</>;
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
              <h4 className="page-title">
                ข้อมูลประวัติการเดินทางไปต่างประเทศของ {user.title.title_name}{" "}
                {user.user_name} {user.user_lastname}
              </h4>
            </div>
            <div className="col-lg-6 col-sm-8 col-md-8 col-xs-12">
              <div className="d-md-flex">
                <ol className="breadcrumb ms-auto">
                  <li>
                    <a href="#" className="fw-normal"></a>
                  </li>
                </ol>
                {local.data.statusUname == "เจ้าหน้าที่" ? (
                  <Link
                    to={config.BASE_HOST + `addtarvel/${id}`}
                    // target="_blank" ลิงค์เปิดเเท็ปใหม่
                    className="btn btn-success  d-none d-md-block pull-right ms-3 hidden-xs hidden-sm waves-effect waves-light text-white"
                  >
                    เพิ่มประวัติการเดินทางไปต่างประเทศ
                  </Link>
                ) : null}

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
            <div className="col-sm-12">
              <div className="white-box">
                <h3 className="box-title">ประวัติการเดินทางไปต่างประเทศ</h3>
                <p className="text-muted"></p>
                <div className="row justify-content-between">
                  <div className="col-lg-3 ">
                    <Search
                      placeholder="ค้นหา"
                      allowClear
                      enterButton="ค้นหา"
                      size="large"
                      onSearch={getTravelByUserId}
                    />
                  </div>
                  <div className="col-lg-3 ">
                    <PDFDownloadLink
                      document={<PdfTravel data={data} />}
                      fileName="ข้อมูลประวัติการเดินทางไปต่างประเทศ"
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
                <div className="table-responsive">
                  <table className="table text-nowrap">
                    <thead>
                      <tr>
                        <th className="border-top-0 text-center">
                          วันเเรกที่ไป
                        </th>
                        <th className="border-top-0 text-center">
                          วันสุดท้ายที่กลับ
                        </th>
                        <th className="border-top-0 text-center">ชื่อเมือง</th>
                        <th className="border-top-0 text-center">ประเทศ</th>
                        <th className="border-top-0 text-center">จัดการ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td className="text-center">
                              {DateTH(item.travel_startdate)}
                            </td>
                            <td className="text-center">
                              {DateTH(item.travel_enddate)}
                            </td>
                            <td className="text-center">{item.travel_city}</td>
                            <td className="text-center">
                              {item.travel_county}
                            </td>
                            {local.data.statusUname == "เจ้าหน้าที่" ? (
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
                                      <Link
                                        className="dropdown-item"
                                        to={
                                          config.BASE_HOST +
                                          `detailTarvel/${item.id}`
                                        }
                                      >
                                        ข้อมูลเพิ่มเติม
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item"
                                        to={
                                          config.BASE_HOST +
                                          `updateTarvel/${item.id}`
                                        }
                                      >
                                        เเก้ไขข้อมูล
                                      </Link>
                                    </li>
                                    <li>
                                      <button
                                        onClick={() => SwalDelete(item.id)}
                                        className="dropdown-item"
                                      >
                                        ลบข้อมูล
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </td>
                            ) : (
                              <td className="text-center">
                                <Link
                                  to={
                                    config.BASE_HOST + `detailTarvel/${item.id}`
                                  }
                                  // target="_blank" ลิงค์เปิดเเท็ปใหม่
                                  className="btn btn-success  waves-effect waves-light text-white"
                                >
                                  ข้อมูลเพิ่มเติม
                                </Link>
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <br></br>

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
                  <br></br>
                  <br></br>
                  <br></br>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default mainTravel;
