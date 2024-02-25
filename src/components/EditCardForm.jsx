import PropTypes from 'prop-types';
import { handlePatchText, handlePatchImgFile } from '../request.js';

export default function EditCardForm({ editSelectCategory, currentCardObj }) {
  function renderInput() {
    switch (editSelectCategory) {
      //case extitle, bodypart,extype,videoid
      case 'extitle':
      case 'bodypart':
      case 'extype':
      case 'videoid':
        return (
          <form
            id='text-edit-from'
            onSubmit={(e) => {
              handlePatchText(e, currentCardObj.id);
            }}
          >
            <fieldset>
              <legend>Edit:</legend>
              <p>
                <label htmlFor={`${editSelectCategory}`}></label>
                <input
                  id={`${editSelectCategory}-edit-input`}
                  name={`${editSelectCategory}`}
                  type='text'
                ></input>
              </p>
              <p>
                <button type='submit'>Edit</button>
              </p>
            </fieldset>
          </form>
        );
      //case imgfile
      case 'imgfile':
        return (
          <form
            id='img-edit-from'
            encType='multipart/form-data'
            onSubmit={(e) => {
              handlePatchImgFile(e, currentCardObj.id, currentCardObj.extitle);
            }}
          >
            <fieldset>
              <legend>Edit:</legend>
              <p>
                <label htmlFor={`${editSelectCategory}`}></label>
                <input
                  id={`${editSelectCategory}-edit-input`}
                  name={`${editSelectCategory}`}
                  type='file'
                ></input>
              </p>
              <p>
                <button type='submit'>Edit</button>
              </p>
            </fieldset>
          </form>
        );
      //case summary
      case 'summary':
        return (
          <form
            id='summary-edit-from'
            onSubmit={(e) => {
              handlePatchText(e, currentCardObj.id);
            }}
          >
            <fieldset>
              <legend>Edit:</legend>
              <p>
                <label htmlFor={`${editSelectCategory}`}></label>
                <textarea
                  id={`${editSelectCategory}-edit-input`}
                  name={`${editSelectCategory}`}
                  rows='6'
                ></textarea>
              </p>
              <p>
                <button type='submit'>Edit</button>
              </p>
            </fieldset>
          </form>
        );
    }
  }

  return <>{renderInput()}</>;
}

EditCardForm.propTypes = {
  editSelectCategory: PropTypes.string,
  currentCardObj: PropTypes.object,
};
