import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./LandingPage.scss";
import video from "../../assets/video.mp4";

export default class LandingPage extends Component {
  componentDidMount() {
    this.refs.video.play();
    var node = ReactDOM.findDOMNode(this.refs.landing);
  }
  render() {
    return (
      <div className="landing-page" ref="landing">
        <h1>Where did time go?</h1>
        <p>Turn your team on to productivity with Toggl teh time tracker.</p>
        <video ref="video" src={video} />
        <button>
          SIGN UP <span />
        </button>
      </div>
    );
  }
}
