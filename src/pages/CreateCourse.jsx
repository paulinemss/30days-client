import React, { Component } from 'react';
import CourseForm from '../components/CourseForm';

export default class CreateCourse extends Component {
  render() {
    return (
      <div>
        <h1>CREATE COURSE</h1>
        <CourseForm mode='create' />
      </div>
    )
  }
}
