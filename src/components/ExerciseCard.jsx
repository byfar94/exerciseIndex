import EditSelectForm from './EditSelectForm';
import { handleDelete } from '../request.js';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../App.jsx';

export default function ExerciseCard({
  exerciseData,
  exerciseDeleteCount,
  setExerciseDeleteCount,
  toggleEditFormStatus,
  setEditSelectCategory,
  setCurrentCardObj,
}) {
  //user context
  const { currentUser } = useContext(AuthContext);

  //Video playing state
  const [playingVideoId, setPlayingVideoId] = useState(null);

  function StopVideoPlaying() {
    setPlayingVideoId(null);
  }

  function handleImgClick(id) {
    setPlayingVideoId(id);
    setTimeout(StopVideoPlaying, 15000);
  }

  return exerciseData.map((exercise) => (
    <div className='card-contain' key={exercise.id}>
      <img
        alt={exercise.extitle}
        className='card-pic'
        src={`https://exercise-index-images.s3.amazonaws.com/${exercise.id}.jpeg`}
        onClick={() => handleImgClick(exercise.id)}
      ></img>
      <h2 className='card-title'>{exercise.extitle}</h2>
      <p className='card-summary'>{exercise.summary}</p>
      {/* if video playing status is true then load this element otherwise, nothing will be loaded */}
      {playingVideoId === exercise.id && (
        <div className='card-video'>
          <iframe
            id={`player-${exercise.id}`}
            type='text/html'
            src={`https://www.youtube.com/embed/${exercise.videoid}?autoplay=1`}
          ></iframe>
        </div>
      )}
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
