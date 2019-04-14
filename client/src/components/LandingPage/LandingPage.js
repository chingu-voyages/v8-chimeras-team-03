import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.scss";
import { Link } from "react-router-dom";
import video from "../../assets/video.mp4";

export default class LandingPage extends Component {
  componentDidMount() {
    this.refs.video.play();
  }
  render() {
    return (
      <div className="landing-page" ref="landing">
        <h1>Where did time go?</h1>
        <p>Turn your team on to productivity with Toggl the time tracker.</p>
        <video ref="video" src={video} />
        <button>
          <Link to="/signup" style={{ textDecoration: 'none', color:'white' }}>
            SIGN UP <span/>
          </Link>
        </button>
      </div>
    );
  }
}