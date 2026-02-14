import "../styles/sidebar.css";
import { useNavigate } from "react-router-dom";

export const UserSidebar = ({ active }) => {
  const Navigate = useNavigate();

  return (
    <>
      <div className="sidebar">
        <div className="brandLogo">Farmap</div>
        <div className={`sidebar-menu ${active}`}>
          <label htmlFor="#" className="label">
            Reports
          </label>
          <button className="item home" onClick={() => Navigate("/dashboard")}>
            <i className="bi bi-box-seam"></i>
            <p>Dashboard</p>
          </button>
          <button
            className="item operations"
            onClick={() => Navigate("/dashboard/operations")}
          >
            <i className="bi bi-menu-up"></i>
            <p>Operations</p>
          </button>
          <button
            className="item sensors"
            onClick={() => Navigate("/dashboard/sensors")}
          >
            <i className="bi bi-cpu"></i>
            <p>Sensors</p>
          </button>

          <button
            className="item insights"
            data-bs-toggle="collapse"
            data-bs-target="#insightsCollapse"
            onClick={() => Navigate("/dashboard/insights")}
          >
            <i className="bi bi-bar-chart"></i>
            <p>Insights</p>
          </button>

          {/* nested button for insights page */}
          <div className="collapse multi-collapse" id="insightsCollapse">
            <button
              className="item reports"
              onClick={() => Navigate("/dashboard/insights/reports")}
            >
              <i className="bi bi-clipboard2-data"></i>
              <p>Reports</p>
            </button>
          </div>

          <button
            className="item sell"
            onClick={() => Navigate("/dashboard/sell")}
          >
            <i className="bi bi-cart"></i>
            <p>P2P</p>
          </button>
          <button
            className="item disease mb-3"
            onClick={() => Navigate("/dashboard/disease")}
          >
            <i className="bi bi-bug"></i>
            <p>Disease</p>
          </button>

          <label htmlFor="#" className="label">
            Account
          </label>
          <button
            className="item setup"
            onClick={() => Navigate("/dashboard/setup")}
          >
            <i className="bi bi-house-add"></i>
            <p>Manage</p>
          </button>
          <button className="item" onClick={() => Navigate("/")}>
            <i className="bi bi-rss"></i>
            <p>Forum</p>
          </button>
          <div className="dropdown">
            <button data-bs-toggle="dropdown" className="item profile">
              <i className="bi bi-gear"></i>
              <p>Settings</p>
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => Navigate("/dashboard/profile")}
                >
                  Edit profile
                </button>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
