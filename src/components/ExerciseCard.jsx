import EditSelectForm from './EditSelectForm';

export default function ExerciseCard({ exerciseData }) {
  {
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
          <button className='delete-btn'>Delete</button>
          <EditSelectForm></EditSelectForm>
        </div>
      </div>
    ));
  }
}
