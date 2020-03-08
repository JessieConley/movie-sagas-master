import React, { Component } from "react";
import { connect } from "react-redux";
import swal from "sweetalert";
class Edit extends Component {
  state = {
    movieEdits: {
      movieTitle: '',
      movieDescription: ''
    }
  };
  editThis = (text, id) => {
    swal({
      title: "Are you sure? Once edit is submitted it is forever!",
      text: `NEW TITLE: ${text.movieEdits.title}. NEW DESCRIPTION: ${text.movieEdits.description}`,
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willEdit => {
      if (willEdit) {
        swal("And just like that you are now an editor!", {
          icon: "success"
        });
        this.props.dispatch({
          type: "EDIT_MOVIE",
          payload: { sendId: id, change: text }
        });
        this.props.history.goBack();
      } else {
        swal("Keeping you safe, heading back to detail page!");
        this.props.history.goBack();
      }
    });
  };
  handleChangeFor = (propertyName, event) => {
    this.setState({
      movieEdits: {
        ...this.state.movieEdits,
        [propertyName]: event.target.value
      }
    });
  };
  back = () => {
    console.log("go back to details page from edit");
    this.props.history.push({
      pathname: "/details",
      state: {
        id: this.props.location.state.id,
        title: this.props.location.state.title,
        poster: this.props.location.state.poster,
        description: this.props.location.state.description
      }
    });
  };
  render() {
    return (
      <div className="edit">
        <h1 className="site-title">EDIT PAGE</h1>
        <button onClick={this.back}>Back to Details</button>
        <h1 className="title">
          Curent Title: {this.props.location.state.title}
        </h1>
        <div className="posterDisplay" key={this.props.location.state.id}>
          <img className="poster" alt="poster" src={this.props.location.state.poster} />
      </div>
        <h3 className="title">Current Description:</h3>
        <div className="descriptionEdit">
          {this.props.location.state.description}
      </div>
        <textarea
          placeholder={this.props.location.state.title}
          onChange={event => this.handleChangeFor("title", event)}
        />
        <br />
        <textarea
          className="largeEdit"
          placeholder={this.props.location.state.description}
          onChange={event => this.handleChangeFor("description", event)}
        />
        <button
          className="editButton"
          onClick={() =>
            this.editThis(this.state, this.props.location.state.id)
          }
        >
          Submit Edit
        </button>
      </div>
    );
  }
}
const putReduxStateOnProps = reduxState => ({
  reduxState
});

export default connect(putReduxStateOnProps)(Edit);
