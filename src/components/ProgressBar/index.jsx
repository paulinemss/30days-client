import React from 'react';
import './styles.css';

const ProgressBar = (props) => {
  const { backgroundColor, percentage } = props; 

  return (
    <div className='progress_container'>
      <div 
        className='progress_filler' 
        style={{ backgroundColor, width: `${percentage}%` }}
      >
        <span className='progress_label'>
          {`${percentage}%`}
        </span>
      </div>
    </div>
  )
}

export default ProgressBar;
