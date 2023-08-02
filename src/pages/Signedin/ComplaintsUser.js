import { useContext, useState } from "react";
import SignedinLayout from "../../components/layout/SignedinLayout";
import { Context } from "../../App";
import "./ComplaintsUser.css";
export default function ComplaintsUser() {
  const { currentUser } = useContext(Context);
  let complaints = JSON.parse(localStorage.getItem("complaints"));
  const [clickedComplaint, setClickedComplaint] = useState(null);
  const [clicked, setClicked] = useState(false);
  const closeModalHundler = () => {
    setClicked(false);
  };
  const handleRowClick = (complaint) => {
    setClickedComplaint(complaint);
    setClicked(true);
  };
  return (
    <>
      <SignedinLayout />
      <div className="user">
        <div>
          <p>
            Hello {currentUser.fullName.split(" ")[0]} ({currentUser.email})
          </p>
        </div>
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
                        if (complaint.email === currentUser.email) {
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
                        }
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
                    <h4>{clickedComplaint.opendBy}</h4>
                    <h3>
                      DETAILS
                      <h4 className="rr">
                        <br />
                        {clickedComplaint.subject}
                        <br />
                        <br />
                      </h4>
                    </h3>
                  </div>
                </>
              )}

              <div className="btnDiv">
                <button className="btnC" onClick={closeModalHundler}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
