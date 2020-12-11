import React from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton } from '@material-ui/core';
import SpaRoundedIcon from '@material-ui/icons/SpaRounded';
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import DonutLargeRoundedIcon from '@material-ui/icons/DonutLargeRounded';
import ComputerRoundedIcon from '@material-ui/icons/ComputerRounded';
import ColorLensRoundedIcon from '@material-ui/icons/ColorLensRounded';
import EmojiObjectsRoundedIcon from '@material-ui/icons/EmojiObjectsRounded';
import SportsHandballRoundedIcon from '@material-ui/icons/SportsHandballRounded';
import './styles.css'; 

const CourseCard = (props) => {
  const { challenge, course, mode, upvoteCourse, deleteCourse } = props;
  let hexColor, rgbColor, icon;

  if (course.category === 'mindfulness') {

    hexColor = '#2ae2be';
    rgbColor = 'rgba(42, 226, 190, 0.1)';
    icon = <SpaRoundedIcon style={{ color: hexColor }} />; 

  } else if (course.category === 'exercise') {

    hexColor = '#feb721';
    rgbColor = 'rgba(254, 183, 33, 0.1)';
    icon = <SportsHandballRoundedIcon style={{ color: hexColor }} />; 

  } else if (course.category === 'tech') {
    
    hexColor = '#6289ff';
    rgbColor = 'rgba(98, 137, 255, 0.1)';
    icon = <ComputerRoundedIcon style={{ color: hexColor }} />; 

  } else if (course.category === 'arts') {

    hexColor = '#8970ff';
    rgbColor = 'rgba(137, 112, 255, 0.1)';
    icon = <ColorLensRoundedIcon style={{ color: hexColor }} />; 

  } else if (course.category === 'other') {

    hexColor = '#ff7f7e';
    rgbColor = 'rgba(255, 127, 126, 0.1)';
    icon = <EmojiObjectsRoundedIcon style={{ color: hexColor }} />; 

  }

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
          <h2>30 days of... {course.title}</h2>
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