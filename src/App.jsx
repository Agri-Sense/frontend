import { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Loading } from "./Routes/loading";

//importing contexts
import { UserContext } from "./context/userContext";
import { UserHomeContextProvider } from "./context/userHome";

//importing Forum and its components
import { Forum } from "./forum/Forum";

//importing dashboard
import { Dashboard } from "./dashboard/dashboard";

//importing dashboard componetns
import { Login } from "./Routes/login";
import { Signup } from "./Routes/signup";

//importing user dashboard components
import { UserSidebar } from "./dashboard/user-dashboard/components/sidebar";
import UserHome from "./dashboard/user-dashboard/components/home";
import Sensors from "./dashboard/user-dashboard/components/sensors";
import Insights from "./dashboard/user-dashboard/components/insights";
import InsightReports from "./dashboard/user-dashboard/components/insightReports";
import Operations from "./dashboard/user-dashboard/components/operations";
import Sell from "./dashboard/user-dashboard/components/sell";
import Disease from "./dashboard/user-dashboard/components/disease";
import Setup from "./dashboard/user-dashboard/components/setup";
import Profile from "./dashboard/user-dashboard/components/profile";

//importing seller dashboard components
import { SellerSidebar } from "./dashboard/seller-dashboard/Pages/SellerSidebar";
import SellerHome from "./dashboard/seller-dashboard/Pages/SellerHome";
import SellerOrders from "./dashboard/seller-dashboard/Pages/SellerOrders";
import SellerP2P from "./dashboard/seller-dashboard/Pages/SellerP2P";
import SellerProfile from "./dashboard/seller-dashboard/Pages/SellerProfile";

//lazy load the dashboards components
// const UserHome  = lazy(() => import('./dashboard/user-dashboard/components/home')) ;
// const Sensors  = lazy(() => import('./dashboard/user-dashboard/components/sensors')) ;
// const Insights = lazy(() => import('./dashboard/user-dashboard/components/insights'));
// const InsightReports = lazy(() => import('./dashboard/user-dashboard/components/insightReports'));
// const Operations = lazy(() => import('./dashboard/user-dashboard/components/operations'));
// const Sell = lazy(() => import("./dashboard/user-dashboard/components/sell"));
// const Disease = lazy(() => import('./dashboard/user-dashboard/components/disease'));
// const Setup = lazy(() => import('./dashboard/user-dashboard/components/setup'));
// const Profile = lazy(() => import('./dashboard/user-dashboard/components/profile'));

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    let userInfo = localStorage.getItem("userInfo");

    if (!userInfo) {
      userInfo = {};
    } else {
      userInfo = JSON.parse(userInfo);
      setUser(userInfo);
    }
  }, []);

  return (
    <UserHomeContextProvider>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <Suspense fallback={<Loading />}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Forum />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* list out all possible dashboard pages */}
                {/* while rendering those pages component we can
                individually check if it matched for that role
                if yes do shit
                if no Page does not exist!!!!
             */}

                <Route
                  path="/dashboard"
                  element={
                    <Dashboard
                      sidebar={<UserSidebar active={"home"} />}
                      component={<UserHome />}
                    />
                  }
                />
                {/* common routes for farmer's and seller's dashboard */}
                <Route
                  path="/dashboard/operations"
                  element={
                    <Dashboard
                      sidebar={<UserSidebar />}
                      component={<Operations />}
                    />
                  }
                />

                {/* routes for farmer's dashboard */}
                <Route
                  path="/dashboard/sensors"
                  element={
                    <Dashboard
                      sidebar={<UserSidebar active={"sensors"} />}
                      component={<Sensors />}
                    />
                  }
                />

                <Route
                  path="/dashboard/insights"
                  element={
                    <Dashboard
                      sidebar={<UserSidebar active={"insights"} />}
                      component={<Insights />}
                    />
                  }
                />

                <Route
                  path="/dashboard/insights/reports"
                  element={
                    <Dashboard
                      sidebar={<UserSidebar active={"insights reports"} />}
                      component={<InsightReports />}
                    />
                  }
                />

                <Route
                  path="/dashboard/disease"
                  element={
                    <Dashboard
                      sidebar={<UserSidebar active={"disease"} />}
                      component={<Disease />}
                    />
                  }
                />
                <Route
                  path="/dashboard/setup"
                  element={
                    <Dashboard
                      sidebar={<UserSidebar active={"setup"} />}
                      component={<Setup />}
                    />
                  }
                />
                <Route
                  path="/dashboard/profile"
                  element={
                    <Dashboard
                      sidebar={<UserSidebar active={"profile"} />}
                      component={<Profile />}
                    />
                  }
                />
                <Route
                  path="/dashboard/sell"
                  element={
                    <Dashboard
                      sidebar={<UserSidebar active={"sell"} />}
                      component={<Sell />}
                    />
                  }
                />

                {/* routes for seller's dashboard */}
                <Route
                  path="/dashboard/seller"
                  element={
                    <Dashboard
                      sidebar={<SellerSidebar active={"home"} />}
                      component={<SellerHome />}
                    />
                  }
                />
                <Route
                  path="/dashboard/seller/orders"
                  element={
                    <Dashboard
                      sidebar={<SellerSidebar active={"orders"} />}
                      component={<SellerOrders />}
                    />
                  }
                />

                <Route
                  path="/dashboard/seller/p2p"
                  element={
                    <Dashboard
                      sidebar={<SellerSidebar active={"p2p"} />}
                      component={<SellerP2P />}
                    />
                  }
                />

                <Route
                path="/dashboard/seller/profile"
                element={
                  <Dashboard
                    sidebar={<SellerSidebar active={"profile"} />}
                    component={<SellerProfile />}
                  />
                }
              />

                {/* Error 404 page */}
                <Route
                  path="/dashboard/*"
                  element={<h1>Error 404! Page not found!</h1>}
                />
              </Routes>
            </BrowserRouter>
          </Suspense>
        </div>
      </UserContext.Provider>
    </UserHomeContextProvider>
  );
}

export default App;
