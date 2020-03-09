import React, { Component } from 'react';
import { connect } from "react-redux";
import './App.css';
import { HashRouter as Router, Route } from "react-router-dom";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Details from "../Details/Details";
import Edit from "../Edit/Edit";


class App extends Component {
  // Renders the entire app on the DOM
  //Router set up
  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/details" component={Details} />
          <Route path="/edit" component={Edit} />
        </Router>
       
      </div>
    );
  }
}

const putReduxStateOnProps = reduxState => ({
  reduxState
});

export default connect(putReduxStateOnProps)(App);
