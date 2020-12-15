/* MAIN IMPORTS */

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'; 
import { useHistory } from 'react-router-dom';
import { createNewCourse, editCourse } from '../../services/main';
import FormDayInput from '../FormDayInput';

/* STYLING IMPORTS */ 

import { Button, TextField, MobileStepper, InputAdornment } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import { getPrimaryColor } from '../../utils/helpers'; 
import './styles.css';

/* COMPONENT */

const MainForm = (props) => {

  const { 
    register, 
    handleSubmit, 
    getValues, 
    trigger, 
    errors 
  } = useForm({
    mode: 'onChange'
  }); 
  const { course = { category: 'other' } } = props; 
  const history = useHistory(); 
  const [ step, setStep ] = useState(1); 
  const [ backendErr, setBackendErr ] = useState(''); 
  const [ step1Data, setStep1Data ] = useState(course); 
  const [ fileName, setFileName ] = useState('');
  const [ days, setDays ] = useState([{
    dayNumber: 1,
    title: '',
    description: '',
    externalUrl: ''
  }]);
  const colors = {
    mindfulness: getPrimaryColor('mindfulness'),
    exercise: getPrimaryColor('exercise'),
    tech: getPrimaryColor('tech'),
    arts: getPrimaryColor('arts'),
    other: getPrimaryColor('other')
  };

  useEffect(() => {
    if (props.mode === 'edit') {
      setDays(props.course.days); 
    }
  }, [props]); 

  const continueToStep2 = async () => {
    const isValid = await trigger();
    console.log('isValid', isValid);
    if (isValid) {
      setStep1Data(getValues());
      setStep(2); 
    }
  }

  const activeStep = () => {
    if (days.length < 10) {
      return 1
    } else if (days.length < 20) {
      return 2
    } else if (days.length < 30) {
      return 3
    } else {
      return 4
    }
  }

  const findHelperText = (err) => {
    if (err === 'title') {
      if (errors.title?.type === 'required' ) { return 'You must add a title.' }
      if (errors.title?.type === 'maxLength') { return 'Please write a title with less than 30 characters.' }
    }
    if (err === 'smallDescription') {
      if (errors.smallDescription?.type === 'required' ) { return 'You must add a one liner.' }
      if (errors.smallDescription?.type === 'maxLength') { return 'Please write a one liner with less than 60 characters.' }
    }
    if (err === 'longDescription') {
      if (errors.longDescription?.type === 'required' ) { return 'You must add a description for your challenge.' }
    }
    if (err === 'author') {
      if (errors.author?.type === 'required') { return 'Please credit yourself or the challenge creator.' }
    }

    return false;
  }
  
  const addDay = (amount) => {
    const daysArray = days.slice();
    const start = daysArray.length;
    for (let i = start; i < Math.min(start + amount, 30); i++) {
      daysArray.push({
        dayNumber: i + 1,
        title: '',
        description: '',
        externalUrl: ''
      })
    }
    setDays(daysArray);
  }

  const removeDay = (num) => {
    const daysArray = days.filter(day => day.dayNumber !== num)
    const sortedDaysArray = daysArray.map((day, index) => {
      return {
        ...day,
        dayNumber: index+1
      }
    })
    setDays(sortedDaysArray); 
  }

  const handleFileChange = (event) => {
    setFileName(event.target.files[0].name);
  }

  const handleDayChange = (newDay) => {
    const daysArray = days.map(day => {
      return day.dayNumber === newDay.dayNumber ? newDay : day; 
    })
    setDays(daysArray);
  }

  const validateThirtyDays = () => {
    return days.length !== 30;
  }

  const onSubmit = (data) => {   
    const formBody = new window.FormData(); 
    formBody.append('image', step1Data.image[0]);
    formBody.append('title', step1Data.title);
    formBody.append('smallDescription', step1Data.smallDescription);
    formBody.append('longDescription', step1Data.longDescription);
    formBody.append('author', props.user._id);
    formBody.append('category', step1Data.category);
    formBody.append('days', JSON.stringify(days));

    if (props.mode === 'edit') {
      editCourse(formBody, props.course.shortId)
        .then(res => {
          if (!res.status) {
            setBackendErr(res.errorMessage)
          } else {
            console.log('new course', res.data);
            history.push(`/courses/${res.data.shortId}`);
          }
        })

    } else {
      createNewCourse(formBody)
        .then(res => {
          if (!res.status) {
            setBackendErr(res.errorMessage)
          } else {
            console.log('new course', res.data);
            history.push(`/courses/${res.data.shortId}`);
          }
        })
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        {step === 1 &&
        <div className='form_steps'>
          <h2>STEP ONE - Course Details</h2>

          <div className='form_step1'>
            <div className='form_step1-left'>

              <div className='form_input'>
                <label className='form_input-mainTitle'>
                  30 days of
                </label>
                <TextField
                  className='main_input'
                  name='title'
                  required
                  error={!!errors.title}
                  helperText={findHelperText('title') ? findHelperText('title') : 'Write your challenge title here.'}
                  defaultValue={step1Data.title}
                  type='text'
                  inputRef={register({ 
                    required: true,
                    maxLength: 30 
                  })}
                />
              </div>
          
              <div className='form_input'>
                <TextField 
                  className='other_input'
                  variant='outlined'
                  label='One Liner'
                  name='smallDescription'
                  error={!!errors.smallDescription}
                  helperText={findHelperText('smallDescription')}
                  defaultValue={step1Data.smallDescription}
                  type='text'
                  required
                  inputRef={register({
                    required: true,
                    maxLength: 60
                  })}
                />
              </div>
          
              <div className='form_input'>
                <TextField 
                  className='other_input'
                  variant='outlined'
                  label='Long Description'
                  multiline
                  rows={19}
                  name='longDescription'
                  required
                  error={!!errors.longDescription}
                  helperText={findHelperText('longDescription')}
                  defaultValue={step1Data.longDescription}
                  inputRef={register({
                    required: true
                  })}
                />
              </div>
          
              {/* <div className='form_input'>
                <TextField
                  className='other_input'
                  variant='outlined'
                  label='Challenge Creator'
                  name='author'
                  required
                  error={!!errors.author}
                  helperText={findHelperText('author')}
                  defaultValue={step1Data.author}
                  type='text'
                  inputRef={register({
                    required: true
                  })}
                />
              </div> */}

            </div>

            <div className='form_step1-right'>
              
              {props.course && 
                <div className='edit_course'>
                  <img className='edit_course-pic' src={props.course.image} alt='course pic' />
                </div>
              }

              <div className='form_input'>

                <input 
                  className='file'
                  accept='image/*'
                  name='image'
                  multiple
                  id='image'
                  type='file'
                  onChange={handleFileChange}
                  ref={register}
                />
                <label className='label_file' htmlFor='image'>
                  <div className='label_container'>
                    <TextField 
                      className='other_input'
                      variant='outlined'
                      label='Upload Course Image'
                      placeholder='Select an image to upload'
                      value={fileName}
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><AttachFileIcon /></InputAdornment>,
                      }}
                    />
                  </div>
                </label>

              </div>

              <div className='form_input form_category'>
                <label className='form_category-mainTitle'>
                  Category *
                </label>
                <div className='form_radios'>
                  <input 
                    type='radio'
                    name='category'
                    id='mindfulness'
                    value='mindfulness'
                    defaultChecked={step1Data.category === 'mindfulness'}
                    ref={register}
                  />
                  <label 
                    htmlFor='mindfulness'
                    style={{ 
                      color: colors.mindfulness.hexColor,
                      backgroundColor: colors.mindfulness.rgbColor
                    }}
                  >
                    {colors.mindfulness.icon}
                    Mindfulness
                  </label>

                  
                  <input 
                    type='radio'
                    name='category'
                    id='exercise'
                    value='exercise'
                    defaultChecked={step1Data.category === 'exercise'}
                    ref={register}
                  />
                  <label 
                    htmlFor='exercise'
                    style={{ 
                      color: colors.exercise.hexColor,
                      backgroundColor: colors.exercise.rgbColor
                    }}
                  >
                    {colors.exercise.icon}
                    Exercise
                  </label>

                  
                  <input 
                    type='radio'
                    name='category'
                    id='tech'
                    value='tech'
                    defaultChecked={step1Data.category === 'tech'}
                    ref={register}
                  />
                  <label 
                    htmlFor='tech'
                    style={{ 
                      color: colors.tech.hexColor,
                      backgroundColor: colors.tech.rgbColor
                    }}
                  >
                    {colors.tech.icon}
                    Tech
                  </label>

                  
                  <input 
                    type='radio'
                    name='category'
                    id='arts'
                    value='arts'
                    defaultChecked={step1Data.category === 'arts'}
                    ref={register}
                  />
                  <label 
                    htmlFor='arts'
                    style={{ 
                      color: colors.arts.hexColor,
                      backgroundColor: colors.arts.rgbColor
                    }}
                  >
                    {colors.arts.icon}
                    Arts & Crafts
                  </label>

                  
                  <input 
                    type='radio'
                    name='category'
                    id='other'
                    value='other'
                    defaultChecked={step1Data.category === 'other'}
                    ref={register}
                  />
                  <label 
                    htmlFor='other'
                    style={{ 
                      color: colors.other.hexColor,
                      backgroundColor: colors.other.rgbColor
                    }}
                  >
                    {colors.other.icon}
                    Other
                  </label>
                </div>
              </div>

            </div>
          </div>

          <MobileStepper
            variant='progress'
            steps={5}
            position='static'
            activeStep={0}
            nextButton={
              <Button size='small' type='button' onClick={continueToStep2}>
                Next
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button size='small' type='button' disabled>
                <KeyboardArrowLeft />
                Back
              </Button>
            }
          />

        </div>
        }

        {step === 2 &&
        <div className='form_steps form_step2'>

          <h2>STEP TWO - Daily Challenges</h2>
          <p className='form_subtitle'>Each day must have a title and a description. Be concise and to the point - you can always edit the course later.</p>

          {days.map(day => (
            <FormDayInput 
              day={day}
              color={getPrimaryColor(step1Data.category)}
              removeDay={removeDay}
              handleDayChange={handleDayChange}
              key={day.dayNumber}
            />
          ))}

          {days.length < 30 
            ? <Button type='button' onClick={() => addDay(5)}>Add day</Button>
            : <Button type='button' disabled>Add day</Button>
          }

          {backendErr &&
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Oops! Something went wrong. Please check your form information and submit it again.
            </Alert>
          }

          <MobileStepper
            variant='progress'
            steps={5}
            position='static'
            activeStep={activeStep()}
            nextButton={
              <Button 
                size='small' 
                type='submit' 
                disabled={validateThirtyDays()}
              >
                {props.mode === 'edit'
                  ? <span>Edit Course</span>
                  : <span>Create Course</span>
                }
                <LibraryAddCheckIcon />
              </Button>
            }
            backButton={
              <Button size='small' type='button' onClick={() => setStep(1)}>
                <KeyboardArrowLeft />
                Back
              </Button>
            }
          />

        </div>
        }

      </form>
    </div>
  )
}

export default MainForm;
