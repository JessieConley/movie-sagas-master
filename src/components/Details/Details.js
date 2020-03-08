import React, { Component } from 'react';
import {connect} from 'react-redux';



class Details extends Component {
  backToHome = () => {
    //Take user back to homepage on click
    this.props.history.push("/");
  };

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
            <h1 className="movieDetail">Movie Details</h1>
            <h1>{this.props.location.state.title}</h1>
            <div className="movieDisplay">
              <img alt="Poster" src={this.props.location.state.poster}></img>
            </div>
            <p>{this.props.location.state.description}</p>
            <p>{this.props.location.state.genre}</p>
            <h3>Genres</h3>

            <button onClick={this.backToHome}>Back to Home</button>
            <button onClick={() => this.editMovie(this.props.location.state)}>
              Edit
            </button>
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
