import "./UserRegister.css";
import Layout from "../../components/layout/Layout";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
export default function UserRegister() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    if (!JSON.parse(localStorage.getItem("users"))) {
      if (JSON.parse(localStorage.getItem("admins"))) {
        let admins = JSON.parse(localStorage.getItem("admins"));
        // eslint-disable-next-line array-callback-return
        admins.map((admin) => {
          if (admin.email === data.email) {
            alert("Admin  with the same Email already exists");
          } else {
            data.role = "user";
            localStorage.setItem("users", JSON.stringify([data]));
            navigate("/");
          }
        });
      } else {
        data.role = "user";
        localStorage.setItem("users", JSON.stringify([data]));
        navigate("/");
      }
    } else {
      let users = JSON.parse(localStorage.getItem("users"));
      // eslint-disable-next-line array-callback-return
      users.map((user) => {
        if (user.email === data.email) {
          alert("User  with the same Email already exists");
        } else {
          let admins = JSON.parse(localStorage.getItem("admins"));
          // eslint-disable-next-line array-callback-return
          admins.map((admin) => {
            if (admin.email === data.email) {
              alert("Admin  with the same Email already exists");
            } else {
              data.role = "user";
              users.push(data);
              localStorage.setItem("users", JSON.stringify(users));
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
        <div className="user-reg">
          <h4>User Registration Form</h4>
          <br />
          <hr />
          <br />
          <div className="user-form">
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
            <label>Education</label>
            <select {...register("edu", { required: "Education is Required" })}>
              <option disabled selected>
                Please select
              </option>
              <option value={"Bachelor"}>Bachelor</option>
              <option value={"Master"}>Master</option>
              <option value={"PHD"}>PHD</option>
              <option value={"UnderGraduate"}>UnderGraduate</option>
            </select>
            <label>Gender</label>
            <div className="radio">
              <div>
                <input
                  {...register("gender", { required: "Gender is Required" })}
                  id="f"
                  type="radio"
                  name="gender"
                  value={"Female"}
                />
                <label htmlFor="f">&nbsp;Female</label>
              </div>
              <div>
                <input
                  {...register("gender", { required: "Gender is Required" })}
                  id="m"
                  type="radio"
                  name="gender"
                  value={"Male"}
                />
                <label htmlFor="m">&nbsp;Male</label>
              </div>
            </div>
            {errors.gender && (
              <span className="error">{errors.gender.message}</span>
            )}
            <label>Address</label>
            <textarea
              {...register("address", { required: "Address is Required" })}
            />
            <br />
            {errors.address && (
              <span className="error">{errors.address.message}</span>
            )}
            <br />
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
