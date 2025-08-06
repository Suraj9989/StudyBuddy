import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("studyBuddyUsers")) || [];
    const userExists = users.some((user) => user.email === data.email);

    if (userExists) {
      toast.error("User already registered with this email");
    } else {
      users.push(data);
      localStorage.setItem("studyBuddyUsers", JSON.stringify(users));
      toast.success("Registration successful!");
      navigate("/login");
    }
  };

  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && <p className="error">{errors.username.message}</p>}

        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[\w.-]+@(mail|gmail)\.com$/,
              message: "Only @mail.com or @gmail.com allowed",
            },
          })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/,
              message:
                "Must include 1 capital, 1 number, 1 symbol, and be 6+ chars",
            },
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
};

export default Register;
