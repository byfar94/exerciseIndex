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
      case 'videoid':
        return (
          <form
            id='text-edit-form'
            className='my-form'
            onSubmit={(e) => {
              handlePatchText(e, currentCardObj.id, close);
              changeFormsubmitecount();
            }}
          >
            <fieldset id='text-edit-fieldset'>
              <legend>{`Edit: ${editSelectCategory} for ${currentCardObj.extitle}`}</legend>
              <div>
                <label htmlFor={`${editSelectCategory}`}></label>
                <input
                  id={`${editSelectCategory}-edit-input`}
                  name={`${editSelectCategory}`}
                  type='text'
                ></input>
              </div>
              <button type='submit'>Edit</button>
            </fieldset>
          </form>
        );

      case 'extype':
        return (
          <form
            id='extype_edit_form'
            className='my-form'
            onSubmit={(e) => {
              handlePatchText(e, currentCardObj.id, close);
              changeFormsubmitecount();
            }}
          >
            <fieldset id={`${editSelectCategory}_radio_fieldset`}>
              <legend>Exercise Type:</legend>
              <div>
                <label htmlFor='extype_radio_1'>AAROM</label>
                <input
                  type='radio'
                  id='edit_extype_radio_1'
                  name='extype'
                  value='AAROM'
                  required
                />
              </div>
              <div>
                <label htmlFor='extype_radio_2'>AROM</label>
                <input
                  type='radio'
                  id='edit_extype_radio_2'
                  name='extype'
                  value='AROM'
                  required
                />
              </div>
              <div>
                <label htmlFor='extype_radio_3'>Resistance</label>
                <input
                  type='radio'
                  id='edit_extype_radio_3'
                  name='extype'
                  value='Resistance'
                  required
                />
              </div>
              <div>
                <label htmlFor='extype_radio_4'>Stretch</label>
                <input
                  type='radio'
                  id='edit_extype_radio_4'
                  name='extype'
                  value='Stretch'
                  required
                />
              </div>
              <button type='submit'>Edit</button>
            </fieldset>
          </form>
        );

      case 'bodypart':
        return (
          <form
            id='bodypart_edit_form'
            className='my-form'
            onSubmit={(e) => {
              handlePatchText(e, currentCardObj.id, close);
              changeFormsubmitecount();
            }}
          >
            <fieldset id={`${editSelectCategory}_radio_fieldset`}>
              <legend>Body Part:</legend>
              <div>
                <label htmlFor='bodypart_radio_1'>Hand</label>
                <input
                  type='radio'
                  id='edit_bodypart_radio_1'
                  name='bodypart'
                  value='Hand'
                  required
                />
              </div>
              <div>
                <label htmlFor='bodypart_radio_2'>Wrist</label>
                <input
                  type='radio'
                  id='edit_bodypart_radio_2'
                  name='bodypart'
                  value='Wrist'
                  required
                />
              </div>
              <div>
                <label htmlFor='bodypart_radio_3'>Elbow</label>
                <input
                  type='radio'
                  id='edit_bodypart_radio_3'
                  name='bodypart'
                  value='Elbow'
                  required
                />
              </div>
              <div>
                <label htmlFor='bodypart_radio_4'>Shoulder</label>
                <input
                  type='radio'
                  id='edit_bodypart_radio_4'
                  name='bodypart'
                  value='Shoulder'
                  required
                />
              </div>
              <button type='submit'>Edit</button>
            </fieldset>
          </form>
        );

      //case img file
      case 'imgfile':
        return (
          <form
            id='img-edit-form'
            className='my-form'
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
              <legend>{`Edit: ${editSelectCategory} for ${currentCardObj.extitle}`}</legend>
              <div>
                <label htmlFor={`${editSelectCategory}`}></label>
                <input
                  id={`${editSelectCategory}-edit-input`}
                  name={`${editSelectCategory}`}
                  type='file'
                ></input>
              </div>
              <button type='submit'>Edit</button>
            </fieldset>
          </form>
        );
      //case summary
      case 'summary':
        return (
          <form
            id='summary-edit-from'
            className='my-form'
            onSubmit={(e) => {
              handlePatchText(e, currentCardObj.id, close);
              changeFormsubmitecount();
            }}
          >
            <fieldset>
              <legend>{`Edit: ${editSelectCategory} for ${currentCardObj.extitle}`}</legend>
              <div>
                <label htmlFor={`${editSelectCategory}`}></label>
                <textarea
                  id={`${editSelectCategory}-edit-input`}
                  name={`${editSelectCategory}`}
                  rows='6'
                ></textarea>
              </div>
              <button type='submit'>Edit</button>
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
