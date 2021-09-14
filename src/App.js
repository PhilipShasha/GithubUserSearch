import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Button} from '@material-ui/core';
import Users from './Users';

class App extends React.Component {
  render(){
    return (
      <Router>
        <React.Fragment>
          <h1><Link to={'/'} id='title'>Github User Search</Link><br/></h1>
          <nav  id='startComponent'>
            <Button variant="outlined" to={'/users'} component={Link}>Start</Button>
            <br/><hr/>
          </nav>
          <div>
            <Route path='/'/>
            <Route path='/users' component={Users}/>
          </div>
        </React.Fragment>
      </Router>
    )
  }
}

export default App;