import React, { Component } from 'react';
import styled from 'styled-components';
import FormDayInput from '../components/FormDayInput';
import { createNewCourse } from '../services/main';

const Step = styled.div`
  display: flex;
  flex-direction: column;
`

export default class CreateCourse extends Component {
  state = {
    step: 1,
    title: '',
    image: null,
    smallDescription: '',
    longDescription: '',
    author: '',
    category: '',
    days: [
      {
        dayNumber: 1,
        title: '',
        description: '',
        externalUrl: ''
      }
    ]
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'file' ? target.files[0] : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleDayChange = (newDay) => {
    const daysArray = this.state.days.map(day => {
      return day.dayNumber === newDay.dayNumber ? newDay : day; 
    })

    this.setState({
      days: daysArray
    });
  }

  getStep = (num) => {
    this.setState({
      step: num
    });
  }

  addDay = () => {
    const daysArray = this.state.days.slice(); 

    const newDay = {
      dayNumber: daysArray.length + 1,
      title: '',
      description: '',
      externalUrl: ''
    }

    daysArray.push(newDay);

    this.setState({
      days: daysArray
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const formBody = new window.FormData(); 
    formBody.append('image', this.state.image);
    formBody.append('title', this.state.title);
    formBody.append('smallDescription', this.state.smallDescription);
    formBody.append('longDescription', this.state.longDescription);
    formBody.append('author', this.state.author);
    formBody.append('category', this.state.category);
    formBody.append('days', JSON.stringify(this.state.days));

    createNewCourse(formBody)
      .then(res => {
        console.log('res', res.data); 
      })
      .catch(err => {
        console.log('err', err); 
      })
  }

  render() {
    return (
      <div>
        <h1>CREATE COURSE</h1>

        <form onSubmit={this.handleSubmit}>

          {this.state.step === 1 &&
            <Step>
              <h2>STEP 1 - COURSE DETAILS</h2>

              <label htmlFor='title'>Title</label>
              <input 
                name='title'
                id='title'
                type='text'  
                value={this.state.title}
                onChange={this.handleChange}
              />

              <label htmlFor='image'>Image</label>
              <input 
                name='image'
                id='image'
                type='file'
                onChange={this.handleChange}
              />

              <label htmlFor='smallDescription'>Short Description</label>
              <input 
                name='smallDescription'
                id='smallDescription'
                type='text'  
                value={this.state.smallDescription}
                onChange={this.handleChange}
              />

              <label htmlFor='longDescription'>Long Description</label>
              <textarea 
                name='longDescription' 
                id='longDescription'
                rows='5'
                value={this.state.longDescription} 
                onChange={this.handleChange}
              />

              <label htmlFor='author'>Author</label>
              <input 
                name='author'
                id='author'
                type='text'  
                value={this.state.author}
                onChange={this.handleChange}
              />
              
              <label>Category</label>
              <div>
                <label htmlFor='mindfulness'>
                  <input
                    type='radio'
                    name='category'
                    value='mindfulness'
                    id='mindfulness'
                    checked={this.state.category === 'mindfulness'}
                    onChange={this.handleChange}
                  />
                  Mindfulness
                </label>

                <label htmlFor='exercise'>
                  <input
                    type='radio'
                    name='category'
                    value='exercise'
                    id='exercise'
                    checked={this.state.category === 'exercise'}
                    onChange={this.handleChange}
                  />
                  Exercise
                </label>

                <label htmlFor='tech'>
                  <input
                    type='radio'
                    name='category'
                    value='tech'
                    id='tech'
                    checked={this.state.category === 'tech'}
                    onChange={this.handleChange}
                  />
                  Tech
                </label>

                <label htmlFor='arts'>
                  <input
                    type='radio'
                    name='category'
                    value='arts'
                    id='arts'
                    checked={this.state.category === 'arts'}
                    onChange={this.handleChange}
                  />
                  Arts & Crafts
                </label>

                <label htmlFor='other'>
                  <input
                    type='radio'
                    name='category'
                    value='other'
                    id='other'
                    checked={this.state.category === 'other'}
                    onChange={this.handleChange}
                  />
                  Other
                </label>
              </div>
              <button type='button' onClick={() => this.getStep(2)}>
                Next
              </button>
            </Step>
          }

          {this.state.step === 2 && 
            <Step>
              <h2>STEP 2 - DAILY CHALLENGES</h2>

              {this.state.days.map(day => (
                <FormDayInput 
                  day={day}
                  handleDayChange={this.handleDayChange}
                  key={day.dayNumber}
                />
              ))}

              <button type='button' onClick={this.addDay}>Add day</button>

              <div>
                <button type='button' onClick={() => this.getStep(1)}>
                  Back
                </button>
                <button type='submit'>
                  Create new course
                </button>
              </div>
            </Step>
          }

        </form>

      </div>
    )
  }
}
