import React from 'react'; 
import ChatApp from './Components/ChatApp'
import ChatRoom from './Components/ChatRoom'
import NotFoundPage from './Components/404'
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom' 


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path = "/" component = {ChatApp}/>
        <Route exact path = "/chatRoom" component = {ChatRoom}/>
        <Route path = "/404" component = {NotFoundPage}/>
        <Redirect to = "/404"/>
      </Switch>
    </Router>
  );
}

export default App;
