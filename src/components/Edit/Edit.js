import React, { Component } from "react";
import { connect } from "react-redux";

class Edit extends Component {
    state={
        movieEdits: {
            newTitle: '',
            newDescription: '',
            movieId: this.props.match.params.id
        }
    }

    backToHome = () =>{
        //bring user back to home page
        this.props.history.push('/');
    }

    handleChangeFor=(propertyName, event) => {
        //update local state upon usert inputs
        this.setState ({
            movieEdits: {
                ...this.state,
                [propertyName]:event.target.value
            }
        })
    }

    handleEditSave = () => {
        this.props.dispatch({type: '', payload: this.state})
    }

    editMovie = (text, id) => {
    this.props.dispatch({
    type: "CHANGE_FLICK",
    payload: {
    sendId: id,
    change: text
            }
    })
}


  render() {
   
    return (
      <div className="details">
        <h1 className="site-title">Edit</h1>
        <input placeholder="Edit Title" onChange={(event) => this.handleChangeFor('title', event)}></input>
        <br />
        <br />
        <textarea rows="10" cols="75" onChange={(event) => this.handleChangeFor('description', event)}/>
        <br />
        <button onClick={() => this.editMovie(this.state, this.props.location.state.title, this.props.location.state.description)}>Save</button>
        <br />
        <button onClick={this.backToHome}>Cancel</button>
      </div>
    )
  }
}

const putReduxStateOnProps = reduxState => ({
  reduxState
});

export default connect(putReduxStateOnProps)(Edit);
