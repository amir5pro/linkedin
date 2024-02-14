import React from "react";
import { Button, Form, Input, Spin } from "antd";
import { BsLinkedin } from "react-icons/bs";
import { useState } from "react";
import GoogleButton from "react-google-button";
import "./Signup.css";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const [error, setError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);

  const [loading, setLoading] = useState(false);

  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const dispatch = useDispatch();

  if (userInfo) {
    return <Navigate to="/feed/main" />;
  }

  const onFinish = (values) => {
    const isValid = Object.values(values).every(
      (value) => value.trim().length >= 1
    );
    if (isValid) {
      if (values.password.length < 6) {
        setError(true);
      } else if (values.password !== values.confirmPassword) {
        setError(false);
        setConfirmError(true);
      } else {
        setError(false);
        setConfirmError(false);
        setLoading(true);
        createUserWithEmailAndPassword(auth, values.email, values.password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            toast.success(<p>successfully registered</p>);
            return user;
          })
          .then((user) => {
            updateProfile(user, {
              displayName: values.fullName,
            });
            dispatch(
              login({
                email: user.email,
                uid: user.uid,
                displayName: values.fullName,
                profession: values.profession,
              })
            );
          })
          .catch((error) => {
            const errorCode = error.code;
            setLoading(false);
            toast.error(<p>{errorCode}</p>);
          });
      }
      // Proceed with further actions
    } else {
      toast.error(<p>invalid input</p>);
      // Display error message or take appropriate action
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  if (loading) {
    return (
      <div className="loading_container">
        <Spin size="large" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="signUp">
        <div className="signUp_logo">
          <h1>Linked</h1>
          <BsLinkedin size={40} />
        </div>
        <h1 className="invite">Join now -opportunity awaits</h1>
        <Form
          className="signUp_form"
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <label className="label" name="fullName">
            Full name
          </label>
          <Form.Item
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input your full name!",
              },
            ]}
          >
            <Input className="signUp_input" />
          </Form.Item>

          <label className="label" name="Email">
            Email
          </label>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input className="signUp_input" />
          </Form.Item>

          <label name="password">
            {" "}
            {error ? (
              <span className="error">
                Your password should have at least 6 characters
              </span>
            ) : (
              <span className="label">Password (6+ characters)</span>
            )}{" "}
          </label>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password className="signUp_input" />
          </Form.Item>
          <label className="label" name="confirmPassword">
            {confirmError ? (
              <span className="error">Your password doesn't match</span>
            ) : (
              <span className="label">Confirm password</span>
            )}
          </label>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
            ]}
          >
            <Input.Password className="signUp_input" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="signUp_button">
              Sign up
            </Button>
          </Form.Item>
          <div className="signUp_lines">
            <div className="signUp_line line-pre"></div>
            <div className="or">or</div>
            <div className="signUp_line line-after"></div>
          </div>
          <p className="already">
            Already on linkedin?
            <span className="signup_signIn">
              <NavLink to="/">Sign in</NavLink>
            </span>
          </p>
        </Form>
      </div>
      <div className="signUp_footer">
        <Footer />
      </div>
    </>
  );
}

export default Signup;
