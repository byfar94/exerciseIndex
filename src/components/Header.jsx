import Search from './Search';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../App';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

//images
import weightSvg from '../assets/images/weight.svg';
import logInSvg from '../assets/images/log-in.svg';
import logOutSvg from '../assets/images/log-out.svg';
import AddSvg from '../assets/images/add.svg';

export default function Header({
  toggleExerciseForm,
  toggleLogInForm,
  setQuery,
  windowSize,
}) {
  //mobile screen size
  const mobileScreenSize = 650;
  console.log(windowSize.width);
  //user context
  const { currentUser, loadingAuth } = useContext(AuthContext);

  //display correct button based on user log in status

  function renderUserBtn() {
    if (loadingAuth === true) {
      return <p>loading...</p>;
    } else if (currentUser && !loadingAuth) {
      return (
        <button id='log-out-btn' onClick={(e) => handleSignOut(e)}>
          {windowSize.width > mobileScreenSize ? 'Log out' : null}
          <img alt='log-out' src={logOutSvg}></img>
        </button>
      );
    } else if (!currentUser && !loadingAuth) {
      return (
        <button id='log-in-btn' onClick={toggleLogInForm}>
          {windowSize.width > mobileScreenSize ? 'Log in' : null}
          <img alt='log-in' src={logInSvg}></img>
        </button>
      );
    }
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
          <img alt='site icon' id='site-icon' src={weightSvg}></img>
          <h1 id='main-header-title'>
            {windowSize.width > mobileScreenSize ? 'Exercise Index' : null}
          </h1>
        </div>
        <Search setQuery={setQuery}></Search>
        <div id='header-btn-contain'>
          <div id='user-btn-contain'>
            {/*user button toggle above*/}
            {renderUserBtn()}
          </div>
          {/* if current useing is true render elements below otherwise, return/render null */}
          {currentUser && (
            <div id='add-exercise-btn-contain'>
              <button onClick={toggleExerciseForm} id='add-exercise-btn'>
                {windowSize.width > mobileScreenSize ? 'Add Exercise' : null}
                <img alt='addition sign' src={AddSvg}></img>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

Header.propTypes = {
  toggleExerciseForm: PropTypes.func.isRequired,
  toggleLogInForm: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  windowSize: PropTypes.object,
};
