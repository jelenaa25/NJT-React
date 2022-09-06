import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlavniMeni, GlavniMeniItem } from './components/GlavniMeni/GlavniMeni';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const stavke1 = [

  new GlavniMeniItem("Home", "/"),
  new GlavniMeniItem("Polise", "/klijenti"),
  new GlavniMeniItem("Klijenti", "/polise"),

];

root.render(
  <React.StrictMode>
    <GlavniMeni stavke={stavke1}></GlavniMeni>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
