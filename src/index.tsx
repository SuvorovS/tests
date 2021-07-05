import React from 'react';
import ReactDOM from 'react-dom';
import { TestApp1 } from './TestApp1';
import { TestApp2 } from './TestApp2';

// import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter,
    Switch,
    Route,
    NavLink
} from "react-router-dom";
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="navigation">
          <NavLink to="/test-app-1" activeClassName="isActive">TestApp1</NavLink>
          <NavLink to="/test-app-2" activeClassName='isActive'>TestApp2</NavLink>
      </div>
      <Switch>
          <Route path="/test-app-1" component={TestApp1} />
          <Route path="/test-app-2" component={TestApp2} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
