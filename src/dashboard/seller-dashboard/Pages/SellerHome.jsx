import { Home } from "../Components/home";

import "../styles/home.css"

const SellerHome = () => {
  return (
    <>
    <div className="highlights-container">
      <div className="highlight customers">
          <div className="header">Customers</div>
          <div className="content">
              <span className="totalCustomers">35</span>
              <span className="timePeriod">Feb 1 - Apr 21</span>
              <span className="description">
                  <small className="text-success">18.2% increase since last month</small>
              </span>
          </div>
      </div>
      <div className="highlight revenue">
          <div className="header">Revenue</div>
          <div className="content">
              <span className="totalRevenue">Rs 1,50,000</span>
              <span className="timePeriod">Feb 1 - Apr 21</span>
              <span className="description">
                  <small className="text-success">14.7% increase since last month</small>
              </span>
          </div>
      </div>
      <div className="highlight orders">
          <div className="header">Orders</div>
          <div className="content">
              <span className="total_orders">
                  <p>150</p>
                  <small>orders</small>
              </span>
              <span className="timePeriod">Feb 1 - Apr 21</span>
              <span className="description">
                  <small className="text-danger">-5.4% decrease since last month</small>
              </span>
          </div>
      </div>
    </div>
    </>
  );
};

export default SellerHome;
