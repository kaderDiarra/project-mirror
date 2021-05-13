import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from './header/Header'
import Main from './main/Main'
import Home from './Home'
import Footer from './footer/Footer'
import Login from './authentification/Login'

// https://dev.to/nburgess/creating-a-react-app-with-react-router-and-an-express-backend-33l3
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/home" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
