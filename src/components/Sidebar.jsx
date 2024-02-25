import PropTypes from 'prop-types';

export default function Sidebar({ setExerciseCategory }) {
  const bodyPartArray = ['Hand', 'Wrist', 'Elbow', 'Shoulder'];
  const exerciseTypeArray = ['AAROM', 'AROM', 'Resistance', 'Stretch'];

  function handleSideBarClick(e) {
    let category = e.target.innerText;
    let categoryLowerCase = category.toLowerCase();
    setExerciseCategory(categoryLowerCase);
  }

  return (
    <section id='sidebar'>
      <ul>
        <li>
          <a onClick={() => setExerciseCategory('all')}>All</a>
        </li>
      </ul>
      <ul className='bp-list'>
        <p>Body Part:</p>
        {bodyPartArray.map((bodyPart) => {
          return (
            <li key={`${bodyPart}Li`}>
              <a onClick={handleSideBarClick}>{bodyPart}</a>
            </li>
          );
        })}
      </ul>
      <ul className='et-list'>
        <p>Exercise Type:</p>
        {exerciseTypeArray.map((exerciseType) => {
          return (
            <li key={`${exerciseType}Li`}>
              <a onClick={handleSideBarClick}>{exerciseType}</a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

Sidebar.propTypes = {
  setExerciseCategory: PropTypes.func.isRequired,
};
