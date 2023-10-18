import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BaseURL } from "../../app/api/agent";
import { Image } from "antd";
import { config } from "../../constants/config";

const specsUser = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    var json = localStorage.getItem("user");
    console.log(JSON.parse(json));
    setUser(JSON.parse(json));
  };
  const DateTH = (date) =>
    Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(Date.parse(date));

  const actions = [
    {
      title: "ประวัติการศึกษา",
      image: config.BASE_HOST + "images/111.jpg",
      path: config.BASE_HOST + "mainEducationByUserId",
    },
    {
      title: "ประวัติการทำงาน",
      image: config.BASE_HOST + "images/111.jpg",
      path: config.BASE_HOST + "mainwork",
    },
    {
      title: "ประวัติการถูกจับหรือการฟ้องศาล",
      image: config.BASE_HOST + "images/111.jpg",
      path: config.BASE_HOST + "mainarrest",
    },
    {
      title: "ประวัติบิดาเเละมารดา",
      image: config.BASE_HOST + "images/111.jpg",
      path: config.BASE_HOST + "mainFaAndMo",
    },
    {
      title: "ประวัติการสมรส",
      image: config.BASE_HOST + "images/111.jpg",
      path: config.BASE_HOST + "mainmarriage",
    },
    {
      title: "ประวัติของบุตร",
      image: config.BASE_HOST + "images/111.jpg",
      path: config.BASE_HOST + "mainchild",
    },
    {
      title: "ประวัติกิจกรรมพิเศษ",
      image: config.BASE_HOST + "images/111.jpg",
      path: config.BASE_HOST + "mainactivity",
    },
    {
      title: "ประวัติการเดินทางไปต่างประเทศ",
      image: config.BASE_HOST + "images/111.jpg",
      path: config.BASE_HOST + "maintarvel",
    },
    {
      title: "ประวัติตำเเหน่งบริหาร",
      image: config.BASE_HOST + "images/111.jpg",
      path: config.BASE_HOST + "mainManagePos",
    },
    {
      title: "ประวัติตำเเหน่งทางวิชาการ",
      image: config.BASE_HOST + "images/111.jpg",
      path: config.BASE_HOST + "mainAcademic",
    },
    {
      title: "ประวัติการเลื่อนขั้นเงินเดือน",
      image: config.BASE_HOST + "images/111.jpg",
      path: config.BASE_HOST + "mainSalary",
    },
    {
      title: "ประวัติเครื่องราชอิสริยาภรณ์",
      image: config.BASE_HOST + "images/111.jpg",
      path: config.BASE_HOST + "mainingisnia",
    },
    {
      title: "ประวัติอยู่อาศัย",
      image: config.BASE_HOST + "images/111.jpg",
      path: config.BASE_HOST + "mainAddress",
    },
    {
      title: "ประวัติการลา",
      image: config.BASE_HOST + "images/111.jpg",
      path: config.BASE_HOST + "mainLeave",
    },
  ];
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
            <div className="col-lg-6 col-md-4 col-sm-4 col-xs-12">
              <h4 className="page-title">
                ประวัติส่วนตัวของ {user.data.titlename} {user.data.user_name}{" "}
                {user.data.user_lastname}
              </h4>
            </div>
            <div className="col-lg-9 col-sm-8 col-md-8 col-xs-12">
              <div className="d-md-flex">
                <ol className="breadcrumb ms-auto">
                  <li>
                    <a href="#" className="fw-normal"></a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <br></br>

        <form className="form-horizontal form-material">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-4 col-xlg-3 col-md-12">
                <div className="white-box">
                  <div className="text-center">
                    {user.data.field ? (
                      <Image
                        width={274}
                        height={274}
                        alt="user"
                        src={config.BASE_IMAGE + user.data.field}
                      />
                    ) : (
                      <img
                        src="/public/images/image5.png"
                        width={274}
                        height={274}
                        alt="homepage"
                      />
                    )}
                    <br></br>
                    <br></br>
                    <h3>{user.data.email}</h3>

                    <div className="overlay-box">
                      <div className="user-content">
                        <a>
                          <br></br>
                          <div className="form-group col-md-12 border-bottom p-0"></div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-xlg-9 col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="form-group row align-items-center">
                      <div className="form-group col-lg-2 mb-4">
                        <label className="col-sm-12">คำนำหน้า</label>

                        <div className="col-sm-12 border-bottom">
                          <h5>{user.data.titlename}</h5>
                        </div>
                      </div>

                      <div className="col-lg-5 mb-4">
                        <label className="col-md-6 p-0">ชื่อ</label>
                        <div className="col-md-12 border-bottom p-0">
                          <h5>{user.data.user_name}</h5>
                        </div>
                      </div>
                      <div className="col-lg-5 mb-4">
                        <label className="col-md-12 p-0">นามสกุล</label>
                        <div className="col-md-12 border-bottom p-0">
                          <h5>{user.data.user_lastname}</h5>
                        </div>
                      </div>
                    </div>

                    <div className="row align-items-center">
                      <div className="form-group col-lg-6 mb-4">
                        <label className="col-sm-12">เพศ</label>

                        <div className="col-sm-12 border-bottom">
                          <h5>{user.data.sexname}</h5>
                        </div>
                      </div>
                      <div className="form-group col-lg-6 mb-4">
                        <label className="col-sm-12 ">ประเภทบุคลากร</label>

                        <div className="col-sm-12 border-bottom">
                          <h5>{user.data.statusUname}</h5>
                        </div>
                      </div>
                    </div>

                    <div className="form-group row align-items-center">
                      <div className="col-lg-4 mb-4">
                        <label className="col-md-6 p-0">เลขบัตรประชาชน</label>
                        <div className="col-md-12 border-bottom p-0">
                          <h5>{user.data.user_cardnumber}</h5>
                        </div>
                      </div>
                      <div className="col-lg-4 mb-4">
                        <label className="col-md-12 p-0">วันเดือนปีเกิด</label>
                        <div className="col-md-12 border-bottom p-0">
                          <h5>{DateTH(user.data.user_birthdate)}</h5>
                        </div>
                      </div>
                      <div className="form-group col-lg-4 mb-4">
                        <label className="col-md-12 p-0">สถานที่เกิด</label>
                        <div className="col-md-12 border-bottom p-0">
                          <h5>{user.data.user_placeofbirth}</h5>
                        </div>
                      </div>
                    </div>

                    <div className="form-group row align-items-center">
                      <div className="col-lg-4 mb-4">
                        <label className="col-md-6 p-0">เชื้อชาติ</label>
                        <div className="col-md-12 border-bottom p-0">
                          <h5>{user.data.user_race}</h5>
                        </div>
                      </div>
                      <div className="col-lg-4 mb-4">
                        <label className="col-md-12 p-0">สัญชาติ</label>
                        <div className="col-md-12 border-bottom p-0">
                          <h5>{user.data.user_nationality}</h5>
                        </div>
                      </div>
                      <div className="form-group col-lg-4 mb-4">
                        <label className="col-md-12 p-0">ศาสนา</label>
                        <div className="col-md-12 border-bottom p-0">
                          <h5>{user.data.user_religion}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="page-wrapper">
        <div className="page-breadcrumb  mx-2">
          <div className="row justify-content-center">
            {actions.map((item, i) => (
              <div key={i} className="col-lg-3 col-md-12">
                <div className="white-box col  analytics-info">
                  <div className="text-center">
                    <b className="logo-icon ">
                      <img
                        src={item.image}
                        height={200}
                        width={200}
                        alt="homepage"
                      />
                    </b>
                  </div>
                  <br></br>
                  <h5 className=" text-center fw-bold">{item.title}</h5>
                  <div className="text-center">
                    <Link
                      to={`${item.path}/${user.data.id}`}
                      className="btn btn-danger    waves-effect waves-light text-white"
                    >
                      ข้อมูลเพิ่มเติม
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <br></br>
      </div>
      <div className="container-fluid">
        <div className="container-fluid"></div>
      </div>
    </div>
  );
};

export default specsUser;
