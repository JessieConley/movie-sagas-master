import React, { Component } from 'react';
import {connect} from 'react-redux';


class Details extends Component {
  render() {
    console.log("in details", this.props.location.state);
    return (
      <div className="details">
        <h1 className="site-title">DETAILS</h1>

        <h1>{this.props.location.state.title}</h1>
        {/* <img src={this.props.location.state.poster}></img> */}
        <p>{this.props.location.state.description}</p>
      </div>
    );
  }
}
const putReduxStateOnProps = reduxState => ({
  reduxState
});

export default connect(putReduxStateOnProps)(Details);
