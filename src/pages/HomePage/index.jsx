import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import { Button } from '@material-ui/core';
import './styles.css';

export default class HomePage extends Component {
  state = {
    selected: 'join'
  }

  toggleSelected = (category) => {
    this.setState({ selected: category })
  }

  render() {
    return (
      <div className='homepage'>
        <img 
          className='homepage_img' 
          src='/idea.png' 
          alt='woman with computer' 
        />
        <h1 className='homepage_title'>
          30 days to change everything.
        </h1>
        <h2 className='homepage_subtitle'>
        Yoga, code, meditation: start building the new habits you always wanted to try.
        </h2>
        <div className='homepage_btns'>
          <Link to='/courses' className='homepage_link'>
            <Button variant='outlined' className='homepage_button'>  
              Browse Challenges
            </Button>
          </Link>
          {this.props.user 
            ? <Link to='/challenges' className='homepage_link'>
              <Button variant='outlined' className='homepage_button'>
                Current Challenges
              </Button>
            </Link>
            : <Link to='/auth/login' className='homepage_link'>
              <Button variant='outlined' className='homepage_button'>
                Login
              </Button>
            </Link>
          }
        </div>

        <div className='homepage_middle'>
          <div className='homepage_allTabs'>

            <div 
              className={`homepage_tab ${this.state.selected === 'join' && 'selected'}`}
            >
              <Button 
                className='tab_button' 
                onClick={() => this.toggleSelected('join')}
              >
                Join challenges
              </Button>
            </div>

            <div 
              className={`homepage_tab ${this.state.selected === 'share' && 'selected'}`}
            >
              <Button 
                className='tab_button' 
                onClick={() => this.toggleSelected('share')}
              >
                Share your progress
              </Button>
            </div>

            <div 
              className={`homepage_tab ${this.state.selected === 'create' && 'selected'}`}
            >
              <Button 
                className='tab_button' 
                onClick={() => this.toggleSelected('create')}
              >
                Create your own
              </Button>
            </div>

          </div>

          {this.state.selected === 'join' && 
            <div className='homepage_description'>
              <img src='/calendar.png' alt='app screenshot' />
              <p className='homepage_descriptionText'>
                Studies show that it takes 21 to 30 days for you to build a new habit. Whether you are trying to exercise a bit more while stuck at home, or you want to learn a new skill like painting, coding, or cooking, we've got some daily challenges for you.
              </p>
            </div>
          }

          {this.state.selected === 'share' && 
            <div className='homepage_description'>
              <img src='/share.png' alt='app screenshot' />
              <p className='homepage_descriptionText'>
                Hold yourself accountable by sharing your progress with your friends and family. It will help you stay on track for the entire challenge, and maybe they'll want to join you! 
              </p>
            </div>
          }

          {this.state.selected === 'create' && 
            <div className='homepage_description'>
              <img src='/create-course.png' alt='app screenshot' />
              <p className='homepage_descriptionText'>
                Create your own 30 days challenges and share with your friends or community. Easily link your social media channels to share more details on each daily challenge, and track how many users have successfully completed the 30 days. 
              </p>
            </div>
          }

        </div>

        <div className='homepage_footer'>
          <div className='homepage_footer-container homepage_footer-credits'>
            <h2>30 days</h2>
            <p>
              Join challenges, hold yourself accountable, and become an overall better person, 30 days at a time.
            </p>
            <p className='nav_credits'>
              Built with ♡ by <a href='https://github.com/paulinemss' target="_blank" rel="noreferrer">Pauline Massé</a>.
            </p>
          </div>

          <div className='homepage_footer-container homepage_footer-links'>
            <h2>Links</h2>
            <p>
              <Link className='homepage_footer-link' to='/courses'>
                Challenges
              </Link>
              <br />
              <Link className='homepage_footer-link' to='/auth/login'>
                Login
              </Link>
              <br />
              <Link className='homepage_footer-link' to='/auth/login'>
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}