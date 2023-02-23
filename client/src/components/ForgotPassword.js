import React from "react";
import axios from "axios";
import { TextField, Link } from "@mui/material";
import SubmitButton from "./Buttons/SubmitButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Yup object for client side form validation
const schema = yup.object().shape({
  email: yup
    .string("That doesn't look like an Email Address")
    .email("Email is not Valid")
    .required("An Email Address is required"),
  firstName: yup
    .string("That doesn't look a First Name")
    .required("A First Name is required"),
  lastName: yup
    .string("That doesn't look like a Last Name")
    .required("A Last Name is required"),
  password: yup
    .string("That doesn't look like a strong Password")
    .min(8, "Password must be Min 8 Alpha Numeric")
    .required("Password is required"),
});

function ForgotPassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Forgot form handle
  const submitForm = (data) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/forgotPassword`, data)
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data?.message || 'Password Changed Successfully', {
            position: toast.POSITION.TOP_RIGHT,
          });
          return navigate("/login");
        } else {
          toast.error(response.data?.message || 'Unable to Change Password, Please try again!', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((error) => {
        toast.error(error.response.data?.message || 'Server Down', {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <>
      <section className="vh-100">
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-sm-10 col-md-8 col-lg-4">
              <div className="card shadow" style={{ borderRadius: "0.2rem" }}>
                <div className="card-body p-4 text-center d-flex flex-column align-items-between gap-5">
                  <div className="title">CHANGE PASSWORD</div>
                  <form
                    onSubmit={handleSubmit(submitForm)}
                    className="d-flex flex-column gap-4 align-items-center"
                  >
                    <TextField
                      variant="outlined"
                      type="text"
                      name="email"
                      label="Email id"
                      {...register("email")}
                      helperText={errors.email?.message}
                    />
                    <TextField
                      variant="outlined"
                      type="text"
                      name="firstName"
                      label="First Name"
                      {...register("firstName")}
                      helperText={errors.firstName?.message}
                    />
                    <TextField
                      variant="outlined"
                      type="text"
                      name="lastName"
                      label="Last Name"
                      {...register("lastName")}
                      helperText={errors.lastName?.message}
                    />
                    <TextField
                      variant="outlined"
                      type="password"
                      name="password"
                      label="New Password"
                      helperText={
                        errors.password?.message
                      }
                      {...register("password")}
                    />
                    <SubmitButton>Change</SubmitButton>
                  </form>
                  <div>-OR-</div>
                  <Link href="/login" className="pb-1">
                    Back to Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ForgotPassword;
