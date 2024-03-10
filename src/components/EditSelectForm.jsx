import PropTypes from 'prop-types';

export default function EditSelectForm({
  toggleEditFormStatus,
  setEditSelectCategory,
  cardObject,
  setCurrentCardObj,
}) {
  function handleSelectOption(e) {
    e.preventDefault();
    toggleEditFormStatus();
    const selectedValue = e.target.elements['edit-options'].value;
    setEditSelectCategory(selectedValue);
    setCurrentCardObj(cardObject);
    console.log(selectedValue);
    console.log(cardObject);
  }
  return (
    <form className='edit-select-form' onSubmit={(e) => handleSelectOption(e)}>
      <label className='edit-options-label sr-only' htmlFor='edit-options'>
        Edit Options
      </label>
      <select className='edit-options' name='edit-options'>
        <option value='extitle' className='option-edit'>
          Title
        </option>
        <option value='summary' className='option-edit'>
          Summary
        </option>
        <option value='bodypart' className='option-edit'>
          Body Part
        </option>
        <option value='extype' className='option-edit'>
          Exercise Type
        </option>
        <option value='imgfile' className='option-edit'>
          Image
        </option>
        <option value='videoid' className='option-edit'>
          Video
        </option>
      </select>
      <button
        id={`editSelectSubmit-${cardObject.extitle}`}
        name='editSelectSubmit'
        value='Edit'
        type='submit'
      >
        Edit
      </button>
    </form>
  );
}

EditSelectForm.propTypes = {
  toggleEditFormStatus: PropTypes.func.isRequired,
  setEditSelectCategory: PropTypes.func.isRequired,
  cardObject: PropTypes.object,
  setCurrentCardObj: PropTypes.func.isRequired,
};
