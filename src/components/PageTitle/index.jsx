import React from 'react';
import './styles.css';
import { Divider } from '@material-ui/core';

const PageTitle = (props) => {
  const { mode, title } = props;

  return (
    <>
      <div className='title'>
        <div className='title_details'>
          <h1>{title}</h1>
          <img src={`/${mode}.png`} alt='' />
        </div>
        <div className='title_divider'>
          <Divider />
        </div>
      </div>
    </>
  )
}

export default PageTitle; 
