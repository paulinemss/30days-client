import React, { Component } from 'react';
import CourseCard from '../components/CourseCard';

export default class Challenges extends Component {
  render() {
    return (
      <div>
        <h1>YOUR CHALLENGES</h1>

        {this.props.challenges.map(challenge => (
          <CourseCard 
            mode='challenge'
            challenge={challenge}
            course={challenge.course} 
            key={challenge.shortId}
          />
        ))}
      </div>
    )
  }
}
