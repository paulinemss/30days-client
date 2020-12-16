import React, { Component } from 'react';
import { Button, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import './styles.css';

export default class QuitChallengeModal extends Component {
  render() {
    const { handleCloseModal, quitChallenge, colors } = this.props;

    return (
      <div className='modal'>

        <div className='modal_top'>
          <div className='modal_txt'>
            <h2>Are you sure?</h2>
            <p>All data will be lost. You can always restart the challenge later.</p>
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

        <Button 
          className='modal_quit'
          onClick={quitChallenge} 
          variant="outlined" 
          style={{ color: colors.hexColor }}
        >
            Quit challenge
        </Button>

      </div>
    )
  }
}
