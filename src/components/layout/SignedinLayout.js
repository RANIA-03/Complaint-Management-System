import { useContext } from "react";
import "./SignedinLayout.css";
import { Link } from "react-router-dom";
import { Context } from "../../App";
export default function SignedinLayout() {
  const { currentUser, setCurrentUser, setIsSigned } = useContext(Context);
  const handleSignout = () => {
    setCurrentUser({});
    setIsSigned(false);
    localStorage.setItem("currentUser", JSON.stringify({}));
    localStorage.setItem("isSigned", JSON.stringify(false));
  };
  return (
    <div>
      <div className="main-nav">
        <div className="leftSide">
          <h3>ABC</h3>
          <p>&nbsp;&nbsp;Complaints Management Portal</p>
        </div>
        <div className="rightSide">
          <Link
            to={currentUser.role === "user" ? "/user" : "/admin"}
            className="view"
          >
            View All Complaints&nbsp;&nbsp;&nbsp;
          </Link>
          {currentUser.role === "user" && (
            <Link to="/createComplaint" className="create">
              Create Complaint &nbsp;&nbsp;&nbsp;
            </Link>
          )}
          <Link onClick={handleSignout} to="/" className="sign-out">
            Sign out
          </Link>
        </div>
      </div>
    </div>
  );
}
