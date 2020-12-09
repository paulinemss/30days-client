import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCourses } from '../services/main';
import CourseCard from '../components/CourseCard';

export default class Courses extends Component {
  state = {
    courses: []
  }

  componentDidMount() {
    getCourses()
      .then(res => {
        this.setState({
          courses: res.data
        })
      })
  }

  render() {
    console.log(this.state.courses);
    return (
      <div>
        <h1>COURSES</h1>
        <button>
          <Link to='/courses/create'>Create new course</Link>
        </button>
        {this.state.courses.map(course => (
          <CourseCard 
            course={course} 
            key={course.shortId}
            canEdit={this.props.user && this.props.user._id === course.author}
          />
        ))}
      </div>
    )
  }
}