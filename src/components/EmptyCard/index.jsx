import React from 'react';
import { Link } from 'react-router-dom'; 
import { Button } from '@material-ui/core'; 
import './styles.css';

const EmptyCard = (props) => {
  return (
    <div className='card_empty'>
      <p>{props.message}</p>
      <Link to='/courses' className='card_empty-link'>
        <Button variant='outlined'>
          Browse Courses
        </Button>
      </Link>
    </div>
  )
}

export default EmptyCard;
