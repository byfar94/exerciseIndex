import EditSelectForm from './EditSelectForm';
import { handleDelete } from '../request';

export default function ExerciseCard({
  exerciseData,
  exerciseDeleteCount,
  setExerciseDeleteCount,
}) {
  return exerciseData.map((exercise) => (
    <div className='card-contain' key={exercise.id}>
      <img
        alt='exericse-img'
        className='card-pic'
        src={`https://exercise-index-images.s3.amazonaws.com/${exercise.imagepath}`}
      ></img>
      <h2 className='card-title'>{exercise.extitle}</h2>
      <p className='card-summary'>{exercise.summary}</p>
      <div className='card-video hide'>{exercise.videoid}</div>
      <div className='edit-btn-contain'>
        <button
          className='delete-btn'
          onClick={() => {
            handleDelete(exercise.id);
            setExerciseDeleteCount(exerciseDeleteCount + 1);
          }}
        >
          Delete
        </button>
        <EditSelectForm></EditSelectForm>
      </div>
    </div>
  ));
}
