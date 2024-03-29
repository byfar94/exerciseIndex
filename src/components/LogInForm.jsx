import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import PropTypes from 'prop-types';

export default function LogInForm({ close }) {
  function handleLogInSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const email = fd.get('loginemailinput');
    const password = fd.get('loginpasswordinput');

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        alert('you are now logged in :)');
        close();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error({ errorCode, errorMessage });
      });
  }

  return (
    <>
      <div className='sign-in-contain' id='log-in-container'>
        <form id='log-in-form' className='my-form' onSubmit={handleLogInSubmit}>
          <fieldset id='log-in-fieldset'>
            <div className='email-contain'>
              <label id='loginemaillabel'>Email</label>
              <input
                id='loginemailinput'
                name='loginemailinput'
                type='email'
              ></input>
            </div>
            <div className='password-contain'>
              <label id='loginpasswordlabel'>Password</label>
              <input
                id='loginpasswordinput'
                name='loginpasswordinput'
                type='password'
              ></input>
            </div>
            <button
              id='log-in-submit-btn'
              name='log-in-submit-btn'
              type='submit'
              value='submit'
            >
              Log in
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
}

LogInForm.propTypes = {
  close: PropTypes.func.isRequired,
};
