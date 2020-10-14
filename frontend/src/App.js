import React, { Component, Fragment, useState, useEffect } from "react";
import { Switch, Route, NavLink, useHistory } from "react-router-dom";
import TheContext from "./TheContext";
import Home from "./components/home/Home";
import NotFound from "./components/404/NotFound.js";
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import Profile from "./components/profile/Profile";
import actions from "./api/index";
import GoogleAuth from "./components/auth/GoogleAuth";
import GoogleAuthLogin from "./components/auth/GoogleAuthLogin";
import Navbar1 from "./components/navbar";
import PostDetails from "./components/postdetails";
import PostList from "./components/postlist";
import EditPost from "./components/editpost";
import CreatePost from "./components/createpost";
import CreateUser from "./components/createuser";
import NewPost from "./components/newpost/NewPost";
import Comments from "./components/Comments";
import Kata from "./components/Kata";
import "../src/index.css"
import Feedback from "./components/Feedback"
import { Navbar, Nav, } from 'react-bootstrap'
import binary from './img/Dev_binary.png'
import logo from './img/Dev_logo.png'

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
const App = () => {
  let [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      let user = await actions.getUser();
      console.log("user is", user);
      setUser(user?.data);
    }
    getUser();
  }, []);

  const logOut = async () => {
    let res = await actions.logOut();
    setUser(null);
  };

  const history = useHistory();

  return (

    <TheContext.Provider value={{ history, user, setUser }}>

      <Navbar bg="dark" variant="dark" ClassName=".nav-area" >
        <Navbar.Brand href="/"><img src={logo} width="77" height="30" alt='error' /></Navbar.Brand>
        <Nav className="mr-auto">

          {user ? (
            <Fragment>
              <Nav.Link onClick={logOut} to="/"> Log Out</Nav.Link>
              <Nav.Link to="/profile">Profile? </Nav.Link>

            </Fragment>
          ) : (
              <Fragment>
                <Nav.Link to="/sign-up">Sign Up</Nav.Link>
                <Nav.Link to="/log-in">Log In</Nav.Link>

              </Fragment>

            )}
        </Nav>

      </Navbar>
      {user ? (<Nav className="peanuts" defaultActiveKey="/home" className="flex-column test-nav">
        Sub-Forums
        <Nav.Link href="/">Collaborations</Nav.Link>
        <Nav.Link href="/kata">Katas</Nav.Link>
        <Nav.Link href="/feedback">Feedback</Nav.Link>
      </Nav>) : null}



      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} thePropUser={user} />} />
        <Route
          exact
          path="/sign-up"
          render={(props) => <SignUp {...props} setUser={setUser} />}
        />
        <Route
          exact
          path="/log-in"
          render={(props) => <LogIn {...props} setUser={setUser} />}
        />
        <Route
          exact
          path="/profile"
          render={(props) => <Profile {...props} />}
        />

        <Route
          exact
          path="/newpost"
          render={(props) => <NewPost {...props} thePropUser={user} />}
        />


        <Route
          exact
          path="/kata"
          render={(props) => <Kata {...props} thePropUser={user} />}
        />


        <Route
          exact
          path="/Feedback"
          render={(props) => <Feedback {...props} thePropUser={user} />}
        />




        <Route
          exact
          path="/addcomment"
          render={(props) => <Comments {...props} thePropUser={user} />}
        />



        <Route
          exact
          path="/:type/:id"
          render={(props) => <PostDetails {...props} thePropUser={user} />}
        />






        <Route component={NotFound} />
      </Switch>
      { !user && <GoogleAuth setUser={setUser} />}
      { !user && <GoogleAuthLogin setUser={setUser} />}

      <NotificationContainer />
    </TheContext.Provider>
  );
};
export default App;
