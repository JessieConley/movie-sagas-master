import React, { Component } from "react";
import { connect } from "react-redux";

class Edit extends Component {
    state={
        movieEdits: {
            title: '',
            description: ''
        }
    }

    backToHome = () =>{
        this.props.history.push('/');
    }

    handleChangeFor=(propertyName, event) => {
        console.log('handle change', this.state.movieEdits);
        this.setState ({
            movieEdits: {
                ...this.state.movieEdits,
                [propertyName]:event.target.value
            }
        })
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
        <button onClick={() => this.editMovie(this.state, this.props.location.state.id)}>Save</button>
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
