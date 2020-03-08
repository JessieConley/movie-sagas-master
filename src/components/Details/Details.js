import React, { Component } from 'react';
import {connect} from 'react-redux';



class Details extends Component {
 

  backToHome = () => {
    //Take user back to homepage on click
    this.props.history.push("/");
  };

  

  // editMovie = flick => {
  //   this.props.history.push({
  //     pathname: "/edit",
  //     state: {
  //       id: flick.id,
  //       title: flick.title,
  //       poster: flick.poster,
  //       description: flick.description
  //     }
  //   });
  // };
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

            <h3>Genres</h3>
       
            {/* <ul>{this.props.reduxState.displayGenres.map((genre, i) => (
            <li key={genre[i]}>{genre.name}</li>
            ))}
            </ul> */}

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
