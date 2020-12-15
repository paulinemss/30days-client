import React, { Component } from 'react';
import { TextField, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import './styles.css';

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
      <div className='form_day'>

        <h3
          className='form_dayNumber'
          style={{ 
            color: this.props.color.hexColor,
            backgroundColor: this.props.color.rgbColor
          }}
        >
          {this.state.day.dayNumber}
        </h3>

        <div className='form_mid'>
          <div>        
            <TextField 
              className='form_dayTitle'
              variant='outlined'
              label='Title'
              type='text'
              name='title'
              required
              id='dayTitle'
              value={this.state.day.title}
              onChange={this.handleChange}
            />
        
            <TextField 
              className='form_dayURL'
              variant='outlined'
              label='External Url' 
              type='link'
              name='externalUrl'
              id='dayExternalUrl'
              value={this.state.day.externalUrl}
              onChange={this.handleChange}
            /> 
          </div>

          <TextField 
            className='form_dayDescription'
            variant='outlined'
            label='Description'
            multiline
            rows={2}
            type='text'
            required
            name='description'
            id='dayDescription'
            value={this.state.day.description}
            onChange={this.handleChange}
          />
        </div>
        
        <div>
          <IconButton 
            disabled={this.state.day.dayNumber === 1}
            aria-label='delete'
            onClick={() => this.props.removeDay(this.state.day.dayNumber)} 
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>

      </div>
    )
  }
}