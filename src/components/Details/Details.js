import React, { Component } from 'react';
import {connect} from 'react-redux';


class Details extends Component {
  componentDidMount = () => {
    // this.getDetails();
  };

  backToHome = () => {
    //Take user back to homepage on click
    this.props.history.push("/");
  };

  getGenres = () =>{
    //display movie genres with selected movie details
    this.props.dispatch ({type:'GET_GENRES' , payload: this.props.match.params.id})
  }

  editMovie = flick => {
    this.props.history.push({
      pathname: "/edit",
      state: {
        id: flick.id,
        title: flick.title,
        poster: flick.poster,
        description: flick.description
      }
    });
  };
  render() {
    console.log("in details", this.props.location.state);
    return (
      <div>
        {this.props.reduxState.movies && (
          <div className="details">
            <h1 className="site-title">Movie Detail</h1>
            <h1>{this.props.location.state.title}</h1>
            <img
              alt={this.props.location.state.poster}
              src={this.props.location.state.poster}
            ></img>
            <p>{this.props.location.state.description}</p>

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
