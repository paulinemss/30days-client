/* Main imports */ 
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCourses, likeCourse, hideCourse } from '../../services/main';
import CourseCard from '../../components/CourseCard';
import PageTitle from '../../components/PageTitle';
import { colors } from '../../utils/helpers';

/* Styles imports */ 
import './style.css';
import { Button } from '@material-ui/core';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';

/* Component */ 
export default class Courses extends Component {
  state = {
    courses: [],
    selected: 'all'
  }

  componentDidMount() {
    getCourses().then(res => {
      this.setState({
        courses: res.data
      })
    })
  }

  sortCourses = (category) => {
    this.setState({
      selected: category
    })
  }

  upvoteCourse = (course) => {
    const likes = course.likes + 1; 

    likeCourse(course.shortId, likes).then(res => {
      this.setState({
        courses: res.data
      })
    })
  }

  deleteCourse = (course) => {
    console.log('delete this course', course); 

    hideCourse(course.shortId, course).then(res => {
      this.setState({
        courses: res.data
      })
    })
  }

  render() {
    let filteredCourses = this.state.courses.filter(course => {
      return course.category === this.state.selected
    })

    if (this.state.selected === 'all') {
      filteredCourses = this.state.courses
    }

    return (
      <div className='courses'>

        <PageTitle 
          mode='courses'
          title='Browse Courses'
        />

        <div className='courses_btns'>
          <div className='courses_btns-left'>
            <Button 
              className={this.state.selected === 'all' 
                ? 'sort-button active'
                : 'sort-button'
              }
              onClick={() => this.sortCourses('all')}
            >
              All
            </Button>

            <Button
              startIcon={<FiberManualRecordRoundedIcon 
                style={{ color: colors.mindfulness, fontSize: '12px' }}
              />}
              className={this.state.selected === 'mindfulness' 
                ? 'sort-button active'
                : 'sort-button'
              }
              onClick={() => this.sortCourses('mindfulness')}
            >
              Mindfulness
            </Button>

            <Button
              startIcon={<FiberManualRecordRoundedIcon 
                style={{ color: colors.exercise, fontSize: '12px' }}
              />}
              className={this.state.selected === 'exercise' 
                ? 'sort-button active'
                : 'sort-button'
              }
              onClick={() => this.sortCourses('exercise')}
            >
              Exercise
            </Button>

            <Button
              startIcon={<FiberManualRecordRoundedIcon 
                style={{ color: colors.tech, fontSize: '12px' }}
              />}
              className={this.state.selected === 'tech' 
                ? 'sort-button active'
                : 'sort-button'
              }
              onClick={() => this.sortCourses('tech')}
            >
              Tech
            </Button>

            <Button
              startIcon={<FiberManualRecordRoundedIcon 
                style={{ color: colors.arts, fontSize: '12px' }}
              />}
              className={this.state.selected === 'arts' 
                ? 'sort-button active'
                : 'sort-button'
              }
              onClick={() => this.sortCourses('arts')}
            >
              Arts & Crafts
            </Button>

            <Button
              startIcon={<FiberManualRecordRoundedIcon 
                style={{ color: colors.other, fontSize: '12px' }}
              />}
              className={this.state.selected === 'other' 
                ? 'sort-button active'
                : 'sort-button'
              }
              onClick={() => this.sortCourses('other')}
            >
              Other
            </Button>
          </div>

          <div className='courses_btns-right'>
            <Button className='create_course'>
              <Link 
                className='create_course' 
                to='/courses/create'
              >
                Create new course
              </Link>
            </Button>
          </div>
        </div>

        {filteredCourses.map(course => (
          <CourseCard 
            mode='course'
            course={course} 
            upvoteCourse={this.upvoteCourse}
            deleteCourse={this.deleteCourse}
            key={course.shortId}
            canEdit={this.props.user && this.props.user._id === course.author}
          />
        ))}
      </div>
    )
  }
}