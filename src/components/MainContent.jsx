import { useEffect, useState } from 'react';
import ExerciseCard from './ExerciseCard';
import { getExerciseData } from '../request';
import PropTypes from 'prop-types';
import rightArrow from '../assets/images/right-arrow.svg';
// filterValueOfKeyByQuery(arrayOfObjects, query, key)
import { filterValueOfKeyByQuery } from '../FilterQuery';

export default function MainContent({
  toggleSidebar,
  exerciseFormSubmitCount,
  exerciseDeleteCount,
  setExerciseDeleteCount,
  query,
  exerciseCategory,
  toggleEditFormStatus,
  setEditSelectCategory,
  setCurrentCardObj,
  editFormSubmitCount,
}) {
  const [data, setData] = useState(null);

  //will fetch data on load and when exericseFormSubmitCount changes which will be changed when form is submitted
  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      try {
        const exerciseData = await getExerciseData(exerciseCategory);
        setData(exerciseData);
      } catch (err) {
        console.error('failed to fetch exercise data');
      }
    };

    fetchDataAndUpdateState();
  }, [
    exerciseFormSubmitCount,
    exerciseDeleteCount,
    exerciseCategory,
    editFormSubmitCount,
  ]);

  // will filter data object
  let filteredData = filterValueOfKeyByQuery(data, query, 'extitle');

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
        {data ? (
          <ExerciseCard
            exerciseData={filteredData}
            exerciseDeleteCount={exerciseDeleteCount}
            setExerciseDeleteCount={setExerciseDeleteCount}
            toggleEditFormStatus={toggleEditFormStatus}
            setEditSelectCategory={setEditSelectCategory}
            setCurrentCardObj={setCurrentCardObj}
          ></ExerciseCard>
        ) : null}
      </div>
    </section>
  );
}

MainContent.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  exerciseFormSubmitCount: PropTypes.number,
  exerciseDeleteCount: PropTypes.number,
  setExerciseDeleteCount: PropTypes.func.isRequired,
  query: PropTypes.string,
  exerciseCategory: PropTypes.string,
  toggleEditFormStatus: PropTypes.func.isRequired,
  setEditSelectCategory: PropTypes.func.isRequired,
  setCurrentCardObj: PropTypes.func.isRequired,
  editFormSubmitCount: PropTypes.number,
};
