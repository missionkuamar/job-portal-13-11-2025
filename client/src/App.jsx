import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [message, setMessage] = useState('');  // Store the message from API
  const [error, setError] = useState('');  // Store the error message, if any

  useEffect(() => {
    axios.get('https://job-portal-13-11-2025.onrender.com/api/message')  // API endpoint for backend message
      .then(response => {
        console.log(response);
        setMessage(response.data.message);  // Update the state with the message from the backend
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);  // Log the error to console
        setError('There was an error fetching the data!');  // Set an error message to display in the UI
      });
  }, []);  // Empty dependency array so the request runs once when the component mounts

  return (
    <div className="App">
      <h1>Frontend & Backend Connected</h1>
      
      {/* Show the message from the backend */}
      <p>{message}</p>

      {/* Show error message if there was an issue fetching the data */}
      {error && <p>{error}</p>}

      {/* You don't need to use data here anymore */}
    </div>
  );
};

export default App;