import React, { Component } from 'react';
import CourseCard from '../components/CourseCard';
import PageTitle from '../components/PageTitle';

export default class Challenges extends Component {
  render() {
    return (
      <div>
        <PageTitle
          mode='challenges'
          title='Challenges'
        />

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
