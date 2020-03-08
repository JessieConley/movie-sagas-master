import React, { Component } from "react";
import "../App/App.css";
import { connect } from "react-redux";



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
      <div className="home">
        {this.props.reduxState.movies && (
          <ul>
            {this.props.reduxState.movies.map(flick => (
              <li key={flick.id}>
                <img
                  src={flick.poster}
                  alt={flick.title}
                  onClick={() => this.onClick(flick)}
                ></img>
                <br />
                {flick.title} <br />
                {flick.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

const putReduxStateOnProps = reduxState => ({
  reduxState
});

export default connect(putReduxStateOnProps)(Home);
