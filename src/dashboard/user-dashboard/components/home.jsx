import "../styles/home.css"

//importing components
import Alerts from "./alert";
import Weather from "./weather";

const UserHome = () => {
    return(
        <>
        <label htmlFor="#" className="content-header">Dashboard</label>
        <div className="dashboard-home">
            <div className="left">
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
                <Alerts />
            </div>
            <div className="right">
                <Weather />

                <div className="news-container">
                    <label className="internal-div-headers">Trending News</label>
                    <div className="scrollable-div">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <small className="news-source text-muted">CNBC Business</small>
                            <p className="news-description">Prices for fertilizer will reduce with new tax regulations</p>
                        </li>
                        <li className="list-group-item">
                            <small className="news-source text-muted">weather.com</small>
                            <p className="news-description">Better be prepared, Strong winds are forecasted for next week</p>
                        </li>
                        <li className="list-group-item">
                            <small className="news-source text-muted">CNBC Business</small>
                            <p className="news-description">Prices for fertilizer will reduce with new tax regulations</p>
                        </li>
                        <li className="list-group-item">
                            <small className="news-source text-muted">CNBC Business</small>
                            <p className="news-description">Prices for fertilizer will reduce with new tax regulations</p>
                        </li>
                        
                    </ul>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default UserHome;