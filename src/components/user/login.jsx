import React from "react";
import agents from "../../app/api/agent";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { router } from "../../routes/Routes";
import { RoutePath } from "../../constants/RoutePath";

const LoginScreen = () => {
  var navigate = useNavigate();

  const submitLogin = async (value) => {
    console.log(value);
    try {
      let response = await agents.User.login({
        username: value.username,
        password: value.password,
      });
      getUserData(response.token);
      console.log(response);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ข้อมูลผิดพลาด",
        text: "กรุณาตรวจสอบชื่อเข้าใช้งานเเละรหัสผ่าน",
      });
    }
  };

  const getUserData = async (token) => {
    console.log(token);
    try {
      let response = await agents.User.getCurrentUser(token);
      console.log(response);
      if (response.statusCode == 200) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(response));
        router.navigate(RoutePath.specsUser);
      } else {
        return console.log("ไม่พบข้อมูล");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="limiter">
      <Formik
        initialValues={{ username: "", password: "" }}
        validate={(value) => {
          const error = {};
          if (!value.username) {
            error.username = "กรุณากรอกชื่อเข้าใช้งาน";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.username)
          ) {
            error.username = "กรอกรูปเเบบอีเมลเท่านั้น";
          }

          if (!value.password) {
            error.password = "กรุณากรอกรหัสผ่าน";
          }
          return error;
        }}
        onSubmit={submitLogin}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <div
            className="container-login100"
            style={{
              backgroundImage:
                "url('http://tee.kru.ac.th/Cs63/s10/Apppersonel/images/imgs.jpg')",
            }}
          >
            <div className="wrap-login100 p-t-30 p-b-1000">
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <span className="login100-form-title p-b-41">
                เข้าสู่ระบบบุคลากร
              </span>
              <form
                onSubmit={handleSubmit}
                className="login100-form validate-form p-b-33 p-t-5"
              >
                <div
                  className="wrap-input100 validate-input"
                  data-validate="Enter username"
                >
                  <input
                    className="input100"
                    type="text"
                    name="username"
                    placeholder="ชื่อเข้าใช้งาน"
                    onChange={handleChange}
                    value={values.username}
                  />
                  <span
                    className="focus-input100"
                    data-placeholder="&#xe82a;"
                  ></span>
                </div>
                <p className="text-danger text-center">
                  {errors.username && touched.username && errors.username}
                </p>
                <div
                  className="wrap-input100 validate-input"
                  data-validate="Enter password"
                >
                  <input
                    className="input100"
                    type="password"
                    name="password"
                    placeholder="รหัสผ่าน"
                    onChange={handleChange}
                    value={values.password}
                  />
                  <span
                    className="focus-input100"
                    data-placeholder="&#xe80f;"
                  ></span>
                </div>
                <p className="text-danger text-center">
                  {errors.password && touched.password && errors.password}
                </p>
                <div className="container-login100-form-btn m-t-32">
                  <button type="submit" className="login100-form-btn">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default LoginScreen;
