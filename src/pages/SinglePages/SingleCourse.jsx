import React, { Component } from 'react';
import { FaHeart } from 'react-icons/fa';
import { Button } from '@material-ui/core';
import { getOneCourse, startChallenge } from '../../services/main';
import Logo from '../../components/Logo';

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

  beginChallenge = () => {
    if (this.props.user) {
      startChallenge(this.state.course, this.props.user._id)
        .then(res => {
          const challenge = res.data;

          if (this.props.challenges.includes(challenge)) {
            this.props.history.push(`/challenges/${challenge.shortId}`);
          } else {
            this.props.addChallenge(challenge);
            this.props.history.push(`/challenges/page/${challenge.shortId}`);
          }        
        })
        .catch(err => {
          console.log('err', err);
        })
    } else {
      this.props.history.push("/auth/login");
    }
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

          <Button 
            variant='outlined' 
            color='primary' 
            onClick={this.beginChallenge}
          >
            Start 30 day challenge
          </Button>
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
