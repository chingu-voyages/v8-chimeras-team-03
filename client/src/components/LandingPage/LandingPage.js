import React, { Component } from "react";
import "./LandingPage.scss";
import video from "../../assets/video.mp4";

export default class LandingPage extends Component {
  componentDidMount() {
    this.refs.video.play(); // should be changed
  }
  render() {
    return (
      <div className="landing-page" ref="landing">
        <h1>Where did time go?</h1>
        <p>Turn your team on to productivity with Toggl teh time tracker.</p>
        <video ref="video" src={video} type="video/mp4" />
        <button>
          SIGN UP <span />
        </button>
      </div>
    );
  }
}
