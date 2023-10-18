import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { router } from "../../routes/Routes";
import agent from "../../app/api/agent";
import { config } from "../../constants/config";

const mainFaAndMo = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [local, setLocal] = useState();
  const [User, setUser] = useState();

  useEffect(() => {
    if (id) getFaANdMO();
    getUserByLocal();
    getUserById();
  }, []);
  const getUserByLocal = () => {
    var json = localStorage.getItem("user");
    setLocal(JSON.parse(json));
  };

  const getUserById = async () => {
    const result = await agent.User.getUserId(id);
    console.log(result);
    setUser(result);
  };

  const getFaANdMO = async () => {
    var response = await agent.FatherAndMother.getFatherAndMother(id);
    setData(response);
  };

  const DateTH = (date) =>
    Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(Date.parse(date));
  if (!data) return <>5555555555</>;
  if (data == "")
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
                  ข้อมูลประวัติบิดาเเละมารดาของ {user.title.title_name} {user.user_name}{" "}
                {user.user_lastname}
                </h4>
              </div>
              <div className="col-lg-8 col-sm-8 col-md-8 col-xs-12">
                <div className="d-md-flex">
                  <ol className="breadcrumb ms-auto">
                    <li>
                      <a href="#" className="fw-normal"></a>
                    </li>
                  </ol>
                  {local.data.statusUname == "เจ้าหน้าที่" ? (
                    <Link
                      to={config.BASE_HOST + `addfaandmo/${id}`}
                      // target="_blank" ลิงค์เปิดเเท็ปใหม่
                      className="btn btn-success  d-none d-md-block pull-right ms-3 hidden-xs hidden-sm waves-effect waves-light text-white"
                    >
                      เพิ่มข้อมูล
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
            <div className="container-fluid">
              <div className="">
                <div className="card">
                  <div className="card-body">
                    <h3 className="box-title fw-bold">ประวัติของบิดา</h3>
                    <br></br>
                    <div className="row">
                      <div className="form-group col-lg-3 mb-4">
                        <div className="row">
                          <h4 className="col-lg-6 fw-bold">
                            ยศหรือคำนำหน้าชื่อ:
                          </h4>
                          <h4 className="col-lg "></h4>
                        </div>
                      </div>
                      <div className="form-group col-lg-3 mb-4">
                        <div className="row">
                          <h4 className="col-lg-2 fw-bold">ชื่อ:</h4>
                          <h4 className="col-lg "></h4>
                        </div>
                      </div>
                      <div className="form-group col-lg-3 mb-4">
                        <div className="row">
                          <h4 className="col-lg-4 fw-bold">นามสกุล:</h4>
                          <h4 className="col-lg "></h4>
                        </div>
                      </div>
                      <div className="form-group col-lg-3 mb-4">
                        <div className="row">
                          <h4 className="col-lg-5 fw-bold">วันเดือนปีเกิด:</h4>
                          <h4 className="col-lg "></h4>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-lg-3 mb-4">
                        <div className="row">
                          <h4 className="col-lg-6 fw-bold">
                            สถานที่ทะเบียนเกิด:
                          </h4>
                          <h4 className="col-lg "></h4>
                        </div>
                      </div>
                      <div className="form-group col-lg-3 mb-4">
                        <div className="row">
                          <h4 className="col-lg-3 fw-bold">เชื้อชาติ:</h4>
                          <h4 className="col-lg "></h4>
                        </div>
                      </div>
                      <div className="form-group col-lg-3 mb-4">
                        <div className="row">
                          <h4 className="col-lg-3 fw-bold">ศาสนา:</h4>
                          <h4 className="col-lg "></h4>
                        </div>
                      </div>
                      <div className="form-group col-lg-3 mb-4">
                        <div className="row">
                          <h4 className="col-lg-3 fw-bold">สัญชาติ:</h4>
                          <h4 className="col-lg "></h4>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-lg-6 mb-4">
                        <div className="row">
                          <h4 className="col-lg-2 fw-bold">ที่อยู่ปัจจุบัน:</h4>
                          <h4 className="col-lg "></h4>
                        </div>
                      </div>
                      <div className="form-group col-lg-6 mb-4">
                        <div className="row">
                          <h4 className="col-lg-3 fw-bold">
                            เบอร์โทรศัพท์มือถือ:
                          </h4>
                          <h4 className="col-lg "></h4>
                        </div>
                      </div>{" "}
                    </div>
                    <div className="row">
                      <div className="form-group col-lg-3 mb-4">
                        <div className="row">
                          <h4 className="col-lg-4 fw-bold">บิดามีอาชีพ:</h4>
                          <h4 className="col-lg "></h4>
                        </div>
                      </div>
                      <div className="form-group col-lg-3 mb-4">
                        <div className="row">
                          <h4 className="col-lg-5 fw-bold">ตำเเหน่งหน้าที่:</h4>
                          <h4 className="col-lg "></h4>
                        </div>
                      </div>
                      <div className="form-group col-lg-3 mb-4">
                        <div className="row">
                          <h4 className="col-lg-5 fw-bold ">สถานที่ทำงาน:</h4>
                          <h4 className="col-lg "></h4>
                        </div>
                      </div>
                      <div className="form-group col-lg-3 mb-4">
                        <div className="row">
                          <h4 className="col-lg-7 fw-bold">
                            เบอร์โทรศัพท์ที่ทำงาน:
                          </h4>
                          <h4 className="col-lg "></h4>
                        </div>
                      </div>
                    </div>

                    <h3 className="box-title fw-bold">ประวัติของมารดา</h3>
                    <br></br>
                    <div className="row">
                      <div className="form-group col-lg-3 mb-4">
                        <div className="row">
                          <h4 className="col-lg-6 fw-bold">
                            ยศหรือคำนำหน้าชื่อ:
                          </h4>
                          <h4 className="col-lg "> </h4>
                        </div>
                      </div>
                      <div className="form-group col-lg-3 mb-4">
                        <div className="row">
                          <h4 className="col-lg-2 fw-bold">ชื่อ:</h4>
                          <h4 className="col-lg "></h4>
                        </div>
                      </div>
                      <div className="form-group col-lg-3 mb-4">
                        <div className="row">
                          <h4 className="col-lg-4 fw-bold">นามสกุล:</h4>
                          <h4 className="col-lg "></h4>
                        </div>
                      </div>
                      <div className="form-group col-lg-3 mb-4">
                        <div className="row">
                          <h4 className="col-lg-5 fw-bold">วันเดือนปีเกิด:</h4>
                          <h4 className="col-lg "></h4>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-lg-3 mb-4">
                        <div className="row">
                          <h4 className="col-lg-6 fw-bold">
                            สถานที่ทะเบียนเกิด:
                          </h4>
                          <h4 className="col-lg "></h4>
                        </div>
                      </div>
                      <div className="form-group col-lg-3 mb-4">
                        <div className="row">
                          <h4 className="col-lg-3 fw-bold">เชื้อชาติ:</h4>
                          <h4 className="col-lg "></h4>
                        </div>
                      </div>
                      <div className="form-group col-lg-3 mb-4">
                        <div className="row">
                          <h4 className="col-lg-3 fw-bold">ศาสนา:</h4>
                          <h4 className="col-lg "></h4>
                        </div>
                      </div>
                      <div className="form-group col-lg-3 mb-4">
                        <div className="row">
                          <h4 className="col-lg-3 fw-bold">สัญชาติ:</h4>
                          <h4 className="col-lg "></h4>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-lg-6 mb-4">
                        <div className="row">
                          <h4 className="col-lg-2 fw-bold">ที่อยู่ปัจจุบัน:</h4>
                          <h4 className="col-lg "></h4>
                        </div>
                      </div>
                      <div className="form-group col-lg-6 mb-4">
                        <div className="row">
                          <h4 className="col-lg-3 fw-bold">
                            เบอร์โทรศัพท์มือถือ:
                          </h4>
                          <h4 className="col-lg "></h4>
                        </div>
                      </div>{" "}
                    </div>
                    <div className="row">
                      <div className="form-group col-lg-3 mb-4">
                        <div className="row">
                          <h4 className="col-lg-4 fw-bold">บิดามีอาชีพ:</h4>
                          <h4 className="col-lg "></h4>
                        </div>
                      </div>
                      <div className="form-group col-lg-3 mb-4">
                        <div className="row">
                          <h4 className="col-lg-5 fw-bold">ตำเเหน่งหน้าที่:</h4>
                          <h4 className="col-lg "></h4>
                        </div>
                      </div>
                      <div className="form-group col-lg-3 mb-4">
                        <div className="row">
                          <h4 className="col-lg-5 fw-bold">สถานที่ทำงาน:</h4>
                          <h4 className="col-lg "></h4>
                        </div>
                      </div>
                      <div className="form-group col-lg-3 mb-4">
                        <div className="row">
                          <h4 className="col-lg-7 fw-bold">
                            เบอร์โทรศัพท์ที่ทำงาน:
                          </h4>
                          <h4 className="col-lg "></h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                เพิ่มประวัติบิดาเเละมารดาของ นาย ผดุงเกียรติ มณีวงษ์
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
          <div className="container-fluid">
            <div className="">
              <div className="card">
                <div className="card-body">
                  <h3 className="box-title fw-bold">ประวัติของบิดา</h3>
                  <br></br>
                  <div className="row">
                    <div className="form-group col-lg-3 mb-4">
                      <div className="row">
                        <h4 className="col-lg-6 fw-bold">คำนำหน้าชื่อ:</h4>
                        <h4 className="col-lg ">{data[0].title.title_name} </h4>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <div className="row">
                        <h4 className="col-lg-3 fw-bold">ชื่อ:</h4>
                        <h4 className="col-lg ">{data[0].fa_name}</h4>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <div className="row">
                        <h4 className="col-lg-4 fw-bold">นามสกุล:</h4>
                        <h4 className="col-lg ">{data[0].fa_lastname}</h4>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <div className="row">
                        <h4 className="col-lg-4 fw-bold">วันเกิด:</h4>
                        <h4 className="col-lg ">
                          {DateTH(data[0].fa_birthdate)}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-lg-3 mb-4">
                      <div className="row">
                        <h4 className="col-lg-6 fw-bold">สถานที่เกิด:</h4>
                        <h4 className="col-lg ">{data[0].fa_placebirth}</h4>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <div className="row">
                        <h4 className="col-lg-4 fw-bold">เชื้อชาติ:</h4>
                        <h4 className="col-lg ">{data[0].fa_race}</h4>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <div className="row">
                        <h4 className="col-lg-4 fw-bold">ศาสนา:</h4>
                        <h4 className="col-lg ">{data[0].fa_religion}</h4>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <div className="row">
                        <h4 className="col-lg-4 fw-bold">สัญชาติ:</h4>
                        <h4 className="col-lg ">{data[0].fa_nationality}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-lg-6 mb-4">
                      <div className="row">
                        <h4 className="col-lg-3 fw-bold">ที่อยู่ปัจจุบัน:</h4>
                        <h4 className="col-lg ">{data[0].fa_address}</h4>
                      </div>
                    </div>
                    <div className="form-group col-lg-6 mb-4">
                      <div className="row">
                        <h4 className="col-lg-4 fw-bold">
                          เบอร์โทรศัพท์มือถือ:
                        </h4>
                        <h4 className="col-lg ">{data[0].fa_phone}</h4>
                      </div>
                    </div>{" "}
                  </div>
                  <div className="row">
                    <div className="form-group col-lg-3 mb-4">
                      <div className="row">
                        <h4 className="col-lg-6 fw-bold">บิดามีอาชีพ:</h4>
                        <h4 className="col-lg ">{data[0].fa_occupation}</h4>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <div className="row">
                        <h4 className="col-lg-4 fw-bold">ตำเเหน่ง:</h4>
                        <h4 className="col-lg ">{data[0].fa_position}</h4>
                      </div>
                    </div>
                    <div className="form-group col-lg-6 mb-4">
                      <div className="row">
                        <h4 className="col-lg-3 fw-bold ">สถานที่ทำงาน:</h4>
                        <h4 className="col-lg ">{data[0].fa_workplace}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-4">
                    <div className="row">
                      <h4 className="col-lg-3 fw-bold">
                        เบอร์โทรศัพท์ของสถานที่ทำงาน:
                      </h4>
                      <h4 className="col-lg ">{data[0].fa_WPphone}</h4>
                    </div>
                  </div>

                  <h3 className="box-title fw-bold">ประวัติของมารดา</h3>
                  <br></br>
                  <div className="row">
                    <div className="form-group col-lg-3 mb-4">
                      <div className="row">
                        <h4 className="col-lg-6 fw-bold">คำนำหน้าชื่อ:</h4>
                        <h4 className="col-lg ">{data[0].titleM.title} </h4>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <div className="row">
                        <h4 className="col-lg-3 fw-bold">ชื่อ:</h4>
                        <h4 className="col-lg ">{data[0].mo_name}</h4>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <div className="row">
                        <h4 className="col-lg-4 fw-bold">นามสกุล:</h4>
                        <h4 className="col-lg ">{data[0].mo_lastname}</h4>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <div className="row">
                        <h4 className="col-lg-4 fw-bold">วันเกิด:</h4>
                        <h4 className="col-lg ">
                          {DateTH(data[0].mo_birthdate)}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-lg-3 mb-4">
                      <div className="row">
                        <h4 className="col-lg-6 fw-bold">สถานที่เกิด:</h4>
                        <h4 className="col-lg ">{data[0].mo_placebirth}</h4>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <div className="row">
                        <h4 className="col-lg-4 fw-bold">เชื้อชาติ:</h4>
                        <h4 className="col-lg ">{data[0].mo_race}</h4>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <div className="row">
                        <h4 className="col-lg-4 fw-bold">ศาสนา:</h4>
                        <h4 className="col-lg ">{data[0].mo_religion}</h4>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <div className="row">
                        <h4 className="col-lg-4 fw-bold">สัญชาติ:</h4>
                        <h4 className="col-lg ">{data[0].mo_nationality}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-lg-6 mb-4">
                      <div className="row">
                        <h4 className="col-lg-3 fw-bold">ที่อยู่ปัจจุบัน:</h4>
                        <h4 className="col-lg ">{data[0].mo_address}</h4>
                      </div>
                    </div>
                    <div className="form-group col-lg-6 mb-4">
                      <div className="row">
                        <h4 className="col-lg-4 fw-bold">
                          เบอร์โทรศัพท์มือถือ:
                        </h4>
                        <h4 className="col-lg ">{data[0].mo_phone}</h4>
                      </div>
                    </div>{" "}
                  </div>
                  <div className="row">
                    <div className="form-group col-lg-3 mb-4">
                      <div className="row">
                        <h4 className="col-lg-6 fw-bold">มารดามีอาชีพ:</h4>
                        <h4 className="col-lg ">{data[0].mo_occupation}</h4>
                      </div>
                    </div>
                    <div className="form-group col-lg-3 mb-4">
                      <div className="row">
                        <h4 className="col-lg-4 fw-bold">ตำเเหน่ง:</h4>
                        <h4 className="col-lg ">{data[0].mo_position}</h4>
                      </div>
                    </div>
                    <div className="form-group col-lg-6 mb-4">
                      <div className="row">
                        <h4 className="col-lg-3 fw-bold">สถานที่ทำงาน:</h4>
                        <h4 className="col-lg ">{data[0].mo_workplace}</h4>
                      </div>
                    </div>
                  </div>

                  <div className="form-group  mb-4">
                    <div className="row">
                      <h4 className="col-lg-3 fw-bold">
                        เบอร์โทรศัพท์ของสถานที่ทำงาน:
                      </h4>
                      <h4 className="col-lg ">{data[0].mo_WPphone}</h4>
                    </div>
                  </div>
                  {local.data.statusUname == "เจ้าหน้าที่" ? (
                    <div className="form-group mb-4">
                      <div className="col-sm-12">
                        <Link
                          to={config.BASE_HOST + `updateFaAndMo/${data[0].id}`}
                          className="btn btn-success"
                        >
                          เเก้ไขข้อมูล
                        </Link>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default mainFaAndMo;
