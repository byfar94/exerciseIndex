import { useEffect, useState } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Sidebar from './components/Sidebar';
import AddExerciseForm from './components/AddExerciseForm';
import LogInForm from './components/LogInForm';
import Modal from './components/Modale';
import EditCardForm from './components/EditCardForm';

function App() {
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
    </>
  );
}

export default App;
