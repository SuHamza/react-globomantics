// A Hook that creates side effects
// when a state of a component changes
import { useEffect } from "react";
import logo from './logo.svg';
import './main-page.css';
import Header from './header';

function App() {
  // A Hook is a function
  // Whenever a 
  return (
    <div className="container">
      <Header subtitle="Providing Houses All over the World!" />
    </div>
  );
}

export default App;
