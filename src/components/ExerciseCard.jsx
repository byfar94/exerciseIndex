import EditSelectForm from './EditSelectForm';
import { handleDelete } from '../request.js';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../App.jsx';

export default function ExerciseCard({
  exerciseData,
  exerciseDeleteCount,
  setExerciseDeleteCount,
  toggleEditFormStatus,
  setEditSelectCategory,
  setCurrentCardObj,
}) {
  const { currentUser } = useContext(AuthContext);

  return exerciseData.map((exercise) => (
    <div className='card-contain' key={exercise.id}>
      <img
        alt={exercise.extitle}
        className='card-pic'
        src={`https://exercise-index-images.s3.amazonaws.com/${exercise.id}.jpeg`}
      ></img>
      <h2 className='card-title'>{exercise.extitle}</h2>
      <p className='card-summary'>{exercise.summary}</p>
      <div className='card-video hide'>{exercise.videoid}</div>
      {/* if auth is true then render content in brackets otherwise render nothing */}
      {currentUser && (
        <div className='edit-btn-contain'>
          <button
            className='delete-btn'
            onClick={() => {
              handleDelete(exercise.id);
              setExerciseDeleteCount(exerciseDeleteCount + 1);
              console.log(exerciseDeleteCount);
            }}
          >
            Delete
          </button>
          <EditSelectForm
            toggleEditFormStatus={toggleEditFormStatus}
            setEditSelectCategory={setEditSelectCategory}
            cardObject={exercise}
            setCurrentCardObj={setCurrentCardObj}
          ></EditSelectForm>
        </div>
      )}
    </div>
  ));
}

ExerciseCard.propTypes = {
  toggleEditFormStatus: PropTypes.func.isRequired,
  setEditSelectCategory: PropTypes.func.isRequired,
  setCurrentCardObj: PropTypes.func.isRequired,
};
