import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './bootstrap.min.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import MonstersProvider from './context/monsters-context';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <MonstersProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MonstersProvider>

  // {/* </StrictMode> */}
);
