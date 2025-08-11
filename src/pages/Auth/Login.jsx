import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";

const Login = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const savedUsers = JSON.parse(localStorage.getItem("studyBuddyUsers")) || [];

    const matchedUser = savedUsers.find(
      (user) =>
        user.username === data.username
      &&
        user.password === data.password
    );

    if (matchedUser) {
      toast.success("Login successful!");
      navigate("/home");
    } else {
      toast.error("Invalid user Or User not Registerd!");
    }

    reset();
  };

  return (
    <div className="login-container">
      <h2>Login to StudyBuddy</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && <p className="error">{errors.username.message}</p>}

        <input
          {...register("password", { required: "Password is required" })}
          type="password"
          placeholder="Password"
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <button type="submit">Login</button>
        <p>
          Not registered? <Link to="/register">Create account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
