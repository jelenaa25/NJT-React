import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/HomePage/HomePage';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlavniMeni, GlavniMeniItem } from './components/GlavniMeni/GlavniMeni';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Klijenti from './components/Klijenti/Klijenti';
import Polise from './components/Polise/Polise';
 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const stavke1 = [

  new GlavniMeniItem("Home", "/"),
  new GlavniMeniItem("Polise", "/polise"),
  new GlavniMeniItem("Klijenti", "/klijenti"),

];

root.render(
  <React.StrictMode>
    <GlavniMeni stavke={stavke1}></GlavniMeni>
    <HashRouter>
      <Switch>
        <Route  path='/' exact component={App} />
        <Route  path='/klijenti' component={Klijenti} />
        <Route  path='/polise' component={Polise} />

      </Switch>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
