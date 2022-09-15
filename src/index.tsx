import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/HomePage/HomePage';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlavniMeni, GlavniMeniItem } from './components/GlavniMeni/GlavniMeni';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Klijenti from './components/Klijenti/Klijenti';
import Login from './components/Login/Login';
import UcitanaPolisa from './components/Polise/UcitanaPolisa';
import Pokrice from './model/Pokrice';
import Pokrica from './components/Pokrice/Pokrica';
import PredmetiOsiguranja from './components/PredmetOsiguranja/PredmetiOsiguranja';
import Pokrice1 from './components/Pokrice/Pokrice';
import KreirajPolisu from './components/Polise/KreirajPolisu';
import Logout from './components/Login/Logout';
 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const stavke1 = [

  new GlavniMeniItem("Home", "/"), //to su sve polise 
  new GlavniMeniItem("Kreiranje polise", '/kreiraj-polisu'),
  new GlavniMeniItem("Predmeti", "/predmeti"),
  new GlavniMeniItem("Klijenti", "/klijenti"),
  new GlavniMeniItem("Pokrica", "/pokrica"),
  new GlavniMeniItem("Odjava", "/odjava"),

];
root.render(
  //<React.StrictMode>
    
    <HashRouter>
      <Switch>
        <Route   exact path='/' component={Login} />
        <Route exact path='/klijenti' component={Klijenti} />
        <Route exact path='/polise' component={App} />
        <Route exact path='/login' component={Login} />
        <Route  path='/create-or-update-polisa/:id'  exact component={UcitanaPolisa}></Route>
        <Route  path='/create-or-update-pokrice/:id'  exact component={Pokrice1}></Route>
        <Route  path='/pokrica'  exact component={Pokrica}></Route>
        <Route  path='/predmeti'  exact component={PredmetiOsiguranja}></Route>
        <Route  path='/kreiraj-polisu'  exact component={KreirajPolisu}></Route>
        <Route  path='/odjava'  exact component={Logout}></Route>

      </Switch>
    </HashRouter>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
