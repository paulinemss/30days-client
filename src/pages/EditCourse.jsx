import React, { Component } from 'react';
import CourseForm from '../components/CourseForm';
import { getOneCourse } from '../services/main';

export default class EditCourse extends Component {
  state = {
    course: null
  }

  componentDidMount() {
    getOneCourse(this.props.match.params.id).then(res => {
      this.setState({ 
        course: res.data
      })
    })
  }

  render() {
    return (
      <div>
        <h1>EDIT COURSE</h1>
        {this.state.course && 
          <CourseForm course={this.state.course} mode='edit' />
        }
      </div>
    )
  }
}
