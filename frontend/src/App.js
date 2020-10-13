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
import Navbar from "./components/navbar";
import PostDetails from "./components/postdetails";
import PostList from "./components/postlist";
import EditPost from "./components/editpost";
import CreatePost from "./components/createpost";
import CreateUser from "./components/createuser";
import NewPost from "./components/newpost/NewPost"
import Comments from "./components/Comments"
import Kata from "./components/Kata"

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

      <nav>

        <NavLink to="/">Home</NavLink>

        {user ? (
          <Fragment>
            <NavLink onClick={logOut} to="/">
              Log Out
            </NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/kata">Katas</NavLink>

          </Fragment>
        ) : (
            <Fragment>
              <NavLink to="/sign-up">Sign Up</NavLink>
              <NavLink to="/log-in">Log In</NavLink>

            </Fragment>
          )}
      </nav>
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
          path="/addcomment"
          render={(props) => <Comments {...props} thePropUser={user} />}
        />



        <Route
          exact
          path="/post/:id"
          render={(props) => <PostDetails {...props} thePropUser={user} />}
        />



        <Route component={NotFound} />
      </Switch>
      {!user && <GoogleAuth setUser={setUser} />}
      {!user && <GoogleAuthLogin setUser={setUser} />}

      <NotificationContainer />
    </TheContext.Provider>
  );
};
export default App;
