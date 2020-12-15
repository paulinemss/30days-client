/* MAIN IMPORTS */ 
import React, { Component } from 'react';
import { login, signup } from "../../services/auth";

/* STYLING IMPORTS */
import { Tabs, Tab, TextField, Button } from '@material-ui/core'; 
import './styles.css'; 

/* COMPONENTS */ 
export default class index extends Component {
  state = {
    username: '',
    password: '',
    error: null,
    tab: 0 
  }

  redirect = () => {
    console.log('redirect is called')
    if (this.props.location.state?.referrer) {
      console.log('redirect to location');
      console.log(this.props.location.state.referrer);
      this.props.history.push(this.props.location.state.referrer);
    } else {
      console.log('redirect to homepage');
      this.props.history.push("/challenges");
    }
  }

  handleTabChange = (event, newValue) => {
    this.setState({ tab: newValue })
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleLoginSubmission = (event) => {
    event.preventDefault();

    const credentials = {
      username: this.state.username,
      password: this.state.password,
    };
    login(credentials).then(async (res) => {
      if (!res.status) {
        // handle not great request
        console.log('login not successful');
        return;
      }
      localStorage.setItem("accessToken", res.data.accessToken);
      await this.props.authenticate(res.data.user);
      this.redirect();
    });
  };

  handleSignupSubmission = (event) => {
    event.preventDefault();
    const credentials = {
      username: this.state.username,
      password: this.state.password,
    };
    signup(credentials).then(async (res) => {
      // successful signup
      console.log(res);
      if (!res.status) {
        // unsuccessful signup
      }
      localStorage.setItem("accessToken", res.data.accessToken);
      await this.props.authenticate(res.data.user);
      this.redirect();
    });
  };

  render() {
    return (
      <div className='auth'>
       
        <div className='auth_title'>
          <img className='auth_logo' src='/logo.png' alt='logo' />
          <h1 className='auth_subtitle'>30 days to change everything.</h1>
        </div>
        
        <div className='auth_tabs'>
          <Tabs
            value={this.state.tab}
            onChange={this.handleTabChange}
            indicatorColor='primary'
            textColor="primary"
            centered
          >
            <Tab label='Login' />
            <Tab label='Signup' />
          </Tabs>
        </div>

        {this.state.tab === 0 &&
          <div>
            <form 
              onSubmit={this.handleLoginSubmission} 
              className="signup__form"
            >
              <TextField
                className='auth_input'
                id="input-username"
                type="text"
                name="username"
                placeholder="username"
                value={this.state.username}
                onChange={this.handleInputChange}
                required
              />

              <TextField
                className='auth_input'
                id="input-password"
                type="password"
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                required
                minLength="8"
              />

              {this.state.error && (
                <div className="error-block">
                  <p>There was an error submiting the form:</p>
                  <p>{this.state.error.message}</p>
                </div>
              )}

              <Button type="submit" className="auth_submit">
                Submit
              </Button>
            </form>
          </div>
        }

        {this.state.tab === 1 &&
          <div>
            <form 
              onSubmit={this.handleSignupSubmission} 
              className="auth__form"
            >
              <TextField
                className='auth_input'
                id="input-username"
                type="text"
                name="username"
                placeholder="username"
                value={this.state.username}
                onChange={this.handleInputChange}
                required
              />

              <TextField
                className='auth_input' 
                id="input-password"
                type="password"
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                required
                minLength="8"
              />

              {this.state.error && (
                <div className="error-block">
                  <p>There was an error submiting the form:</p>
                  <p>{this.state.error.message}</p>
                </div>
              )}

              <Button type="submit" className="auth_submit">
                Submit
              </Button>
            </form>
          </div>
        }

      </div>
    )
  }
}
