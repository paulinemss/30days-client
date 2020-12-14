import React, { Component } from 'react';
import MainForm from '../components/Form/MainForm'; 
import PageTitle from '../components/PageTitle'; 

export default class CreateCourse extends Component {
  render() {
    return (
      <div>
        <PageTitle 
          mode='create'
          title='Create 30 days challenge'
        />
        <MainForm
          mode='create'
          user={this.props.user}
        />
      </div>
    )
  }
}
