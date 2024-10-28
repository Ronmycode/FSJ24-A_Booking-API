import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Import global libraries (Bootstrap and Toastr)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.min.css';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);