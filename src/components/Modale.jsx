import PropTypes from 'prop-types';
import { useEffect } from 'react';

export default function Modal({ isOpen, close, children }) {
  useEffect(() => {
    const handleKeyUp = (event) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener('keyup', handleKeyUp);
    }

    // Cleanup listener when the component unmounts or isOpen changes
    return () => document.removeEventListener('keyup', handleKeyUp);
  }, [isOpen, close]);

  //if the state is falsy then return null and the component will not be rendered
  if (!isOpen) return null;
  else {
    return (
      <div className='modal-overlay' onClick={close}>
        <div className='modal-content' onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func.isRequired,
  children: PropTypes.element,
};
