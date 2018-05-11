import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

//Components:
import Demo from './auth/Demo';
import Footer from './layout/Footer';
import Home from './isLoggedIn/Home';
import UserAuth from './auth/Login';
import Nav from './layout/Nav';
import NewTrip from './isLoggedIn/NewTrip';
import Profile from './isLoggedIn/Profile';
import Worldview from './isLoggedIn/WorldView';

// Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      user: null
    }
  };

  componentDidMount = () => {
    console.log('component did mount')
    this.getUser();
  }

  getUser = () => {
    console.log('get user');
    let token = localStorage.getItem('mernToken');
    if(token){
      console.log('token found in LS', token)
      axios.post('/auth/me/from/token', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(response => {
        console.log('SUCCESS!', response);
        this.setState({
          user: response.data.user
        });
      })
      .catch(err => {
        console.log('ERROR', err);
        console.log('response', err.response);
        localStorage.removeItem('mernToken');
        this.setState({
          user: null
        });
      });
    }
    else {
      console.log('No token was found')
      localStorage.removeItem('mernToken');
        this.setState({
          user: null
        })
    }
}


  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <Router> 
            <div className = "container">
              <Nav user={this.state.user} updateUser={this.getUser}/>
              <Route exact path="/" component={Home} /> 
              <Route path="/login" component={
                () => (<UserAuth user={this.state.user} updateUser={this.getUser} />) 
              } /> 
              <Route path="/demo" component={
                () => (<Demo user={this.state.user} updateUser={this.getUser} />) 
              } /> 
              <Route path="/profile" component={
                () => (<Profile user={this.state.user} />)} />
              <Route path="/newtrip" component={
                () => (<NewTrip user={this.state.user} />)} />
              <Route path="/worldview" component={
                () => (<Worldview user={this.state.user} />)} />
              </div>
            </Router>
          </MuiThemeProvider>
          <Footer />
      </div>
    );
  }
}

export default App;
