import React, { useState} from "react";
import { Spinner } from "@material-tailwind/react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Navbar } from "../components";
import { useCookies } from "react-cookie";
import { useNavigate, Navigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field"),
  password: Yup.string()
    .required("Password is a required field")
    .min(6, "Password must be at least 8 characters"),
});

function App() {
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate(); 

  const notify = () => toast.error('username or password is incorrect', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  })

  function CustomSpinner() {
    return (
      <div className=" fixed w-screen h-screen top-0 left-0 bg-white bg-opacity-50 z-40 flex justify-center items-center">
        <Spinner className="h-16 w-16 text-gray-900/50" />
      </div>
    )
  }
  
  function handleLogin(val) { 
    setLoading(true)
    axios.post('https://fakestoreapi.com/auth/login', {
      username: val.email,
      password: val.password
    })
    .then(response => {
      console.log(response)
      setCookie("user", {token: response.data.token, name: val.email});
      setLoading(false) 
      navigate("/")
    })
    .catch(error => {
      console.error('There was an error!', error.response.data);
      notify()
      setLoading(false) 
    })
  }

  function Form() {
    return (
      <>
      <Navbar />
      { loading ? <CustomSpinner /> : ''}
      <div className=" flex w-full flex-wrap justify-center">
        <h1 className=" text-[24px] block w-full text-center mb-4 ">
          {" "}
          Login{" "}
        </h1>
        <Formik
          validationSchema={schema}
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            handleLogin(values)
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <div className="login flex mx-auto justify-center border p-6 w-full max-w-lg rounded">
              <div className="form w-full">
                <form noValidate onSubmit={handleSubmit}>
                  <div>
                    <label className=" block"> Username </label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Enter username"
                      className=" border-b  border-gray-400 w-full py-2 px-1 text-[14px]"
                      id="email"
                    />
                    <p className="error text-red-600 text-[14px]">
                      {errors.email && touched.email && errors.email}
                    </p>
                  </div>

                  <div>
                    <label className=" block mt-4"> Password </label>
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Enter password"
                      className=" border-b  border-gray-400 w-full py-2 px-1 text-[14px]"
                    />
                    <p className="error text-red-600 text-[14px]">
                      {errors.password && touched.password && errors.password}
                    </p>
                  </div>
                  <button type="submit" className=" mt-6 bg-gray-500 text-white rounded w-full py-2">Login</button>
                </form>
              </div>
            </div>
          )}
        </Formik>
      </div>

      <div className=" max-w-lg mt-4 p-5 bg-gray-100 block mx-auto"> 
        <pre> 
          example: <br />
             username: "mor_2314", <br />
             password: "83r5^_"
          
          </pre>
      </div>
      </>
    )
  }

  return (
    <>
      {cookies.user ? (<Navigate replace to={"/"} />) : (<Form />) }

      <ToastContainer />
    </>
  );
}

export default App;
