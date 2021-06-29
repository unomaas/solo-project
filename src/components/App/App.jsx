//#region ⬇⬇ All document setup, below:
// ⬇ File Imports: 
import './App.css';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Dashboard from '../Dashboard/Dashboard';
import CreateKits from '../CreateKits/CreateKits';
import CreateEvents from '../CreateEvents/CreateEvents';
import Packing from '../Packing/Packing';
// ⬇ Dependent Functionality:
import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
//#endregion ⬆⬆ All document setup above.

const theme = createMuiTheme({
  typography: {
    fontFamily: 'opendyslexicregular',
    fontSize: 12.5
  }, 

}) // End theme


function App() {
  //#region ⬇⬇ All state variables below:
  const dispatch = useDispatch();
  // ⬇ Runs on page load:
  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);
  //#endregion ⬆⬆ All state variables above. 


  // ⬇ Rendering:
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div className="App">

        <Nav />

        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          {/* // shows AboutPage at all times (logged in or not) */}
          <Route exact path="/about">
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user 
            logged in shows UserPage else shows LoginPage */}
          <ProtectedRoute exact path="/user">
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/dashboard">
            <Dashboard />
          </ProtectedRoute>

          <ProtectedRoute exact path="/createkit">
            <CreateKits />
          </ProtectedRoute>

          <ProtectedRoute exact path="/createevent">
            <CreateEvents />
          </ProtectedRoute>

          <ProtectedRoute exact path="/packing">
            <Packing />
          </ProtectedRoute>

          {/* // logged in shows InfoPage else shows LoginPage */}
          <ProtectedRoute exact path="/info">
            <InfoPage />
          </ProtectedRoute>

          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
          {/* // with authRedirect:
            // - if logged in, redirects to "/dashboard"
            // - else shows LoginPage at /login */}
          <ProtectedRoute exact path="/login" authRedirect="/dashboard">
            <LoginPage />
          </ProtectedRoute>

          {/* // with authRedirect:
            // - if logged in, redirects to "/dashboard"
            // - else shows RegisterPage at "/registration" */}
          <ProtectedRoute exact path="/registration" authRedirect="/dashboard">
            <RegisterPage />
          </ProtectedRoute>

          {/* // with authRedirect:
            // - if logged in, redirects to "/dashboard"
            // - else shows LandingPage at "/home" */}
          <ProtectedRoute exact path="/home" authRedirect="/dashboard">
            <LandingPage />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>

        <Footer />

      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
