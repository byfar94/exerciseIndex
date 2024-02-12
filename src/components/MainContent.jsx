import { useEffect, useState } from 'react';
import ExerciseCard from './ExerciseCard';
import { getExerciseData } from '../request';
import PropTypes from 'prop-types';
import rightArrow from '../assets/images/right-arrow.svg';

export default function MainContent({ toggleSidebar }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      const exerciseData = await getExerciseData();
      setData(exerciseData);
    };

    fetchDataAndUpdateState();
  }, []);

  return (
    <section id='main-content'>
      <div id='exercise-container'>
        <div id='cat-title-contain'>
          <h2
            onClick={toggleSidebar}
            className='cat-title'
            id='catagory-title-btn'
          >
            All exercises
            <img alt='dropdown icon' id='dropdown-icon' src={rightArrow}></img>
          </h2>
        </div>
        {data ? <ExerciseCard exerciseData={data}></ExerciseCard> : null}
      </div>
    </section>
  );
}

MainContent.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};
