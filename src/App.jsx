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

  return (
    <>
      <Header
        toggleExerciseForm={toggleExerciseForm}
        toggleLogInForm={toggleLogInForm}
      ></Header>
      <MainContent toggleSidebar={toggleSidebar}></MainContent>
      <Modal isOpen={sidebarStatus} close={toggleSidebar}>
        <Sidebar />
      </Modal>
      <Modal isOpen={exerciseFormStatus} close={toggleExerciseForm}>
        <AddExerciseForm />
      </Modal>
      <Modal isOpen={logInFormStatus} close={toggleLogInForm}>
        <LogInForm />
      </Modal>
    </>
  );
}

export default App;
