export default function LogInForm() {
  return (
    <>
      <div className='sign-in-contain' id='log-in-container'>
        <form id='log-in-form'>
          <fieldset id='log-in-fieldset'>
            <div className='email-contain'>
              <label id='loginemaillabel'>Email</label>
              <input id='loginemailinput' name='loginemailinput'></input>
            </div>
            <div className='password-contain'>
              <label id='loginpasswordlabel'>Password</label>
              <input id='loginpasswordinput' name='loginpasswordinput'></input>
            </div>
            <input
              id='log-in-submit-btn'
              name='log-in-submit-btn'
              type='submit'
              value='submit'
            ></input>
          </fieldset>
        </form>
      </div>
    </>
  );
}
