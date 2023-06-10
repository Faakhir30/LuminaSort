import React, { useState, useEffect } from 'react';
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "./Components/styles/Header.css";

import Header from "./Components/Header";
import Loader from "./Components/Loader"; // Import the Loader component

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data or asynchronous operation
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      <div className="App">
        {isLoading ? (
          <Loader /> // Display the Loader component when isLoading is true
        ) : (
          <Header /> // Render the Header component when isLoading is false
        )}
      </div>
    </>
  );
}

export default App;
