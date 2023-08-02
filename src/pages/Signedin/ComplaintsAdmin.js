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
    // console.log(id, data);
    // eslint-disable-next-line array-callback-return
    complaints.map((complaint) => {
      if (complaint.id === id) {
        complaint.status = data.status;
        complaint.opendBy = currentUser.email;
        localStorage.setItem("complaints", JSON.stringify(complaints));
        setClickedComplaint(complaint);
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
        <div className="container">
          {!clicked ? (
            <>
              <h3>All Complaints</h3>
              <br />{" "}
              <div className="table-container">
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
              </div>
            </>
          ) : (
            <div className="viewData">
              {clickedComplaint && (
                <>
                  <h3>Complaint Details</h3>
                  <br />
                  <div className="complaint-data">
                    <h3>SUBJECT</h3>
                    <h3>STATUS</h3>
                    <h4>{clickedComplaint.subject}</h4>
                    <h4>{clickedComplaint.status}</h4>
                    <h3>COMPLAINT ID</h3>
                    <h3>SEVERITY</h3>
                    <h4>{clickedComplaint.id}</h4>
                    <h4>{clickedComplaint.severity}</h4>
                    <h3>COMPLAINT TYPE</h3>
                    <h3>OPEND BY</h3>
                    <h4>{clickedComplaint.complaintType}</h4>
                    <h4>{currentUser.email}</h4>
                    <h3>
                      DETAILS
                      <h4 className="rr">
                        <br />
                        {clickedComplaint.subject}
                        <br />
                        <br />
                      </h4>
                    </h3>

                    {/* <h3></h3>
                  <p>Complaint Type: {clickedComplaint.complaintType}</p>
                  <p>Complaint ID: {clickedComplaint.id}</p>
                  <p>Severity: {clickedComplaint.severity}</p> */}
                  </div>
                </>
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
                <button type="submit" className="btnU">
                  Update
                </button>
                <div className="btnDiv">
                  <button className="btnC" onClick={closeModalHundler}>
                    Close
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
