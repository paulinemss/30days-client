/* Main imports */ 
import React, { Component } from 'react';
import { 
  getOneChallenge, 
  updateChallenge, 
  deleteChallenge, 
  restartChallenge
} from '../../services/main';
import Loading from '../../components/Loading';
import QuitChallengeModal from '../../components/QuitChallengeModal';
import { getPrimaryColor } from '../../utils/helpers';

/* Styles imports */
import { 
  Button, 
  Checkbox, 
  Switch, 
  Modal, 
  FormControlLabel,
  Divider
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import tinycolor from 'tinycolor2';
import './style.css';

/* Component */ 
export default class SingleChallenge extends Component {
  state = {
    challenge: {},
    greeting: '',
    selectedDay: 1,
    streak: 0,
    checked: false,
    switch: false,
    loading: true,
    modalOpen: false,
    colors: {}
  }

  componentDidMount() {
    getOneChallenge(this.props.match.params.id)
      .then(res => {
        if (res.status) {
          this.setState({ 
            challenge: res.data,
            selectedDay: res.data.currentDay,
            loading: false,
            switch: !res.data.isPrivate,
            streak: res.data.completedDays.length,
            greeting: this.updateGreeting(),
            colors: getPrimaryColor(res.data.course.category)
          })
        } else {
          this.props.history.push('/404');
        }
      })
  }

  isUserTheOwner = () => {
    if (!this.props.user) { return false }
    return this.props.user._id === this.state.challenge.owner._id; 
  }

  updateGreeting = () => {
    const today = new Date()
    const hour = today.getHours()

    if (hour < 12) {
      return 'Good morning'
    } else if (hour < 18) {
      return 'Good afternoon'
    } else {
      return 'Good evening'
    }
  }

  handleChecked = (event) => {
    const challenge = { ...this.state.challenge };
    let currentDay = this.state.selectedDay; 
    const isDayChecked = event.target.checked; 

    if (isDayChecked) {
      // the day has been checked by the user
      challenge.completedDays.push(currentDay);
    } else {
      // the day has been checked off by the user
      const index = challenge.completedDays.indexOf(currentDay);
      challenge.completedDays.splice(index, 1);
    }

    if (challenge.completedDays.length === 0) {
      currentDay = 1;
      challenge.currentDay = currentDay;
    } else if (currentDay + 1 < 31) {
      const sortedArray = challenge.completedDays.slice();
      sortedArray.sort((a, b) => a - b); 
      currentDay = sortedArray[sortedArray.length-1] + 1; 
      challenge.currentDay = currentDay;
    } else {
      challenge.currentDay = 30;
    }

    updateChallenge(challenge, this.state.challenge._id)
      .then(res => {
        this.props.updateChallenges();
        this.setState({
          challenge: res.data,
          streak: res.data.completedDays.length
        })
      })
  };

  handleSwitch = (event) => {
    const challenge = { ...this.state.challenge };
    challenge.isPrivate = !event.target.checked;

    updateChallenge(challenge, this.state.challenge._id)
      .then(res => {
        console.log('response from updating switch', res);
        this.setState({
          challenge: res.data,
          switch: !res.data.isPrivate
        })
      })
  };

  selectDay = (dayNumber) => { 
    this.setState({
      selectedDay: dayNumber
    })
  }

  handleOpenModal = () => {
    this.setState({ modalOpen: true })
  }

  handleCloseModal = () => {
    this.setState({ modalOpen: false })
  }

  quitChallenge = () => {
    deleteChallenge(this.state.challenge.shortId).then(() => {
      this.props.updateChallenges();
      this.props.history.push('/');
    })
  }

  renewChallenge = () => {
    restartChallenge(this.state.challenge, this.state.challenge._id)
      .then(res => {
        this.setState({
          challenge: res.data,
          selectedDay: res.data.currentDay,
          switch: !res.data.isPrivate,
          streak: res.data.completedDays.length,
        })
      })
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    }

    const username = this.props.user.username.slice(0, 7);
    
    const ColorfulSwitch = withStyles({
      switchBase: {
        color: this.state.colors.hexColor,
        '&$checked': {
          color: this.state.colors.hexColor,
        },
        '&$checked + $track': {
          backgroundColor: this.state.colors.hexColor,
        },
      },
      checked: {},
      track: {},
    })(Switch);

    return (
      <div className='single'>
        <div className='header'>
          <div className='single_title'>
            <h1>
              {this.isUserTheOwner()
                ? <span>{this.state.greeting}, {username}</span>
                : <span>{this.state.greeting}</span>
              }
              
            </h1>
            <h2>How do you feel today?</h2>
          </div>
          <div className='single_right-top'>
            {this.isUserTheOwner() &&
              <div className='single_challenges-btns'>
                <Button onClick={this.renewChallenge}>
                  Restart Challenge
                </Button>
                <Button onClick={this.handleOpenModal}>
                  Quit Challenge
                </Button>
              </div>
            }

            <Modal 
              open={this.state.modalOpen}
              onClose={this.handleCloseModal}
            > 
              <div>
                <QuitChallengeModal 
                  quitChallenge={this.quitChallenge}
                  handleCloseModal={this.handleCloseModal}
                />
              </div>
            </Modal>

            <div className='single_share'>
              <p>Share your progress</p>
              {this.isUserTheOwner()
                ? <ColorfulSwitch
                  thumbSwitchedStyle={{ backgroundColor: 'grey' }}
                  checked={this.state.switch}
                  onChange={this.handleSwitch}
                  name='switch'
                />
                : <ColorfulSwitch
                  checked={this.state.switch}
                  name='switch'
                />
              }
            </div>

          </div>
        </div>

        <Divider />

        <div className='content'>
          <div className='single_side single_left'>
            <div className='single_media'>
              <img src={this.state.challenge.course.image} alt='' />
              <div>
                <h1>Day {this.state.selectedDay}</h1>
                <h4>30 days of {this.state.challenge.course.title}</h4>

                <div className='single_checkbox-div'>
                  {this.isUserTheOwner()
                    ? <Button className='single_checkbox-btn' style={{ backgroundColor: this.state.colors.hexColor }}><FormControlLabel
                      value="end"
                      control={<Checkbox
                        checked={this.state.challenge.completedDays.includes(this.state.selectedDay)}
                        onChange={this.handleChecked}
                        style={{ color: 'white' }}
                      />}
                      label={this.state.challenge.completedDays.includes(this.state.selectedDay) ? 'Completed' : "Complete Day"}
                      labelPlacement="end"
                    /></Button>
                    : <Button className='single_checkbox-btn' style={{ backgroundColor: this.state.colors.hexColor }}><FormControlLabel
                      value="end"
                      control={<Checkbox
                        checked={this.state.challenge.completedDays.includes(this.state.selectedDay)}
                        style={{ color: 'white' }}
                      />}
                      label={this.state.challenge.completedDays.includes(this.state.selectedDay) ? 'Completed' : "Complete Day"}
                      labelPlacement="end"
                    /></Button>
                  }
                </div>

              </div>
            </div>

            <div className='single_details'>
              <div className='single_details-top'>
                <div>
                  <p>Today's challenge</p>
                  <h3>
                    {this.state.challenge.course.days[this.state.selectedDay - 1].title}
                  </h3>
                </div>
              </div>

              <div className='single_details-bottom'>
                <p>{this.state.challenge.course.days[this.state.selectedDay - 1].description}</p>

                {this.state.challenge.course.days[this.state.selectedDay - 1].externalUrl && <Button>
                  <a 
                    href={this.state.challenge.course.days[this.state.selectedDay - 1].externalUrl}
                    target='_blank'
                    rel='noreferrer'
                  > 
                  External link
                  </a>
                </Button>}
              </div>
            </div>

          </div>

          <div className='single_side single_right'>
            <div className='single_calendar'>
              <div className='single_calendar-title'>
                <p>30 days of {this.state.challenge.course.title}</p>
              </div>
              <div className='single_numbers'>
                {this.state.challenge.course.days.map(day => {

                  const selected = this.state.selectedDay === day.dayNumber;
                  const completed = this.state.challenge.completedDays.includes(day.dayNumber);

                  let color, backgroundColor; 

                  if (selected && completed) {
                    color = '#fff';
                    backgroundColor = tinycolor(this.state.colors.hexColor).darken(10).toString()

                  } else if (completed) {
                    color = '#fff';
                    backgroundColor = this.state.colors.hexColor;

                  } else if (selected && !completed) {
                    color = this.state.colors.hexColor;
                    backgroundColor = this.state.colors.rgbColor;

                  } else {
                    color = '#161616';
                    backgroundColor = '#fff';

                  }

                  return (
                    <button 
                      onClick={() => this.selectDay(day.dayNumber)}
                      className={`single_calendar-num`}
                      style={{ color, backgroundColor }}
                      key={day._id}
                    >
                      {day.dayNumber}
                    </button>
                  )
                })}
              </div>
            </div>
            <div className='single_streak'>
              <h1>{this.state.streak}</h1>
              <p>Your current streak</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
