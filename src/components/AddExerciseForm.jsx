import { useState } from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function AddExerciseForm({
  close,
  isOpen,
  exerciseFormSubmitCount,
  setExerciseFormSubmitCount,
}) {
  const [extitle, setExtitle] = useState('');
  const [extype, setExtype] = useState('');
  const [bodypart, setBodypart] = useState('');
  const [summary, setSummary] = useState('');
  const [videoid, setVideoid] = useState('');
  const [imgFile, setImgFile] = useState(null);

  useEffect(() => {
    console.log(extitle);
    console.log(typeof setExtitle);
  }, [extitle]);

  async function sendExerciseData(e) {
    e.preventDefault();

    const fd = new FormData(e.target);

    try {
      const response = await fetch('./exercise', {
        method: 'POST',
        body: fd,
      });

      if (!response.ok) {
        console.error('network response not ok');
      }

      const data = response.json();
      console.log(data);
      console.log('data sent');
      //setExercise count will change when the form is submitted, this wil change the state of exerciseFormSubmitCount. There is a useEffect hook in ExerciseCard.jsx file that has exerciseFormSubmit count in its dependency array which will trigger the data to be reloaded so that the new card will show without a page refresh.
      setExerciseFormSubmitCount(
        (exerciseFormSubmitCount) => exerciseFormSubmitCount + 1,
      );
      // will toggle exerciseFormStatus, resulting in the html elements not being displayed, see logic in modale.jsx component
      close();
    } catch (err) {
      console.error(err);
    }
    if (!isOpen) return null;
  }

  return (
    <section id='form-contain'>
      <form
        id='exercise-form'
        encType='multipart/form-data'
        onSubmit={sendExerciseData}
      >
        <fieldset id='exercise-fieldset'>
          <legend>Add Exercise Card</legend>
          <div>
            <label htmlFor='extitle'>exercise title</label>
            <input
              type='text'
              id='extitle'
              name='extitle'
              value={extitle}
              onChange={(e) => {
                setExtitle(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <label htmlFor='extype'>exercise type</label>
            <input
              type='text'
              id='extype'
              name='extype'
              value={extype}
              onChange={(e) => {
                setExtype(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <label htmlFor='bodypart'>body part</label>
            <input
              type='text'
              id='bodypart'
              name='bodypart'
              value={bodypart}
              onChange={(e) => {
                setBodypart(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <label htmlFor='summary'>exercise summary</label>
            <textarea
              id='summary'
              name='summary'
              rows='6'
              value={summary}
              onChange={(e) => {
                setSummary(e.target.value);
              }}
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor='imgfile'> Image file</label>
            <input
              type='file'
              id='imgfile'
              name='imgfile'
              onChange={(e) => {
                setImgFile(e.target.files[0]);
              }}
            />
          </div>
          <div>
            <label htmlFor='videoid'>Video ID</label>
            <input
              type='text'
              id='videoid'
              name='videoid'
              value={videoid}
              onChange={(e) => {
                setVideoid(e.target.value);
              }}
            />
          </div>
          <div>
            <input type='submit' value='submit' id='exercise-form-submit' />
          </div>
        </fieldset>
      </form>
    </section>
  );
}

AddExerciseForm.propTypes = {
  close: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  exerciseFormSubmitCount: PropTypes.number,
  setExerciseFormSubmitCount: PropTypes.func.isRequired,
};
