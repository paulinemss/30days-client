import React, { Component } from 'react';
import CourseCard from '../components/CourseCard';
import PageTitle from '../components/PageTitle';

function getPercentageCompleted(challenge) {
  const daysCompleted = challenge.completedDays.length; 
  return Math.round((daysCompleted / 30) * 100); 
}

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
            percentageCompleted={getPercentageCompleted(challenge)}
            course={challenge.course} 
            key={challenge.shortId}
          />
        ))}
      </div>
    )
  }
}
