import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ChatAdmin from './components/pages/ChatAdmin';
import LoginAdmin from './components/pages/LoginAdmin';
import Auth from './components/pages/Auth';
import ChatState from './components/context/chats/ChatState';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <ChatState>
        <Router>
          <Switch>
            <Route exact path='/' component={Auth} />
            <Route exact path='/login' component={LoginAdmin} />
          </Switch>
        </Router>
      </ChatState>
    );
  }
}
