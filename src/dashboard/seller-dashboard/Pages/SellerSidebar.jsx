import "../styles/sidebar.css";
import { useNavigate } from "react-router-dom";

export const SellerSidebar = ({ active }) => {
  const Navigate = useNavigate();

  return (
    <>
      <div className="sidebar">
        <div className="brandLogo">Farmap</div>
        <div className={`sidebar-menu ${active}`}>
          <div className="grouped">
            <label htmlFor="#" className="label">
              Home
            </label>
            <button
              className="item home"
              onClick={() => Navigate("/dashboard/seller")}>
              <i className="bi bi-box-seam"></i>
              <p>Dashboard</p>
            </button>

            <button
              className="item p2p"
              onClick={() => Navigate("/dashboard/seller/p2p")}>
              <i className="bi bi-cart"></i>
              <p>P2P</p>
            </button>

            <button
              className="item orders"
              onClick={() => Navigate("/dashboard/seller/orders")} >
              <i className="bi bi-cart"></i>
              <p>Orders</p>
            </button>
          </div>

          <div className="grouped">
            <label htmlFor="#" className="label">
              Account
            </label>

            <button className="item forum-btn" onClick={() => Navigate("/")}>
              <i className="bi bi-rss"></i>
              <p>Forum</p>
            </button>

            <button
              className="item profile"
              onClick={() => Navigate("/dashboard/seller/profile")} >
              <i className="bi bi-gear"></i>
              <p>Profile</p>
            </button>
            <button
              className="item logout"
              onClick={() => {}} >
              <i className="bi bi-box-arrow-right"></i>
              <p>Logout</p>
            </button>
          </div>

        </div>
      </div>
    </>
  );
};
