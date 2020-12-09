import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import FormDayInput from '../FormDayInput';
import { createNewCourse, editCourse } from '../../services/main';

const StyledInput = styled(TextField)`
  && {
    margin-bottom: 15px;
  }
`

const FileInput = styled.input`
  display: none;
`

const FileLabel = styled.label`
  margin-bottom: 15px;
`

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
    ],
    error: {
      backend: ''
    }
  }

  componentDidMount() {
    if (this.props.mode === 'edit') {
      this.handlePrefill(); 
    }
  }

  handlePrefill = () => {
    this.setState({
      title: this.props.course.title,
      smallDescription: this.props.course.smallDescription,
      longDescription: this.props.course.longDescription,
      author: this.props.course.author,
      category: this.props.course.category,
      days: this.props.course.days
    })
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

  removeDay = (num) => {
    const daysArray = this.state.days.filter(day => {
      return day.dayNumber !== num; 
    })

    const numberedDaysArray = daysArray.map((day, index) => {
      return {
        ...day,
        dayNumber: index+1
      }
    })

    this.setState({
      days: numberedDaysArray
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ error: '' })

    const formBody = new window.FormData(); 
    formBody.append('image', this.state.image);
    formBody.append('title', this.state.title);
    formBody.append('smallDescription', this.state.smallDescription);
    formBody.append('longDescription', this.state.longDescription);
    formBody.append('author', this.props.user._id);
    formBody.append('category', this.state.category);
    formBody.append('days', JSON.stringify(this.state.days));

    if (this.props.mode === 'create') {
      createNewCourse(formBody)
        .then(res => {
          if (!res.status) {
            this.setState({
              error: {
                ...this.state.error,
                backend: res.errorMessage
              }
            })
          } else {
            console.log('res', res.data)
          }
        })
    } else if (this.props.mode === 'edit') {
      editCourse(formBody, this.props.course.shortId)
        .then(res => {
          if (!res.status) {
            this.setState({
              error: {
                ...this.state.error,
                backend: res.errorMessage
              }
            })
          } else {
            console.log('res', res.data)
          }
        })
    }

  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>

          {this.state.step === 1 &&
            <Step>
              <h2>STEP 1 - COURSE DETAILS</h2>

              <StyledInput 
                variant='outlined'
                label='Title'
                name='title'
                id='title'
                type='text'  
                value={this.state.title}
                onChange={this.handleChange}
              />

              <FileInput
                accept="image/*"
                name='image'
                id='image'
                multiple
                type="file"
                onChange={this.handleChange}
              />
              <FileLabel htmlFor="image">
                Course Image
                <Button variant="contained" color="primary" component="span">
                  Upload
                </Button>
              </FileLabel>

              <StyledInput
                variant='outlined'
                label='Short Description'
                name='smallDescription'
                id='smallDescription'
                type='text'  
                value={this.state.smallDescription}
                onChange={this.handleChange}
              />

              <StyledInput 
                variant='outlined'
                label='Long Description'
                multiline
                rows={4}
                name='longDescription' 
                id='longDescription'
                value={this.state.longDescription} 
                onChange={this.handleChange}
              />

              <StyledInput 
                variant='outlined'
                label='Author'
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
              <Button type='button' onClick={() => this.getStep(2)}>
                Next
              </Button>
            </Step>
          }

          {this.state.step === 2 && 
            <Step>
              <h2>STEP 2 - DAILY CHALLENGES</h2>

              {this.state.days.map((day, index) => (
                <FormDayInput 
                  day={day}
                  removeDay={this.removeDay}
                  handleDayChange={this.handleDayChange}
                  key={day.dayNumber}
                />
              ))}

              {this.state.days.length < 30
                ? <Button type='button' onClick={this.addDay}>Add day</Button>
                : <Button type='button' disabled>Add day</Button>
              }

              {this.state.error.backend && 
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  Oops! Something went wrong. Please check your form information and submit it again.
                </Alert>
              }

              <div>
                <Button type='button' onClick={() => this.getStep(1)}>
                  Back
                </Button>

                {this.props.mode === 'create'
                  ? <Button type='submit'>Create new course</Button>
                  : <Button type='submit'>Edit course</Button>
                }
              </div>
            </Step>
          }

        </form>

      </div>
    )
  }
}