import { Link } from "react-router-dom";
import "./Signin.css";
import { useForm } from "react-hook-form";
import Layout from "../../components/layout/Layout.js";
import { useContext } from "react";
import { Context } from "../../App";
export default function Signin() {
  const { setIsSigned, setCurrentUser } = useContext(Context);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    let r = false;
    if (JSON.parse(localStorage.getItem("users"))) {
      let users = JSON.parse(localStorage.getItem("users"));

      // eslint-disable-next-line array-callback-return
      users.map((user) => {
        if (user.email === data.email) {
          if (user.password === data.password) {
            // console.log("passU");
            setIsSigned(true);
            setCurrentUser(user);
            localStorage.setItem("isSigned", JSON.stringify(true));
            localStorage.setItem("currentUser", JSON.stringify(user));
          } else {
            alert("check your email or password ");
          }
          r = true;
        }
      });
    }
    if (!r) {
      if (JSON.parse(localStorage.getItem("admins"))) {
        let admins = JSON.parse(localStorage.getItem("admins"));

        // eslint-disable-next-line array-callback-return
        admins.map((admin) => {
          if (admin.email === data.email) {
            if (admin.password === data.password) {
              // console.log("passA");
              setIsSigned(true);
              setCurrentUser(admin);
              localStorage.setItem("isSigned", JSON.stringify(true));
              localStorage.setItem("currentUser", JSON.stringify(admin));
            } else {
              alert("check your email or password ");
            }
          } else {
            alert("User not Found !! ");
          }
        });
      }
    }
    if (
      !JSON.parse(localStorage.getItem("admins")) &&
      !JSON.parse(localStorage.getItem("users"))
    ) {
      alert("User not found !!");
    }
    reset();
  };
  return (
    <>
      <Layout />
      <div className="signin-card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <br /> <h6>Complaints Management Portal</h6>
          <input
            {...register("email", { required: "Email is Required" })}
            type="email"
            placeholder="Email"
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
          <input
            {...register("password", { required: "Password is Required" })}
            type="password"
            placeholder="Passwaord"
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
          <button type="submit">Login</button>
          <p>
            Not Registered?{" "}
            <Link to="/signupUser"> Create Customer Account</Link>
          </p>
          <p>
            <Link to="/signupAdmin">Create Admin Account</Link>
          </p>
        </form>
      </div>
    </>
  );
}
