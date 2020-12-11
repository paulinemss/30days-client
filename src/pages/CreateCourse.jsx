import React, { Component } from 'react';
import CourseForm from '../components/CourseForm';
import PageTitle from '../components/PageTitle'; 

export default class CreateCourse extends Component {
  render() {
    return (
      <div>
        <PageTitle 
          mode='create'
          title='Create 30 days challenge'
        />
        <CourseForm 
          mode='create'
          user={this.props.user}
        />
      </div>
    )
  }
}
