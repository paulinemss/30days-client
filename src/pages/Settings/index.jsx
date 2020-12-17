import React, { Component } from 'react'; 
import PageTitle from '../../components/PageTitle';
import { Button, TextField, IconButton } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import './styles.css';

export default class Settings extends Component {
  state = {
    user: {},
    username: '',
    isUsernameValid: 'default'
  }

  componentDidMount() {
    this.setState({
      user: this.props.user,
      username: this.props.user.username
    })
  }

  handleChange = (e) => {
    const value = e.target.value; 
    const name = e.target.name; 

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (
      this.state.username !== this.state.user.username && 
      this.state.username.length > 1
    ) {
      console.log('new username:', this.state.username)
      this.setState({ isUsernameValid: 'green' })
      setTimeout(() => {
        this.setState({ isUsernameValid: 'default' })
      }, 2000);
    } else {
      this.setState({ isUsernameValid: 'red' })
    }
  }

  render() {
    return (
      <div>
        <PageTitle 
          mode='settings'
          title='Settings'
        />

        <div className='settings'>
          <h2>Account Details</h2>

          <div>
            <TextField 
              name='username'
              type='text'
              label='Username'
              variant='outlined'
              value={this.state.username}
              className='settings_username'
              onChange={this.handleChange}
            />
            {this.state.isUsernameValid === 'default' &&
              <IconButton onClick={this.handleSubmit}>
                <DoneIcon />
              </IconButton>
            }
            {this.state.isUsernameValid === 'green' &&
              <IconButton 
                onClick={this.handleSubmit} 
                className='check_green'
              >
                <DoneIcon />
              </IconButton>
            }
            {this.state.isUsernameValid === 'red' &&
              <IconButton 
                onClick={this.handleSubmit} 
                className='check_red'
              >
                <DoneIcon />
              </IconButton>
            }
            
          </div>

          <Button 
            variant='outlined'
            className='settings_btn'
          >
            Change my password
          </Button>

          <Button 
            variant='outlined'
            color='secondary'
            className='settings_btn'
          >
            Delete my account
          </Button>
        </div>

      </div>
    )
  }
}