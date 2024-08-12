import React, { useState } from 'react';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('bg-dark', 'text-white');
    } else {
      document.body.classList.remove('bg-dark', 'text-white');
    }
  };

  return (
    <button className={`btn ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'} rounded-5`} onClick={toggleDarkMode}>
      <i className={`bi ${darkMode ? 'bi-sun' : 'bi-moon'}`}></i> 
      {/* {darkMode ? 'Modo Claro' : 'Modo Oscuro'} */}
    </button>
  );
};

export default DarkModeToggle;