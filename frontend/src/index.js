import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import AuthProvider from './providers/AuthProvider';
import EventProvider from './providers/EventProvider';
import OrganizerProvider from './providers/OrganizerProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <EventProvider>
        <OrganizerProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </OrganizerProvider>
      </EventProvider>
    </AuthProvider>
  </React.StrictMode>
);
