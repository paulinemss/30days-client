import React, { Component } from 'react';
import CourseCard from '../../components/CourseCard';
import PageTitle from '../../components/PageTitle';
import EmptyCard from '../../components/EmptyCard';
import Loading from '../../components/Loading';
import './styles.css'; 

function getPercentageCompleted(challenge) {
  const daysCompleted = challenge.completedDays.length; 
  return Math.round((daysCompleted / 30) * 100); 
}

function getCurrentChallenges(challenges) {
  return challenges.filter(challenge => challenge.completedDays.length < 30)
}

function getCompletedChallenges(challenges) {
  return challenges.filter(challenge => challenge.completedDays.length === 30)
}

export default class Challenges extends Component {
  render() {

    if (!this.props.challenges) {
      return <Loading />
    }

    const currentChallenges = getCurrentChallenges(this.props.challenges)
    const completedChallenges = getCompletedChallenges(this.props.challenges)
    
    return (
      <div>
        <PageTitle
          mode='challenges'
          title='Challenges'
        />

        <h2 className='challenges_title'>
          Current Challenges
        </h2>

        <div className='challenges_list'>
          {currentChallenges.length === 0 
            ? <EmptyCard
              message="You haven't joined any challenge yet."
            />
            : currentChallenges.map(challenge => (
              <CourseCard 
                mode='challenge'
                challenge={challenge}
                percentageCompleted={getPercentageCompleted(challenge)}
                course={challenge.course} 
                key={challenge.shortId}
              />
            ))
          }
        </div>

        <h2 className='challenges_title'>
          Completed Challenges
        </h2>
        
        <div className='challenges_list'>
          {completedChallenges.length === 0 
            ? <EmptyCard
              message="You haven't completed any challenge yet."
            />
            : completedChallenges.map(challenge => (
              <CourseCard
                mode='challenge'
                completed={true}
                challenge={challenge}
                percentageCompleted={getPercentageCompleted(challenge)}
                course={challenge.course} 
                key={challenge.shortId}
              />
            ))
          }
        </div>

      </div>
    )
  }
}
