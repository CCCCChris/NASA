import React, { useState, useEffect } from 'react';
import APOD from './components/APOD';
import MarsRover from './components/MarsRover';
import EPIC from './components/EPIC';
import NeoWs from './components/NeoWs';

function App() {
  const [route, setRoute] = useState(window.location.hash || '#apod');

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  let content;
  if (route === '#mars') {
    content = <MarsRover />;
  } else if (route === '#epic') {
    content = <EPIC />;
  } else if (route === '#neos') {
    content = <NeoWs />;
  } else {
    content = <APOD />;
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: '#f4f6fa', minHeight: '100vh' }}>
      <nav style={{ background: '#222', color: '#fff', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 'bold', fontSize: 20 }}>NASA Explorer</div>
        <div>
          <a href="#apod" style={{ color: '#fff', marginRight: 24, textDecoration: 'none', fontWeight: 500 }}>APOD</a>
          <a href="#mars" style={{ color: '#fff', marginRight: 24, textDecoration: 'none', fontWeight: 500 }}>Mars Rover</a>
          <a href="#epic" style={{ color: '#fff', marginRight: 24, textDecoration: 'none', fontWeight: 500 }}>EPIC</a>
          <a href="#neos" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Near Earth Objects</a>
        </div>
      </nav>
      <main style={{ padding: '2rem 0' }}>
        {content}
      </main>
    </div>
  );
}

export default App; 