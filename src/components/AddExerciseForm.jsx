export default function AddExerciseForm() {
  return (
    <section id='form-contain'>
      <form id='exercise-form' encType='multipart/form-data'>
        <fieldset id='exercise-fieldset'>
          <legend>Add Exercise Card</legend>
          <div>
            <label htmlFor='extitle'>exercise title</label>
            <input type='text' id='extitle' name='extitle' required />
          </div>
          <div>
            <label htmlFor='extype'>exercise type</label>
            <input type='text' id='extype' name='extype' required />
          </div>
          <div>
            <label htmlFor='bodypart'>body part</label>
            <input type='text' id='bodypart' name='bodypart' required />
          </div>
          <div>
            <label htmlFor='summary'>exercise summary</label>
            <textarea id='summary' name='summary' rows='6' required></textarea>
          </div>
          <div>
            <label htmlFor='imgfile'> Image file</label>
            <input type='file' id='imgfile' name='imgfile' required />
          </div>
          <div>
            <label htmlFor='videoid'>Video ID</label>
            <input type='text' id='videoid' name='videoid' />
          </div>
          <div>
            <input type='submit' value='submit' id='exercise-form-submit' />
          </div>
        </fieldset>
      </form>
    </section>
  );
}
