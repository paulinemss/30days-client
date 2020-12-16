/* Main imports */ 
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import { getOneCourse, startChallenge } from '../../services/main';
import Loading from '../../components/Loading';
import { getPrimaryColor } from '../../utils/helpers';

/* Styles imports */
import { Button, Divider } from '@material-ui/core';
import './style.css';

/* Component */ 
export default class SingleCourse extends Component {
  state = {
    course: {},
    selectedDay: 1,
    currentDetail: '',
    loading: true,
    colors: {}
  }

  componentDidMount() {
    getOneCourse(this.props.match.params.id).then(res => {
      this.setState({ 
        course: res.data,
        loading: false,
        colors: getPrimaryColor(res.data.category)
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

  selectDay = (dayNumber) => {
    this.setState({ selectedDay: dayNumber })
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
    console.log(dailyChallenge);

    return (
      <div className='course'>

        <div className='course_header'>
          <div className='course_title'>
            <div 
              className='course_icon'
              style={{ 
                backgroundColor: this.state.colors.rgbColor, 
                color: this.state.colors.hexColor
              }}
            >
              {this.state.colors.icon}
            </div>
            <div>
              <h1>30 days of... {title}</h1>
              <h2>{smallDescription}</h2>
            </div>
          </div>

          <div className='course_btns'>
            <Button
              variant='outlined'
              style={{ 
                color: this.state.colors.hexColor, 
                border: `1px solid ${this.state.colors.hexColor}` 
              }}
              onClick={this.beginChallenge}
              className='course_btn'
            >
              Start 30 days challenge
            </Button>

            {this.isUserTheAuthor() && 
              <>
                <Button className='course_btn'>
                  <Link 
                    to={`/courses/edit/${this.state.course.shortId}`}
                    className='course_link'
                  >
                  Edit Course
                  </Link>
                </Button>
                <Button className='course_btn'>
                  <Link 
                    to={`/courses/edit/${this.state.course.shortId}`}
                    className='course_link'
                  >
                  Delete Course
                  </Link>
                </Button>
              </>
            }
          </div>
        </div>

        <Divider />

        <div className='course_main'>

          <div className='course_main-side'>
            <div className='course_image'>
              <img src={image} alt='course pic' />
            </div>
            <h2>Description</h2>
            <div><ReactMarkdown>{longDescription}</ReactMarkdown></div>
          </div>

          <div className='course_main-side'>
          
            <div className='course_peak'>
              <h2>Sneak Peek</h2>

              <div className='course_peak-container'>
                <Button 
                  className='course_peak-day'
                  style={{ 
                    color: this.state.colors.hexColor,
                    border: this.state.selectedDay === 1 ? `1px solid ${this.state.colors.hexColor}` : '1px solid #f7f6f3'
                  }}
                  onClick={() => this.selectDay(1)}
                >
                  Day 1
                </Button>
                <Button 
                  className='course_peak-day'
                  style={{ 
                    color: this.state.colors.hexColor,
                    border: this.state.selectedDay === 2 ? `1px solid ${this.state.colors.hexColor}` : '1px solid #f7f6f3'
                  }}
                  onClick={() => this.selectDay(2)}
                >
                  Day 2
                </Button>
                <Button 
                  className='course_peak-day'
                  style={{ 
                    color: this.state.colors.hexColor,
                    border: this.state.selectedDay === 3 ? `1px solid ${this.state.colors.hexColor}` : '1px solid #f7f6f3'
                  }}
                  onClick={() => this.selectDay(3)}
                >
                  Day 3
                </Button>
                <Button 
                  className='course_peak-day'
                  style={{ 
                    color: this.state.colors.hexColor,
                    border: this.state.selectedDay === 4 ? `1px solid ${this.state.colors.hexColor}` : '1px solid #f7f6f3'
                  }}
                  onClick={() => this.selectDay(4)}
                >
                  Day 4
                </Button>
              </div>

              <div className='course_peak-details'>
                <h3>DAY {this.state.selectedDay} CHALLENGE</h3>
                <h2>{dailyChallenge.title}</h2>
                <p>{dailyChallenge.description}</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    )
  }
}
