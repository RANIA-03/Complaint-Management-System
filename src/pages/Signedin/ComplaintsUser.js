import { useContext } from "react";
import SignedinLayout from "../../components/layout/SignedinLayout";
import { Context } from "../../App";
import "./ComplaintsUser.css";
export default function ComplaintsUser() {
  const { currentUser } = useContext(Context);

  let complaints = JSON.parse(localStorage.getItem("complaints"));
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
          <h3>All Complaints</h3>
          <br />
          <table>
            <tr>
              <th>SUBJECT</th>
              <th>COMPLAINT TYPE</th>
              <th>COMPLAINT ID</th>
              <th>SEVERITY</th>
              <th>STATUS</th>
            </tr>
            <tr>
              <td colspan={"5"}>
                <hr />
              </td>
            </tr>
            {complaints &&
              // eslint-disable-next-line array-callback-return
              complaints.map((complaint, index) => {
                if (complaint.email === currentUser.email) {
                  return (
                    <tr key={index}>
                      <td className="blueC">{complaint.subject}</td>
                      <td>{complaint.complaintType}</td>
                      <td className="blueC">{complaint.id}</td>
                      <td>{complaint.severity}</td>
                      <td className="status">Pending</td>
                    </tr>
                  );
                }
              })}
          </table>
        </div>
      </div>
    </>
  );
}
