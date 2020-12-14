/* Main imports */ 
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getOneCourse, startChallenge } from '../../services/main';
import Loading from '../../components/Loading';

/* Styles imports */
import { Button } from '@material-ui/core';
import './style.css';

/* Component */ 
export default class SingleCourse extends Component {
  state = {
    course: {},
    selectedDay: 1,
    currentDetail: '',
    loading: true
  }

  componentDidMount() {
    getOneCourse(this.props.match.params.id).then(res => {
      this.setState({ 
        course: res.data,
        loading: false
      })
    })
  }

  beginChallenge = () => {
    if (this.props.user) {
      startChallenge(this.state.course, this.props.user._id)
        .then(res => {
          const challenge = res.data;

          if (!this.props.challenges.includes(challenge)) {
            this.props.addChallenge(challenge);
          } 

          this.props.updateChallenges()
          this.props.history.push(
            `/challenges/page/${challenge.shortId}`
          );
        })
        .catch(err => {
          console.log('err', err);
        })
    } else {
      this.props.history.push('/auth/login', {
        referrer: this.props.history.location.pathname
      }); 
    }
  }

  showDayDetails = (num) => {
    this.setState({
      currentDetail: this.state.course.days[num - 1].description
    })
  }

  isUserTheAuthor = () => {
    if (!this.props.user) { return false }
    return this.state.course.author === this.props.user._id; 
  }

  render() {
    const { 
      title, 
      smallDescription, 
      longDescription, 
      image, 
      days 
    } = this.state.course; 

    if (this.state.loading) {
      return <Loading />
    }

    const dailyChallenge = days[this.state.selectedDay - 1]

    return (
      <div className='single'>

        <div className='single_side single_left'>
          <div className='single_title'>
            <h1>30 days of... {title}</h1>
            <h2>{smallDescription}</h2>
          </div>

          <div className='single_media'>
            <img src={image} alt='' />
            <div>
              <h1>Day {this.state.selectedDay}</h1>
              <h4>30 days of {title}</h4>
            </div>
          </div>

          <div className='single_details'>
            <div className='single_details-top'>
              <div>
                <p>Day {this.state.selectedDay} Challenge</p>
                <h3>{dailyChallenge.title}</h3>
              </div>
            </div>
            <div className='single_details-bottom'>
              <p>{dailyChallenge.description}</p>
              {dailyChallenge.externalUrl && 
                <Button>
                  <a
                    href={dailyChallenge.externalUrl}
                    target='_blank'
                    rel='noreferrer'
                  >External link</a>
                </Button>
              }
            </div>
          </div>
        </div>

        <div className='single_side single_right'>
          <div className='single_right-top'>
            <h3>About this course</h3>
            <p>{longDescription}</p>
            
          </div>

          <div className='single_calendar'>
            <div className='single_calendar-title'>
              <p>30 days of {title}</p>
            </div>
            <div className='single_numbers'>
              {days.map(day => (
                <button
                  className={`
                    single_calendar-num
                    ${this.state.selectedDay === day.dayNumber ? 'active' : ''}
                  `}
                  key={day._id}
                >
                  {day.dayNumber}
                </button>
              ))}
            </div>
          </div>

          <div className='single_streak'>
            <Button
              variant='outlined'
              color='primary'
              onClick={this.beginChallenge}
            >
              Start 30 days challenge
            </Button>

            {this.isUserTheAuthor() && <Button>
              <Link to={`/courses/edit/${this.state.course.shortId}`}>
                Edit Course
              </Link>
            </Button>}
          </div>

        </div>

      </div>
    )
  }
}
