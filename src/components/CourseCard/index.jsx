import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton } from '@material-ui/core';
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import ProgressBar from '../../components/ProgressBar';
import { getPrimaryColor } from '../../utils/helpers';
import './styles.css'; 

export default class CourseCard extends Component {
  render() {

    const { 
      challenge, 
      course, 
      mode, 
      upvoteCourse,
      percentageCompleted
    } = this.props;

    const { hexColor, rgbColor, icon } = getPrimaryColor(course.category);

    return (
      <div 
        className={`card ${this.props.completed ? 'completed' : ''}`}
      >
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
                  <div
                    className='card_likes'
                    style={{ color: hexColor }}
                  > 
                    <ProgressBar 
                      backgroundColor={hexColor}
                      percentage={percentageCompleted}
                    />
                    <span className='card_completed-days'>
                      {challenge.completedDays.length} Days Completed
                    </span>
                  </div>
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
}


// const CourseCard = (props) => {
//   const { challenge, course, mode, upvoteCourse, percentageCompleted } = props;
//   const { hexColor, rgbColor, icon } = getPrimaryColor(course.category);

//   return (
//     <div className='card'>
//       <div 
//         className='card_main'
//         style={{ borderLeft: `4px solid ${hexColor}` }}
//       >

//         <div 
//           className='card_icon'
//           style={{ backgroundColor: rgbColor }}
//         >
//           {icon}
//         </div>

//         <div className='card_details'>
//           <Link to={mode === 'course' 
//             ? `/courses/${course.shortId}`
//             : `/challenges/page/${challenge.shortId}`
//           }>
//             <h2>30 days of... {course.title}</h2>
//           </Link>
//           <p className='card_description'>{course.smallDescription}</p>
          
//           {mode === 'course'
//             ? <Button onClick={() => upvoteCourse(course)}>
//               <p 
//                 className='card_likes'
//                 style={{ color: hexColor }}
//               >
//                 <ThumbUpAltRoundedIcon fontSize="small" />
//                 <span>{course.likes} Likes</span>
//               </p>
//             </Button>
//             : <Link to={`/challenges/page/${challenge.shortId}`}>
//               <Button>
//                 <div
//                   className='card_likes'
//                   style={{ color: hexColor }}
//                 > 
//                   <ProgressBar 
//                     backgroundColor={hexColor}
//                     percentage={percentageCompleted}
//                   />
//                   <span>{challenge.completedDays.length} Days Completed</span>
//                 </div>
//               </Button>
//             </Link>
//           }
//         </div>
        
//       </div>

//       <div className='card_right'>

//         <div>
//           <Link to={mode === 'course' 
//             ? `/courses/${course.shortId}`
//             : `/challenges/page/${challenge.shortId}`
//           }>
//             <IconButton>
//               <NavigateNextRoundedIcon />
//             </IconButton>
//           </Link>
//         </div>

//       </div>
//     </div>
//   )
// }

// export default CourseCard;