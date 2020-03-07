import React, { Component } from "react";
import "../App/App.css";
import { connect } from "react-redux";
// import { HashRouter as Router, Link } from "react-router-dom";

class Home extends Component {
  componentDidMount = () => {
    this.getMovies();
  };

  getMovies = () => {
    this.props.dispatch({ type: 'FETCH_MOVIES' });
  };

  render() {
    // Display movies on the dom by mapping through  movies reducer from Index
    return (
      <div className="home">
        <ul>
          {this.props.reduxState.movies.map(flick => (
            <li key={flick.id}>
              <img src={flick.poster} alt={flick.title}></img><br/> {flick.title}<br/> {flick.description}
            </li>
          ))}
        </ul>
      </div>
    );} 
}

const putReduxStateOnProps = reduxState => ({
  reduxState
});

export default connect(putReduxStateOnProps)(Home);
