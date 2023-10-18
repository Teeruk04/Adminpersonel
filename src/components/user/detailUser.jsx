import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import agent, { BaseURL } from "../../app/api/agent";
import { router } from "../../routes/Routes";
import { config } from "../../constants/config";

const detailUser = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  const actions = [
    {
      title: "ประวัติการศึกษา",
      image: config.BASE_HOST + "/images/111.jpg",
      path: config.BASE_HOST + "mainEducationByUserId",
    },
    {
      title: "ประวัติการทำงาน",
      image: config.BASE_HOST + "/images/111.jpg",
      path: config.BASE_HOST + "mainwork",
    },
    {
      title: "ประวัติการถูกจับหรือการฟ้องศาล",
      image: config.BASE_HOST + "/images/111.jpg",
      path: config.BASE_HOST + "mainarrest",
    },
    {
      title: "ประวัติบิดาเเละมารดา",
      image: config.BASE_HOST + "/images/111.jpg",
      path: config.BASE_HOST + "mainFaAndMo",
    },
    {
      title: "ประวัติการสมรส",
      image: config.BASE_HOST + "/images/111.jpg",
      path: config.BASE_HOST + "mainmarriage",
    },
    {
      title: "ประวัติของบุตร",
      image: config.BASE_HOST + "/images/111.jpg",
      path: config.BASE_HOST + "mainchild",
    },
    {
      title: "ประวัติกิจกรรมพิเศษ",
      image: config.BASE_HOST + "/images/111.jpg",
      path: config.BASE_HOST + "mainactivity",
    },
    {
      title: "ประวัติการเดินทางไปต่างประเทศ",
      image: config.BASE_HOST + "/images/111.jpg",
      path: config.BASE_HOST + "maintarvel",
    },
    {
      title: "ประวัติตำเเหน่งบริหาร",
      image: config.BASE_HOST + "/images/111.jpg",
      path: config.BASE_HOST + "mainManagePos",
    },
    {
      title: "ประวัติตำเเหน่งทางวิชาการ",
      image: config.BASE_HOST + "/images/111.jpg",
      path: config.BASE_HOST + "mainAcademic",
    },
    {
      title: "ประวัติการเลื่อนขั้นเงินเดือน",
      image: config.BASE_HOST + "/images/111.jpg",
      path: config.BASE_HOST + "mainSalary",
    },
    {
      title: "ประวัติเครื่องราชอิสริยาภรณ์",
      image: config.BASE_HOST + "/images/111.jpg",
      path: config.BASE_HOST + "mainingisnia",
    },
    {
      title: "ประวัติอยู่อาศัย",
      image: config.BASE_HOST + "/images/111.jpg",
      path: config.BASE_HOST + "mainAddress",
    },
    {
      title: "ประวัติการลา",
      image: config.BASE_HOST + "/images/111.jpg",
      path: config.BASE_HOST + "mainLeave",
    },
  ];

  useEffect(() => {
    if (id) getUserById();
  }, []);

  const getUserById = async () => {
    const result = await agent.User.getUserId(id);
    console.log(result);
    setData(result);
  };

  const DateTH = (date) =>
    Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(Date.parse(date));

  if (!data)
    return (
      <>
        <h1>fsdfsdf</h1>
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
            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
              <h4 className="page-title">
                ข้อมูลของ {data.titlename} {data.user_name} {data.user_lastname}
              </h4>
            </div>
            <div className="col-lg-9 col-sm-8 col-md-8 col-xs-12">
              <div className="d-md-flex">
                <ol className="breadcrumb ms-auto">
                  <li>
                    <a href="#" className="fw-normal"></a>
                  </li>
                </ol>
                <Link
                  onClick={() => router.navigate(-1)}
                  // target="_blank" ลิงค์เปิดเเท็ปใหม่
                  className="btn btn-danger  d-none d-md-block pull-right ms-3 hidden-xs hidden-sm waves-effect waves-light text-white"
                >
                  ย้อนกลับ
                </Link>
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
                    {data.field ? (
                      <img
                        width={274}
                        height={274}
                        alt="user"
                        src={BaseURL + data.field}
                      />
                    ) : (
                      <img
                        src={config.BASE_HOST + "images/image5.png"}
                        width={274}
                        height={274}
                        alt="homepage"
                      />
                    )}
                    <br></br>
                    <br></br>
                    <h3>{data.email}</h3>

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
                          <h5>{data.title.title_name}</h5>
                        </div>
                      </div>

                      <div className="col-lg-5 mb-4">
                        <label className="col-md-6 p-0">ชื่อ</label>
                        <div className="col-md-12 border-bottom p-0">
                          <h5>{data.user_name}</h5>
                        </div>
                      </div>
                      <div className="col-lg-5 mb-4">
                        <label className="col-md-12 p-0">นามสกุล</label>
                        <div className="col-md-12 border-bottom p-0">
                          <h5>{data.user_lastname}</h5>
                        </div>
                      </div>
                    </div>

                    <div className="row align-items-center">
                      <div className="form-group col-lg-6 mb-4">
                        <label className="col-sm-12">เพศ</label>

                        <div className="col-sm-12 border-bottom">
                          <h5>{data.sex.sex_name}</h5>
                        </div>
                      </div>
                      <div className="form-group col-lg-6 mb-4">
                        <label className="col-sm-12">ประเภทบุคลากร</label>

                        <div className="col-sm-12 border-bottom">
                          <h5>{data.statusU.statusU_name}</h5>
                        </div>
                      </div>
                    </div>

                    <div className="form-group row align-items-center">
                      <div className="col-lg-4 mb-4">
                        <label className="col-md-6 p-0">เลขบัตรประชาชน</label>
                        <div className="col-md-12 border-bottom p-0">
                          <h5>{data.user_cardnumber}</h5>
                        </div>
                      </div>
                      <div className="col-lg-4 mb-4">
                        <label className="col-md-12 p-0">วันเดือนปีเกิด</label>
                        <div className="col-md-12 border-bottom p-0">
                          <h5>{DateTH(data.user_birthdate)}</h5>
                        </div>
                      </div>
                      <div className="form-group col-lg-4 mb-4">
                        <label className="col-md-12 p-0">สถานที่เกิด</label>
                        <div className="col-md-12 border-bottom p-0">
                          <h5>{data.user_placeofbirth}</h5>
                        </div>
                      </div>
                    </div>

                    <div className="form-group row align-items-center">
                      <div className="col-lg-4 mb-4">
                        <label className="col-md-6 p-0">เชื้อชาติ</label>
                        <div className="col-md-12 border-bottom p-0">
                          <h5>{data.user_race}</h5>
                        </div>
                      </div>
                      <div className="col-lg-4 mb-4">
                        <label className="col-md-12 p-0">สัญชาติ</label>
                        <div className="col-md-12 border-bottom p-0">
                          <h5>{data.user_nationality}</h5>
                        </div>
                      </div>
                      <div className="form-group col-lg-4 mb-4">
                        <label className="col-md-12 p-0">ศาสนา</label>
                        <div className="col-md-12 border-bottom p-0">
                          <h5>{data.user_religion}</h5>
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
                  <h5 className=" text-center ">{item.title}</h5>
                  <div className="text-center">
                    <Link
                      to={`${item.path}/${data.id}`}
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

export default detailUser;
