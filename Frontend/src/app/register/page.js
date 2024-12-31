"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/Action";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
    username: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    username: Yup.string().required("Username is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form Values:", values);
    const payload = values;
    dispatch(registerUser(payload));
  };
  const { registerData, loading, error } = useSelector((state) => state.auth);
  console.log("registerData", registerData);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="rounded p-8 w-[350px] shadow-[0_0_3px_rgba(0,0,0,0.2)] border border-[#393939]">
        <h1 className="text-white text-3xl font-[cursive] uppercase text-center mb-4">
          Socials
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-white">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter Email Address"
                  className="w-full placeholder:text-sm px-4 py-2 border border-[#393939] bg-[#161616] rounded focus:outline-none"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-white">
                  Username
                </label>
                <Field
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  className="w-full placeholder:text-sm px-4 py-2 border border-[#393939] bg-[#161616] rounded focus:outline-none"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-white">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  className="w-full placeholder:text-sm px-4 py-2 border border-[#393939] bg-[#161616] rounded focus:outline-none"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 mt-7 uppercase bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Register
              </button>
              <div className="mt-10 text-center text-sm">
                Already have an account?{" "}
                <a href="/login" className="!text-blue-500">
                  Login
                </a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
