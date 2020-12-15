import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import './styles.css';

export default class NotFound extends Component {
  render() {
    return (
      <div className='error'>
        <img className='error_img' src='/error.png' alt='404 error' />
        <div className='error_msg'>
          <h2>Well, this is awkward.</h2>
          <p>The page you were looking for does not exist. Did you mean one of these instead?</p>
          <div className='error_links'>
            <Link to='/' className='error_link'>
              <Button variant='outlined'>
                Home
              </Button>
            </Link>

            <Link to='/courses' className='error_link'>
              <Button variant='outlined'>
                Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
