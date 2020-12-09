import React, { Component } from 'react';
import { getOneCourse } from '../services/main';
import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export default class SingleCourse extends Component {
  state = {
    course: {},
    currentDetail: ''
  }

  componentDidMount() {
    getOneCourse(this.props.match.params.id).then(res => {
      this.setState({ 
        course: res.data,
        currentDetail: res.data.longDescription
      })
    })
  }

  showDayDetails = (num) => {
    this.setState({
      currentDetail: this.state.course.days[num - 1].description
    })
  }

  render() {
    const { title, smallDescription, likes, days } = this.state.course; 

    return (
      <Wrapper>
        <h1>{title}</h1>
        <h3>{smallDescription}</h3>
        <p>{this.state.currentDetail}</p>
        <div><FaHeart /> {likes} Likes</div>

        {days && days.map(day => (
          <button 
            key={day.dayNumber} 
            onClick={() => this.showDayDetails(day.dayNumber)}
          >
            {day.dayNumber}
          </button>
        ))}
      </Wrapper>
    )
  }
}
