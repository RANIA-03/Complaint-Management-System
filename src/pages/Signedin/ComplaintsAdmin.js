import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import SignedinLayout from "../../components/layout/SignedinLayout";
import "./ComplaintsAdmin.css";
import { Context } from "../../App";
export default function ComplaintsAdmin() {
  const { currentUser } = useContext(Context);
  const getFormSubmitHandler = (id) => {
    return (data) => {
      onSubmit(data, id);
    };
  };
  const closeModalHundler = () => {
    setClicked(false);
  };
  const { register, handleSubmit } = useForm();
  let complaints = JSON.parse(localStorage.getItem("complaints"));
  const onSubmit = (data, id) => {
    console.log(id, data);
    // eslint-disable-next-line array-callback-return
    complaints.map((complaint) => {
      if (complaint.id === id) {
        complaint.status = data.status;
        localStorage.setItem("complaints", JSON.stringify(complaints));
      }
    });
  };

  const [clickedComplaint, setClickedComplaint] = useState(null);
  const [clicked, setClicked] = useState(false);

  const handleRowClick = (complaint) => {
    setClickedComplaint(complaint);
    setClicked(true);
  };
  return (
    <>
      <SignedinLayout />
      <div className="user">
        <div></div>
        <div className="container">
          {!clicked ? (
            <>
              <h3>All Complaints</h3>
              <br />
              <table>
                <thead>
                  <tr>
                    <th>SUBJECT</th>
                    <th>COMPLAINT TYPE</th>
                    <th>COMPLAINT ID</th>
                    <th>SEVERITY</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={"5"}>
                      <hr />
                    </td>
                  </tr>
                  {complaints &&
                    // eslint-disable-next-line array-callback-return
                    complaints.map((complaint, index) => {
                      return (
                        <tr
                          className="trData"
                          key={complaint.id}
                          onClick={() => handleRowClick(complaint)}
                        >
                          <td className="blueC">{complaint.subject}</td>
                          <td>{complaint.complaintType}</td>
                          <td className="blueC">{complaint.id}</td>
                          <td>{complaint.severity}</td>
                          <td className="status">{complaint.status}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </>
          ) : (
            <div className="viewData">
              {clickedComplaint && (
                <div className="complaint-data">
                  <h3>Complaint Details</h3>
                  <h5>SUBJECT</h5>
                  <h5>STATUS</h5>
                  <h6>{clickedComplaint.subject}</h6>
                  <h6>{clickedComplaint.status}</h6>
                  <h5>COMPLAINT ID</h5>
                  <h5>SEVERITY</h5>
                  <h6>{clickedComplaint.id}</h6>
                  <h6>{clickedComplaint.severity}</h6>
                  <h5>COMPLAINT TYPE</h5>
                  <h5>OPEND BY</h5>
                  <h6>{clickedComplaint.complaintType}</h6>
                  <h6>{currentUser.email}</h6>
                  <h5>DETAILS</h5>

                  <h6>{clickedComplaint.subject}</h6>

                  {/* <h4></h4>
                  <p>Complaint Type: {clickedComplaint.complaintType}</p>
                  <p>Complaint ID: {clickedComplaint.id}</p>
                  <p>Severity: {clickedComplaint.severity}</p> */}
                </div>
              )}
              <form
                onSubmit={handleSubmit(
                  getFormSubmitHandler(clickedComplaint.id)
                )}
              >
                <select {...register("status")}>
                  <option disabled>Please select</option>
                  <option value={"Accepted"}>Accepted</option>
                  <option value={"Rejected"}>Rejected</option>
                  <option value={"Pending"}>Pending</option>
                </select>
                <button onClick={closeModalHundler}>Close</button>
                <button type="submit">Update</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
