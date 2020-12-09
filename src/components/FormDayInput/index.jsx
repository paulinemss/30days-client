import React, { Component } from 'react';
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
        
        <label htmlFor='dayTitle'>Title</label>
        <input 
          type='text'
          name='title'
          id='dayTitle'
          value={this.state.day.title}
          onChange={this.handleChange}
        />

        <label htmlFor='dayDescription'>Description</label>
        <input 
          type='text'
          name='description'
          id='dayDescription'
          value={this.state.day.description}
          onChange={this.handleChange}
        />

        <label htmlFor='dayExternalUrl'>External Url</label>
        <input 
          type='link'
          name='externalUrl'
          id='dayExternalUrl'
          value={this.state.day.externalUrl}
          onChange={this.handleChange}
        />
        
      </Styles.DayInput>
    )
  }
}