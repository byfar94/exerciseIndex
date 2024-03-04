import PropTypes from 'prop-types';
import { handlePatchText, handlePatchImgFile } from '../request.js';

export default function EditCardForm({
  close,
  editSelectCategory,
  currentCardObj,
  editFormSubmitCount,
  setEditFormSubmitCount,
}) {
  function changeFormsubmitecount() {
    setEditFormSubmitCount((editFormSubmitCount) => editFormSubmitCount + 1);
    console.log(editFormSubmitCount);
  }

  function renderInput() {
    switch (editSelectCategory) {
      //case extitle, bodypart,extype,videoid
      case 'extitle':
      case 'bodypart':
      case 'extype':
      case 'videoid':
        return (
          <form
            id='text-edit-form'
            onSubmit={(e) => {
              handlePatchText(e, currentCardObj.id, close);
              changeFormsubmitecount();
            }}
          >
            <fieldset id='text-edit-fieldset'>
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
            id='img-edit-form'
            encType='multipart/form-data'
            onSubmit={(e) => {
              handlePatchImgFile(
                e,
                currentCardObj.id,
                currentCardObj.extitle,
                close,
              );
              changeFormsubmitecount();
            }}
          >
            <fieldset id='img-edit-fieldset'>
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
              handlePatchText(e, currentCardObj.id, close);
              changeFormsubmitecount();
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
  close: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  editSelectCategory: PropTypes.string,
  currentCardObj: PropTypes.object,
  editFormSubmitCount: PropTypes.number,
  setEditFormSubmitCount: PropTypes.func.isRequired,
};
