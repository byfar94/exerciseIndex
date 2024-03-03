import Search from './Search';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../App';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function Header({
  toggleExerciseForm,
  toggleLogInForm,
  setQuery,
}) {
  //user context
  const { currentUser } = useContext(AuthContext);

  //display correct button based on user log in status
  let userBtn;
  if (currentUser) {
    userBtn = (
      <button onClick={(e) => handleSignOut(e)} id='log-out-btn'>
        Log out
      </button>
    );
  } else {
    userBtn = (
      <button onClick={toggleLogInForm} id='log-in-btn'>
        Log In
      </button>
    );
  }

  //sign use out logic
  function handleSignOut(e) {
    e.preventDefault();

    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert('sign out successful');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <section id='header'>
        <div id='l-header-contain'>
          <img alt='site icon' id='site-icon'></img>
          <h1 id='main-header-title'>Exercise Index</h1>
        </div>
        <Search setQuery={setQuery}></Search>
        <div id='header-btn-contain'>
          <div id='user-btn-contain'>
            {/*user button toggle above*/}
            {userBtn}
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
  setQuery: PropTypes.func.isRequired,
};
