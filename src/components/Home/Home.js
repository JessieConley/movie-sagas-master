import React, { Component } from "react";
import "../App/App.css";
import { connect } from "react-redux";
import "./home.css";



class Home extends Component {
  //Fire on page load (display all movies)
  componentDidMount = () => {
    this.getMovies();
  };

  //Function to get all movies from SQL DB
  getMovies = () => {
    this.props.dispatch({ type: "FETCH_MOVIES" });
  };

  

//Function to advance user to Details page on click
  onClick = (flick) => {
    console.log('in imageClick', flick);
    this.props.history.push({
      pathname: '/details',
      state: {
        id: flick.id,
        title: flick.title,
        poster: flick.poster,
        description: flick.description,
        genre: flick.name
      }
    });
  };

  render() {
    // Display movies on the dom by mapping through each movie item from redux store
    return (
      <div className="homePage">
        <h2>Click on the movie poster below for more details.</h2>
        {this.props.reduxState.movies && (
          <div className="movieDisplay">
            {this.props.reduxState.movies.map(flick => (
              <div className="poster" key={flick.id}>
                <img
                  src={flick.poster}
                  alt={flick.title}
                  onClick={() => this.onClick(flick)}
                ></img>

                <br />
                <div className="title">{flick.title}</div>
                <br />
                <div className="description">{flick.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

const putReduxStateOnProps = reduxState => ({
  reduxState
});

export default connect(putReduxStateOnProps)(Home);
