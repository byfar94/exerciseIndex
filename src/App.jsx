import { useState } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Sidebar from './components/Sidebar';
import AddExerciseForm from './components/AddExerciseForm';
import LogInForm from './components/LogInForm';
import Modal from './components/Modale';

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

  return (
    <>
      <Header
        toggleExerciseForm={toggleExerciseForm}
        toggleLogInForm={toggleLogInForm}
      ></Header>
      <MainContent
        toggleSidebar={toggleSidebar}
        exerciseFormSubmitCount={exerciseFormSubmitCount}
        exerciseDeleteCount={exerciseDeleteCount}
        setExerciseDeleteCount={setExerciseDeleteCount}
      ></MainContent>
      <Modal isOpen={sidebarStatus} close={toggleSidebar}>
        <Sidebar />
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
    </>
  );
}

export default App;
