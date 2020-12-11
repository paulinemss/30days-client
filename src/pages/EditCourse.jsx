import React, { Component } from 'react';
import CourseForm from '../components/CourseForm';
import PageTitle from '../components/PageTitle'; 
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
        <PageTitle 
          mode='create'
          title='Edit 30 days challenge'
        />

        {this.state.course && 
          <CourseForm 
            course={this.state.course} 
            mode='edit' 
            user={this.props.user}
          />
        }
      </div>
    )
  }
}
