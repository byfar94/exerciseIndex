export default function EditSelectForm() {
  return (
    <form className='edit-select-form'>
      <select className='edit-options' name='edit-options'>
        <option className='option-edit'>Title</option>
        <option className='option-edit'>Summary</option>
        <option className='option-edit'>Body Part</option>
        <option className='option-edit'>Exercise Type</option>
        <option className='option-edit'>Image</option>
        <option className='option-edit'>Video</option>
      </select>
      <input
        id='editSelectSubmit'
        name='editSelectSubmit'
        value='Edit'
        type='submit'
      ></input>
    </form>
  );
}
