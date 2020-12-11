import React, { Component } from 'react';
import { Button, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import './styles.css';

export default class QuitChallengeModal extends Component {
  render() {
    const { handleCloseModal, quitChallenge } = this.props;

    return (
      <div className='modal'>

        <div>
          <h2>Are you sure?</h2>
          <p>All data will be lost.</p>
          <Button 
            onClick={quitChallenge} 
            variant="outlined" 
            color="secondary"
          >
            Quit challenge
          </Button>
        </div>

        <div>
          <IconButton 
            onClick={handleCloseModal} 
            aria-label='close-modal'
          >
            <CloseIcon />
          </IconButton>
        </div>

      </div>
    )
  }
}
