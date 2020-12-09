import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import * as Styles from './styles';

const CourseCard = (props) => {
  const { course } = props;

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
          <Link to={`/courses/${course.shortId}`}>
            <h2>{course.title}</h2>
          </Link>
          <h4>{course.smallDescription}</h4>
          <div>
            <FaHeart /> {course.likes} Likes
          </div>
        </div>
      </Styles.WrapperLeft>
      <div>
        <button>See more</button>
        <Link to={`/courses/edit/${course.shortId}`}>Edit Course</Link>
      </div>
    </Styles.Wrapper>
  )
}

export default CourseCard;