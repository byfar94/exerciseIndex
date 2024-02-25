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
    setexerciseFormStatus(!exerciseFormStatus);
  };

  //LoginForm State
  const [logInFormStatus, setlogInFormStatus] = useState(false);
  const toggleLogInForm = () => {
    setlogInFormStatus(!logInFormStatus);
  };

  const [exerciseFormSubmitCount, setExerciseFormSubmitCount] = useState(0);

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

  //current exericse card id
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
          editSelectCategory={editSelectCategory}
          currentCardObj={currentCardObj}
        />
      </Modal>
    </>
  );
}

export default App;
