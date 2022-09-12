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
import Login from './components/Login/Login';
import UcitanaPolisa from './components/Polise/UcitanaPolisa';
 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const stavke1 = [

  new GlavniMeniItem("Home", "/"),
  new GlavniMeniItem("Polise", "/polise"),
  new GlavniMeniItem("Klijenti", "/klijenti"),
  new GlavniMeniItem("Login", "/login"),

];

root.render(
  <React.StrictMode>
    <GlavniMeni stavke={stavke1}></GlavniMeni>
    <HashRouter>
      <Switch>
        <Route   exact path='/' component={App} />
        <Route exact path='/klijenti' component={Klijenti} />
        <Route exact path='/polise' component={Polise} />
        <Route exact path='/login' component={Login} />
        <Route  path='/create-or-update-polisa/:id'  exact component={UcitanaPolisa}></Route>

      </Switch>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
