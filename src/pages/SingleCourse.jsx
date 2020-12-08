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
    course: {}
  }

  componentDidMount() {
    getOneCourse(this.props.match.params.id).then(res => {
      this.setState({ 
        course: res.data 
      })
    })
  }

  render() {
    const { title, likes } = this.state.course; 

    return (
      <Wrapper>
        <h1>{title}</h1>
        <div><FaHeart /> {likes} Likes</div>
      </Wrapper>
    )
  }
}
