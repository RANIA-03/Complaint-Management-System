import { Link } from "react-router-dom";
import "./Layout.css";
export default function Layout() {
  return (
    <div>
      <div className="main-nav">
        <div className="leftSide">
          <h3>ABC</h3>
          <p>&nbsp;&nbsp;Complaints Management Portal</p>
        </div>
        <div className="rightSide">
          <Link to="/" className="sign-in">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
