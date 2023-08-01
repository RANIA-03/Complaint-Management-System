import "./CreateComplaint.css";
import SignedinLayout from "../../components/layout/SignedinLayout";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Context } from "../../App";
import { useContext } from "react";
export default function CreateComplaint() {
  const { currentUser } = useContext(Context);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (!JSON.parse(localStorage.getItem("complaints"))) {
      data.email = currentUser.email;
      data.id = Math.floor(Math.random() * 1000000);
      data.status = "Pending";
      localStorage.setItem("complaints", JSON.stringify([data]));
      navigate("/user");
    } else {
      let complaints = JSON.parse(localStorage.getItem("complaints"));
      data.email = currentUser.email;
      data.status = "Pending";
      data.id = Math.floor(Math.random() * 1000000);
      complaints.push(data);
      localStorage.setItem("complaints", JSON.stringify(complaints));
      navigate("/user");
    }
  };
  return (
    <>
      <SignedinLayout />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="create-comp">
          <h4>Create Complain</h4>
          <br />
          <hr />
          <br />
          <div className="create">
            <label>Complaint Type</label>
            <select
              {...register("complaintType", {
                required: "Complaint Type is Required",
              })}
            >
              <option disabled>Please select</option>
              <option value={"Account"}>Account</option>
              <option value={"Technical"}>Technical</option>
              <option value={"Profile"}>Profile</option>
            </select>{" "}
            {errors.complaintType && (
              <span className="error">{errors.complaintType.message}</span>
            )}
            <label>Subject</label>
            <input
              {...register("subject", {
                required: "Subject is Required",
              })}
              type="text"
            />
            {errors.subject && (
              <span className="error">{errors.subject.message}</span>
            )}
            <label>Severity</label>
            <select
              {...register("severity", {
                required: "Severity is Required",
              })}
            >
              <option disabled>Please select</option>
              <option value={"low"}>Low</option>
              <option value={"medium"}>Medium</option>
              <option value={"high"}>High</option>
            </select>
            {errors.severity && (
              <span className="error">{errors.severity.message}</span>
            )}
            <label>Description</label>
            <textarea
              {...register("description", {
                required: "Description is Required",
              })}
            />
            {errors.description && (
              <span className="error">{errors.description.message}</span>
            )}
            <br />
            <label>Preferred Contact Language</label>
            <div className="radio">
              <div>
                <input
                  {...register("language", {
                    required: "Language is Required",
                  })}
                  value={"arabic"}
                  id="a"
                  type="radio"
                  name="language"
                />
                <label htmlFor="a">&nbsp;Arabic</label>
              </div>
              <div>
                <input
                  {...register("language", {
                    required: "Language is Required",
                  })}
                  value={"english"}
                  id="e"
                  type="radio"
                  name="language"
                />
                <label htmlFor="e">&nbsp;English</label>
              </div>
              {errors.language && (
                <span className="error">{errors.language.message}</span>
              )}
            </div>
            <div className="checkbox">
              <input
                {...register("terms", {
                  required: "Agree to terms is Required",
                })}
                id="terms"
                type="checkbox"
              />
              <label htmlFor="terms">&nbsp;Agree to terms conditions</label>
            </div>
            {errors.terms && (
              <span className="error">{errors.terms.message}</span>
            )}
            <div className="reg">
              <button type="submit">Create</button>
            </div>
            <br />
          </div>
        </div>
      </form>{" "}
    </>
  );
}
