import React, { Component } from "react";
import { connect } from "react-redux";

class Edit extends Component {
  //Set initial state
  state = {
    movieEdits: {
      movieTitle: "",
      movieDescription: "",
    }
  };
  
  //Capture movie title and description change on input and set state to input
  handleChange = (fieldName, event) => {
     let updatedMovieEdits = {
      ...this.state.movieEdits
    };
    console.log(this.state.movieEdits);
    if (fieldName === "description") {
      updatedMovieEdits.movieDescription = event.target.value;
    } else if (fieldName === "title") {
      updatedMovieEdits.movieTitle = event.target.value;
    }
    this.setState({
      movieEdits: updatedMovieEdits
    });
  };

  //Save edit changes on click and dispatch to redux
  saveOnChange = event => {
    event.preventDefault();
    console.log("in saveOnChange", this.state.movieEdits);
    this.props.dispatch({
      type: "EDIT_MOVIE",
      payload: {...this.state.movieEdits, sendId:this.props.location.state.id}
    });
    this.setState({
      movieEdits: {
        movieDescription: "",
        movieTitle: ""
      }
    });
    this.props.history.push("/");
  };

  //Take user back to homepage on click
  back = () => {
    console.log("go back to details page from edit");
    this.props.history.push({
      pathname: "/details",
      state: {
        id: this.props.location.state.id,
        title: this.props.location.state.title,
        poster: this.props.location.state.poster,
        description: this.props.location.state.description,
        genre: this.props.location.state.genre
      }
    });
  };
  render() {
    return (
      <div>
        {this.props.location.state && (
          <div className="Edit">
            <h2>Edit Movie Details</h2>
            <h1>{this.props.location.state.title}</h1>
            <p>{this.props.location.state.description}</p>

            <input
              placeholder="Change Title"
              onChange={event => this.handleChange("title", event)}
            ></input>
            <br></br>
            <br></br>
            <form>
              <textarea
                rows="10"
                cols="50"
                placeholder="Update Description"
                onChange={event => this.handleChange("description", event)}
              ></textarea>
            </form>
            <br></br>

            <br></br>
            <button onClick={this.back}>Cancel</button>
            <button onClick={this.saveOnChange}>Save</button>
          </div>
        )}
      </div>
    );
  }
}
const putReduxStateOnProps = reduxState => ({
  reduxState
});

export default connect(putReduxStateOnProps)(Edit);
