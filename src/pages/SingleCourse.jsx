import React, { Component } from 'react';
import { FaHeart } from 'react-icons/fa';
import { getOneCourse } from '../services/main';
import Logo from '../components/Logo';
import './pages.css';

export default class SingleCourse extends Component {
  state = {
    course: {},
    currentDetail: ''
  }

  componentDidMount() {
    getOneCourse(this.props.match.params.id).then(res => {
      this.setState({ 
        course: res.data
      })
    })
  }

  showDayDetails = (num) => {
    this.setState({
      currentDetail: this.state.course.days[num - 1].description
    })
  }

  render() {
    const { title, smallDescription, longDescription, likes, days } = this.state.course; 

    return (
      <div className='course_main'>
        <div className='course_side left'>
          <Logo />
          <h1>{title}</h1>
          <h3>{smallDescription}</h3>
          <p>{longDescription}</p>
          <p>{this.state.currentDetail}</p>
          <div><FaHeart /> {likes} Likes</div>
        </div>
        
        <div className='course_side right'>
          {days && days.map(day => (
            <button 
              className='course_day'
              key={day.dayNumber} 
              onClick={() => this.showDayDetails(day.dayNumber)}
            >
              {day.dayNumber}
            </button>
          ))}
        </div>        
      </div>
    )
  }
}
