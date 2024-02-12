import Search from './Search';
import PropTypes from 'prop-types';

export default function Header({ toggleExerciseForm, toggleLogInForm }) {
  return (
    <>
      <section id='header'>
        <div id='l-header-contain'>
          <img id='site-icon'></img>
          <h1 id='main-header-title'>Exercise Index</h1>
        </div>
        <Search></Search>
        <div id='header-btn-contain'>
          <div id='user-btn-contain'>
            <button onClick={toggleLogInForm} id='log-in-btn'>
              Log In
              <img></img>
            </button>
            <button onClick={toggleLogInForm} id='log-out-btn'>
              Log out
              <img></img>
            </button>
          </div>
          <div id='add-exercise-btn-contain'>
            <button onClick={toggleExerciseForm} id='add-exercise-btn'>
              Add Exercise
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

Header.propTypes = {
  toggleExerciseForm: PropTypes.func.isRequired,
  toggleLogInForm: PropTypes.func.isRequired,
};
