import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { IconButton, Button } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import MenuIcon from '@material-ui/icons/Menu';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import LibraryAddCheckRoundedIcon from '@material-ui/icons/LibraryAddCheckRounded';
import LibraryBooksRoundedIcon from '@material-ui/icons/LibraryBooksRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import './Navbar.css';

class Navbar extends Component {
  state = {
    showNavbar: true
  }

  componentDidMount() {
    window.onresize = () => {
      if (window.innerWidth < 970) {
        this.setState({ showNavbar: false })
      } else {
        this.setState({ showNavbar: true })
      }
    }
  }

  hideNavbar = () => {
    this.setState({ showNavbar: false })
  }

  displayNavbar = () => {
    this.setState({ showNavbar: true })
  }
  
  render() {

    if (this.props.location.pathname === '/') {
      return (
        <>
          <div className='homepage_nav'>
            <img src='/logo.png' alt='30 days logo' />
            <div>
              {this.props.user 
                ? (<>
                  <Link to='/challenges' className='homepage_nav-link'>
                    <Button 
                      variant='outlined'
                      className='homepage_nav-btn'
                    >
                      My challenges
                    </Button>
                  </Link>
                </>)
                : (<> 
                  <Link to='/auth/login' className='homepage_nav-link'>
                    <Button 
                      variant='outlined'
                      className='homepage_nav-btn'
                    >
                      Signup
                    </Button>
                  </Link>
                  <Link to='/auth/login' className='homepage_nav-link'>
                    <Button 
                      variant='outlined'
                      className='homepage_nav-btn'
                    >
                      Login
                    </Button>
                  </Link>
                </>)
              }
            </div>
          </div>
        </>
      )
    }

    return (
      <>
        <nav 
          className={this.state.showNavbar ? '' : 'hidden'}
        >
          <div className='nav_content'>

            <div>
              <div className='nav_logo'>
                <img src='/logo.png' alt='30 days logo' />
              </div>

              <div className='nav_links'>
                {this.props.user
                  ? <>
                    <Link className='nav_link' to='/challenges'>
                      <Button 
                        className='nav_button'
                        startIcon={<LibraryAddCheckRoundedIcon />}
                      >
                          My Challenges
                      </Button>
                    </Link>
                    <Link className='nav_link' to='/courses'>
                      <Button 
                        className='nav_button'
                        startIcon={<LibraryBooksRoundedIcon />}
                      >
                          Browse Courses
                      </Button>
                    </Link>
                    <Link className='nav_link' to='/settings'>
                      <Button
                        className='nav_button'
                        startIcon={<SettingsRoundedIcon />}
                      >
                          Settings
                      </Button>
                    </Link>
                    <Button 
                      className='nav_button'
                      startIcon={<ExitToAppRoundedIcon />}
                      onClick={this.props.handleLogout}
                    >
                        Logout
                    </Button>
                  </>
                  : <>
                    <Link className='nav_link' to='/'>
                      <Button 
                        className='nav_button' 
                        startIcon={<HomeRoundedIcon />}
                      >
                          Home
                      </Button>
                    </Link>
                    <Link className='nav_link' to='/courses'>
                      <Button 
                        className='nav_button'
                        startIcon={<LibraryBooksRoundedIcon />}
                      >
                          Browse Courses
                      </Button>
                    </Link>
                    <Link className='nav_link' to='/auth/login'>
                      <Button 
                        className='nav_button'
                        startIcon={<ExitToAppRoundedIcon />}
                      >
                          Login
                      </Button>
                    </Link>
                  </>
                }
              </div>
            </div>

            <div className='nav_details'>
              <h2>30 days</h2>
              <p>
                Join challenges, hold yourself accountable, and become an overall better person, 30 days at a time.
              </p>
              <p className='nav_credits'>
                Built with ♡ by <a href='https://github.com/paulinemss' target="_blank" rel="noreferrer">Pauline Massé</a>.
              </p>
            </div>
            
          </div>
          <div 
            onClick={this.hideNavbar} 
            className='hide-button'
          >
            <IconButton aria-label='hide navbar'>
              <NavigateBeforeIcon />
            </IconButton>
          </div>
        </nav>

        <div
          className={this.state.showNavbar ? 'hidden' : 'nav_menu'}
        >
          <div onClick={this.displayNavbar}>
            <IconButton aria-label='menu icon'>
              <MenuIcon />
            </IconButton>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(Navbar);