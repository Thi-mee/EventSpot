import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import AuthProvider from './providers/AuthProvider';
import EventProvider from './providers/EventProvider';
import OrganizerProvider from './providers/OrganizerProvider';
import ReservationProvider from './providers/ReservationProvider';
import UserProvider from './providers/UserProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <EventProvider>
        <ReservationProvider>
          <OrganizerProvider>
            <UserProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </UserProvider>
          </OrganizerProvider>
        </ReservationProvider>
      </EventProvider>
    </AuthProvider>
  </React.StrictMode>
);
