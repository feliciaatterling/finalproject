import './App.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar.js';
import Catalog from './Catalog.js';
import Guides from './Guides.js';
import Contact from './Contact.js';

function App() {

  const [view, setView] = useState(0);

  const changeView = (updateTo) => {
    setView(updateTo);
  };

  return (
    <div className="d-flex">
      <Navbar changeView={changeView}/>
      <div className="flex-grow-1 p-3">
        {view === 0 && <Catalog />}
        {view === 1 && <Guides />}
        {view === 2 && <Contact />}
      </div>
    </div>
  );
}

export default App;
