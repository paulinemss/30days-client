import React from "react";
import { Switch } from "react-router-dom";
import LoadingComponent from "./components/Loading";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";
import ProtectedPage from "./pages/ProtectedPage";
import Signup from "./pages/Signup";
import NormalRoute from "./routing-components/NormalRoute";
import ProtectedRoute from "./routing-components/ProtectedRoute";
import { getLoggedIn, logout } from "./services/auth";
import * as PATHS from "./utils/paths";

import Courses from './pages/Courses';
import SingleCourse from './pages/SingleCourse';
import CreateCourse from "./pages/CreateCourse";
import EditCourse from './pages/EditCourse';
import './App.css';

class App extends React.Component {
  state = {
    user: null,
    isLoading: true,
  };

  componentDidMount = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return this.setState({
        isLoading: false,
      });
    }
    getLoggedIn(accessToken).then((res) => {
      if (!res.status) {
        console.log("RES IN CASE OF FAILURE", res);
        // deal with failed backend call
        return this.setState({
          isLoading: false,
        });
      }
      this.setState({
        user: res.data.user,
        isLoading: false,
      });
    })
  };

  handleLogout = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return this.setState({
        user: null,
        isLoading: false,
      });
    }
    this.setState(
      {
        isLoading: true,
      },
      () => {
        logout(accessToken).then((res) => {
          if (!res.status) {
            // deal with error here
            console.log("SOMETHING HAPPENED", res);
          }

          localStorage.removeItem("accessToken");
          return this.setState({
            isLoading: false,
            user: null,
          });
        });
      }
    );
  };

  authenticate = (user) => {
    this.setState({
      user,
    });
  };

  render() {
    if (this.state.isLoading) {
      return <LoadingComponent />;
    }

    return (
      <>
        <Navbar handleLogout={this.handleLogout} user={this.state.user} />
        <div className="App">
          <Switch>

            <NormalRoute 
              exact 
              path={PATHS.HOMEPAGE} 
              component={HomePage} 
            />

            <NormalRoute 
              exact 
              path='/courses' 
              component={Courses} 
              user={this.state.user} 
            />

            <NormalRoute 
              exact 
              path='/courses/create' 
              user={this.state.user}
              component={CreateCourse}
            />

            <NormalRoute exact path='/courses/edit/:id' component={EditCourse} />

            <NormalRoute exact path='/courses/:id' component={SingleCourse} />

            <NormalRoute
              exact
              path={PATHS.SIGNUPPAGE}
              authenticate={this.authenticate}
              component={Signup}
            />

            <NormalRoute
              exact
              path={PATHS.LOGINPAGE}
              authenticate={this.authenticate}
              component={LogIn}
            />

            <ProtectedRoute
              exact
              path={PATHS.PROTECTEDPAGE}
              component={ProtectedPage}
              user={this.state.user}
            />
            
          </Switch>
        </div>
      </>
    );
  }
}

export default App;