import "./AdminRegister.css";
import Layout from "../../components/layout/Layout.js";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
export default function AdminRegister() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    if (!JSON.parse(localStorage.getItem("admins"))) {
      if (JSON.parse(localStorage.getItem("users"))) {
        let users = JSON.parse(localStorage.getItem("users"));
        // eslint-disable-next-line array-callback-return
        users.map((user) => {
          if (user.email === data.email) {
            alert("Users  with the same Email already exists");
          } else {
            data.role = "admin";
            localStorage.setItem("admins", JSON.stringify([data]));
            navigate("/");
          }
        });
      } else {
        data.role = "admin";
        localStorage.setItem("admins", JSON.stringify([data]));
        navigate("/");
      }
    } else {
      let admins = JSON.parse(localStorage.getItem("admins"));
      // eslint-disable-next-line array-callback-return
      admins.map((admin) => {
        if (admin.email === data.email) {
          alert("Admin  with the same Email already exists");
        } else {
          let users = JSON.parse(localStorage.getItem("users"));
          // eslint-disable-next-line array-callback-return
          users.map((user) => {
            if (user.email === data.email) {
              alert("Users  with the same Email already exists");
            } else {
              data.role = "admin";
              admins.push(data);
              localStorage.setItem("admins", JSON.stringify(admins));
              navigate("/");
            }
          });
        }
      });
    }
    reset();
  };
  return (
    <>
      <Layout />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="admin-reg">
          <h4>Admin Registration Form</h4>
          <br />
          <hr />
          <br />
          <div className="admin-form">
            <label>Full Name</label>
            <input
              {...register("fullName", { required: "Full Name is Required" })}
              type="text"
            />
            {errors.fullName && (
              <span className="error">{errors.fullName.message}</span>
            )}
            <label>Email</label>
            <input
              {...register("email", { required: "Email is Required" })}
              type="email"
            />
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}
            <label>Password</label>
            <input
              {...register("password", { required: "Password is Required" })}
              type="password"
            />
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
            <label>Phone Number</label>
            <input
              {...register("phone", { required: "Phone is Required" })}
              type="tel"
            />
            {errors.phone && (
              <span className="error">{errors.phone.message}</span>
            )}
            <div className="checkbox">
              <input
                {...register("terms", {
                  required: "Agree to terms is Required",
                })}
                id="terms"
                type="checkbox"
              />
              <label htmlFor="terms">&nbsp;Agree to terms conditions</label>
            </div>{" "}
            {errors.terms && (
              <span className="error">{errors.terms.message}</span>
            )}
            <div className="reg">
              <button type="submit">Register</button>
            </div>
            <br />
          </div>
        </div>
      </form>
    </>
  );
}
