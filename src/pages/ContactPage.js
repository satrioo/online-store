import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Navbar } from "../components";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Must be in email format"),
  subject: Yup.string().required("Subject is a required field"),
  description: Yup.string().required("Description is a required field"),
});

export default function App() {
  function handleSubmit(val) {
    const link = document.createElement("a");
    link.href = `mailto:${val.email}?subject=${val.subject}&body=${val.description}`;
    link.click();
  }
  return (
    <div>
      <Navbar />
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", subject: "", description: "" }}
        onSubmit={(values) => {
          handleSubmit(values);
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
          <div className=" max-w-screen-xl block mx-auto px-8 contact">
            <h1 className=" text-gray-500 font-semibold text-[20px] text-center">
              {" "}
              Contact{" "}
            </h1>
            <form
              className="App md:w-1/2 w-full mx-auto border mt-5 p-6 rounded"
              onSubmit={handleSubmit}
            >
              <div>
                <label>Email </label>
                <input
                  id="email"
                  type="text"
                  placeholder="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <p className="error text-red-600 text-[14px]">
                  {errors.email && touched.email && errors.email}
                </p>
              </div>
              <div>
                <label>Subject </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="subject"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.subject}
                />
                <p className="error text-red-600 text-[14px]">
                  {errors.subject && touched.subject && errors.subject}
                </p>
              </div>
              <div>
                <label>Description </label>
                <textarea
                  id="description"
                  placeholder="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
                <p className="error text-red-600 text-[14px]">
                  {errors.description &&
                    touched.description &&
                    errors.description}
                </p>
              </div>
              <button
                type="submit"
                className=" bg-gray-500 text-white w-full p-2"
              >
                Send email
              </button>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
}
