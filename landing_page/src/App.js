import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import FindSchools from "./components/FindSchools";
import FillDetails from "./components/FillDetails";
import Homepage from "./components/Homepage";
import Header from "./components/Header";
import PlaceToVisit from "./components/PlaceToVisit";
import NavbarHome from "./components/NavbarHome";
import Notices from "./components/Notices";
import DisplayNotices from "./components/DisplayNotices";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Schools from "./components/Schools";
import DisplaySchools from "./components/DisplaySchools";
import Register from "./components/Register";
import Verify from "./components/Verify";
import VerifyEmail from "./components/VerifyEmail";
import Login from "./components/Login";
import Token from "./components/Token";

const App = () => {
  return (
    <Router>
      <Fragment>
        <section className="">
          <Switch>
            <Route exact path="/" component={Landing}></Route>
            <Route exact path="/notice" component={Notices} />
            <Route
              exact
              path="/searchnotice"
              component={(props) => (
                <DisplayNotices notices={props.location.state.data} />
              )}
            />
            <Route exact path="/token" component={Token} />
            <Route exact path="/school" component={Schools} />
            <Route path="/homepage" component={Homepage}></Route>
            <Route path="/placetovisit" component={PlaceToVisit}></Route>
            <Route path="/findSchools" component={FindSchools} />
            <Route path="/fillDetails" component={FillDetails}>
              {" "}
            </Route>
            <Route path="/navbarhome" component={NavbarHome}></Route>
            <Route
              exact
              path="/search"
              component={(props) => (
                <DisplaySchools schools={props.location.state.data} />
              )}
            />
            <Route
              path="/register"
              component={() => {
                window.location = "http://localhost:5000/users/register";
                return null;
              }}
            />
            <Route
              path="/logout"
              component={() => {
                window.location = "http://localhost:5000/users/logout";
                return null;
              }}
            />
            // <Route exact path="/register" component={Register}></Route>
            <Route
              path="/login"
              component={() => {
                window.location = "http://localhost:5000/users/login";
                return null;
              }}
            />
            {/* <Route exact path="/login" component={Login}></Route> */}
            <Route exact path="/verify" component={Verify}></Route>
            <Route exact path="/verifyEmail" component={VerifyEmail}></Route>
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
};

export default App;
