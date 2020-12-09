import React, { Component } from 'react';
import { TextField, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import * as Styles from './styles'; 

export default class index extends Component {
  state = {
    day: {
      dayNumber: this.props.day.dayNumber,
      title: this.props.day.title,
      description: this.props.day.description,
      externalUrl: this.props.day.externalUrl
    }
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      day: {
        ...this.state.day,
        [name]: value
      }
    }, () => {
      this.props.handleDayChange(this.state.day)
    });
  }

  render() {
    return (
      <Styles.DayInput>
        <h3>{this.state.day.dayNumber}</h3>
        
        <TextField 
          variant='outlined'
          label='Title'
          type='text'
          name='title'
          id='dayTitle'
          value={this.state.day.title}
          onChange={this.handleChange}
        />

        <TextField 
          variant='outlined'
          label='Description'
          type='text'
          name='description'
          id='dayDescription'
          value={this.state.day.description}
          onChange={this.handleChange}
        />
        
        <TextField 
          variant='outlined'
          label='External Url' 
          type='link'
          name='externalUrl'
          id='dayExternalUrl'
          value={this.state.day.externalUrl}
          onChange={this.handleChange}
        /> 

        <IconButton 
          disabled={this.state.day.dayNumber === 1}
          aria-label='delete'
          onClick={() => this.props.removeDay(this.state.day.dayNumber)} 
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
        
      </Styles.DayInput>
    )
  }
}