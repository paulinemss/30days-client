import React from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton } from '@material-ui/core';
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import DonutLargeRoundedIcon from '@material-ui/icons/DonutLargeRounded';
import { getPrimaryColor } from '../../utils/helpers';
import './styles.css'; 

const CourseCard = (props) => {
  const { challenge, course, mode, upvoteCourse, deleteCourse } = props;
  const { hexColor, rgbColor, icon } = getPrimaryColor(course.category);

  return (
    <div className='card'>
      <div 
        className='card_main'
        style={{ borderLeft: `4px solid ${hexColor}` }}
      >

        <div 
          className='card_icon'
          style={{ backgroundColor: rgbColor }}
        >
          {icon}
        </div>

        <div className='card_details'>
          <Link to={mode === 'course' 
            ? `/courses/${course.shortId}`
            : `/challenges/page/${challenge.shortId}`
          }>
            <h2>30 days of... {course.title}</h2>
          </Link>
          <p className='card_description'>{course.smallDescription}</p>
          
          {mode === 'course'
            ? <Button onClick={() => upvoteCourse(course)}>
                <p 
                  className='card_likes'
                  style={{ color: hexColor }}
                >
                  <ThumbUpAltRoundedIcon fontSize="small" />
                  <span>{course.likes} Likes</span>
                </p>
              </Button>
            : <Link to={`/challenges/page/${challenge.shortId}`}>
                <Button>
                  <p
                    className='card_likes'
                    style={{ color: hexColor }}
                  >
                    <DonutLargeRoundedIcon fontSize='small' />
                    <span>{challenge.completedDays.length} Days Completed</span>
                  </p>
                </Button>
              </Link>
          }
        </div>
        
      </div>

      <div className='card_right'>

        <div>
          <Link to={mode === 'course' 
            ? `/courses/${course.shortId}`
            : `/challenges/page/${challenge.shortId}`
          }>
            <IconButton>
              <NavigateNextRoundedIcon />
            </IconButton>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default CourseCard;