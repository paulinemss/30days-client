import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import * as Styles from './styles';

const CourseCard = (props) => {
  const { challenge, course, mode } = props;

  return (
    <Styles.Wrapper>
      <Styles.WrapperLeft>
        <div>
          <Styles.Image 
            src={course.image} 
            alt={`30 days of ${course.title} logo`} 
          />
        </div>
        <div>
          {mode === 'course'
            ? <Link to={`/courses/${course.shortId}`}>
                <h2>{course.title}</h2>
              </Link>
            : <Link to={`/challenges/page/${challenge.shortId}`}>
                <h2>{course.title}</h2>
              </Link>
          }
          <h4>{course.smallDescription}</h4>
          <p>{course.category}</p>
          <div>
            <FaHeart /> {course.likes} Likes
          </div>
        </div>
      </Styles.WrapperLeft>
      <div>
        <button>See more</button>
        {props.canEdit && 
          <Link to={`/courses/edit/${course.shortId}`}>
            Edit Course
          </Link>
        }
        
      </div>
    </Styles.Wrapper>
  )
}

export default CourseCard;