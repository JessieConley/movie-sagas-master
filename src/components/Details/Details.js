import React, { Component } from 'react';
import {connect} from 'react-redux';
import "./details.css";



class Details extends Component {
  //Take user back to homepage on click
  backToHome = () => {
    this.props.history.push("/");
  };

  //Advance user to Edit page to edit movie on button click
  editMovie = event => {
    console.log("in editMovie");
    this.props.history.push({
      pathname: "/edit",
      state: {
        id: event.id,
        title: event.title,
        poster: event.poster,
        description: event.description,
        genre: event.genre
      }
    });
  };

  render() {
    console.log("in details", this.props.location.state);
    return (
      <div>
        {this.props.reduxState.movies && (
          <div className="details">
            <h1 className="movieDetail">Movie Details:</h1>
            <h1>{this.props.location.state.title}</h1>
            <div className="movieDisplay">
              <img alt="Poster" src={this.props.location.state.poster}></img>
            </div>
            <p>{this.props.location.state.description}</p>
            <h3>Genres:</h3>
            <p>{this.props.location.state.genre}</p>

            <button onClick={this.backToHome}>Back to Home</button>
            <button onClick={() => this.editMovie(this.props.location.state)}>
              Edit Movie Details
            </button>
            <br></br>
          </div>
        )}
      </div>
    );
  }
}
const putReduxStateOnProps = reduxState => ({
  reduxState
});

export default connect(putReduxStateOnProps)(Details);
