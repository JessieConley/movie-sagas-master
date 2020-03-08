import React, { Component } from "react";
import { connect } from "react-redux";

class Edit extends Component {
  state = {
    movieEdits: {
      movieTitle: this.props.location.state.title,
      movieDescription: this.props.location.state.description,
      sendId: ""
    }
  };

  //   editThis = (text, id) => {
  //     swal({
  //       title: "Are you sure? Once edit is submitted it is forever!",
  //       text: `NEW TITLE: ${text.movieEdits.title}. NEW DESCRIPTION: ${text.movieEdits.description}`,
  //       icon: "warning",
  //       buttons: true,
  //       dangerMode: true
  //     }).then(willEdit => {
  //       if (willEdit) {
  //         swal("And just like that you are now an editor!", {
  //           icon: "success"
  //         });
  //         this.props.dispatch({
  //           type: "EDIT_MOVIE",
  //           payload: { sendId: id, change: text }
  //         });
  //         this.props.history.goBack();
  //       } else {
  //         swal("Keeping you safe, heading back to detail page!");
  //         this.props.history.goBack();
  //       }
  //     });
  //   };

  handleChangeForTitle = (movieTitle, event) => {
    this.setState({
      movieEdits: {
        movieDescription: this.props.location.state.description,
        sendId: this.props.location.state.id,
        movieTitle: event.target.value
      }
    });
  };

  handleChangeForDescription = (movieDescription, event) => {
    this.setState({
      movieEdits: {
        movieDescription: event.target.value,
        sendId: this.props.location.state.id,
        movieTitle: this.props.location.state.title
      }
    });
  };

    saveOnChange = event => {
      event.preventDefault();
      this.props.dispatch({
        type: "EDIT_MOVIE",
        payload: this.state.movieEdits
      });
      this.setState({
        movieEdits: {
          movieDescription: "",
          movieTitle: ""
        }
      });
      this.props.history.push("/");
    };

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
      <div className="Edit">
        <p>Movie Details</p>
        <h1>{this.props.location.state.title}</h1>
        <p>{this.props.location.state.description}</p>
        <form>
          <textarea
            rows="10"
            cols="50"
            placeholder="Update Description"
           
            onChange={event =>
              this.handleChangeForDescription("description", event)
            }
          ></textarea>
        </form>
        <input
          placeholder="Change Title"
          onChange={event => this.handleChangeForTitle("title", event)}
        ></input>
        <button onClick={this.back}>Cancel</button>
        <button onClick={this.saveOnChange}>Save</button>
      </div>
    );
  }
}
const putReduxStateOnProps = reduxState => ({
  reduxState
});

export default connect(putReduxStateOnProps)(Edit);
