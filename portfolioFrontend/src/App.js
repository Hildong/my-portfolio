import React from 'react';
import homePage from './Views/homePage.js';
import projectPage from './Views/projectPage.js';
import contactPage from './Views/contact.js';
import errorPage from './Views/404.js';
import Nav from './Components/nav.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route path={["/", "/home"]} exact component={homePage} />
          <Route path="/projects" exact component={projectPage}/> 
          <Route path="/contact" exact component={contactPage}/>
          <Route component={errorPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
