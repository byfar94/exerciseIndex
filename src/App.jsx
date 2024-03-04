import { useEffect, useState } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Sidebar from './components/Sidebar';
import AddExerciseForm from './components/AddExerciseForm';
import LogInForm from './components/LogInForm';
import Modal from './components/Modale';
import EditCardForm from './components/EditCardForm';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.js';
import { createContext } from 'react';

const AuthContext = createContext(null);

function App() {
  //auth

  const [loadingAuth, setLoadingAuth] = useState(true);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    //// `onAuthStateChanged` sets up a listener for authentication state changes.
    // It returns a function (saved here in `stopListeningToAuth`) that, when called,
    // will remove this listener. React will automatically call this cleanup function
    // to remove the listener either when the component unmounts or before the effect
    // re-runs, ensuring resources are properly managed and no memory leaks occur.
    const stopListeningToAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(`${uid} logged in`);
        setCurrentUser(user);
        setLoadingAuth(false);
        console.log(user);
      } else {
        // User is signed out
        setCurrentUser(null);
        setLoadingAuth(false);
      }
    });

    return stopListeningToAuth;
  });

  //sidebar State
  const [sidebarStatus, setSideBarStatus] = useState(false);
  const toggleSidebar = () => {
    setSideBarStatus(!sidebarStatus);
  };

  //exerciseform State
  const [exerciseFormStatus, setexerciseFormStatus] = useState(false);
  const toggleExerciseForm = () => {
    //will invert boolean value
    setexerciseFormStatus(!exerciseFormStatus);
  };

  const [exerciseFormSubmitCount, setExerciseFormSubmitCount] = useState(0);

  //LoginForm State
  const [logInFormStatus, setlogInFormStatus] = useState(false);
  const toggleLogInForm = () => {
    //will invert boolean value
    setlogInFormStatus(!logInFormStatus);
  };

  const [exerciseDeleteCount, setExerciseDeleteCount] = useState(0);

  //search query state
  const [query, setQuery] = useState('');

  useEffect(() => {
    console.log(query);
  }, [query]);

  //exercise category for sidebar
  const [exerciseCategory, setExerciseCategory] = useState('all');

  //select edit category for opening specific exericse card edit form
  const [editSelectCategory, setEditSelectCategory] = useState('');

  //edit form state

  const [editFormStatus, setEditFormStatus] = useState(false);
  const toggleEditFormStatus = () => {
    setEditFormStatus(!editFormStatus);
  };

  const [editFormSubmitCount, setEditFormSubmitCount] = useState(0);

  //current exericse card id, use in editing cards form
  const [currentCardObj, setCurrentCardObj] = useState({});

  return (
    <>
      <AuthContext.Provider
        value={{ currentUser, setCurrentUser, loadingAuth }}
      >
        <Header
          toggleExerciseForm={toggleExerciseForm}
          toggleLogInForm={toggleLogInForm}
          setQuery={setQuery}
        ></Header>
        <MainContent
          toggleSidebar={toggleSidebar}
          exerciseFormSubmitCount={exerciseFormSubmitCount}
          exerciseDeleteCount={exerciseDeleteCount}
          setExerciseDeleteCount={setExerciseDeleteCount}
          query={query}
          exerciseCategory={exerciseCategory}
          toggleEditFormStatus={toggleEditFormStatus}
          setEditSelectCategory={setEditSelectCategory}
          setCurrentCardObj={setCurrentCardObj}
          editFormSubmitCount={editFormSubmitCount}
        ></MainContent>
        <Modal isOpen={sidebarStatus} close={toggleSidebar}>
          <Sidebar setExerciseCategory={setExerciseCategory} />
        </Modal>
        <Modal isOpen={exerciseFormStatus} close={toggleExerciseForm}>
          <AddExerciseForm
            isOpen={exerciseFormStatus}
            close={toggleExerciseForm}
            exerciseFormSubmitCount={exerciseFormSubmitCount}
            setExerciseFormSubmitCount={setExerciseFormSubmitCount}
          />
        </Modal>
        <Modal isOpen={logInFormStatus} close={toggleLogInForm}>
          <LogInForm />
        </Modal>
        <Modal isOpen={editFormStatus} close={toggleEditFormStatus}>
          <EditCardForm
            isOpen={editFormStatus}
            close={toggleEditFormStatus}
            editSelectCategory={editSelectCategory}
            currentCardObj={currentCardObj}
            editFormSubmitCount={editFormSubmitCount}
            setEditFormSubmitCount={setEditFormSubmitCount}
          />
        </Modal>
      </AuthContext.Provider>
    </>
  );
}

export { App, AuthContext };
