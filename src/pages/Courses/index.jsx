/* Main imports */ 
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCourses, likeCourse, hideCourse } from '../../services/main';
import CourseCard from '../../components/CourseCard';
import PageTitle from '../../components/PageTitle';

/* Styles imports */ 
import './style.css';
import { Button } from '@material-ui/core';

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
              color={this.state.selected === 'all' ? 'primary' : 'default'}
              onClick={() => this.sortCourses('all')}
            >
              All
            </Button>

            <Button
              color={this.state.selected === 'mindfulness' ? 'primary' : 'default'}
              onClick={() => this.sortCourses('mindfulness')}
            >
              Mindfulness
            </Button>

            <Button
              color={this.state.selected === 'exercise' ? 'primary' : 'default'}
              onClick={() => this.sortCourses('exercise')}
            >
              Exercise
            </Button>

            <Button
              color={this.state.selected === 'tech' ? 'primary' : 'default'}
              onClick={() => this.sortCourses('tech')}
            >
              Tech
            </Button>

            <Button
              color={this.state.selected === 'arts' ? 'primary' : 'default'}
              onClick={() => this.sortCourses('arts')}
            >
              Arts & Crafts
            </Button>

            <Button
              color={this.state.selected === 'other' ? 'primary' : 'default'}
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