import React, { Component } from 'react';

 class PlayerBar extends Component {
   render() {
     return (
       <section className="player-bar">
        <section id="buttons">
          <button id="previous" onClick={this.props.handlePrevClick}>
            <span className="icon ion-ios-skip-backward"></span>
          </button>
          <button id="play-pause" onClick={this.props.handleSongClick} >
            <span className={this.props.isPlaying ? 'icon ion-ios-pause' : 'icon ion-ios-play'}></span>
          </button>
          <button id="next" onClick={this.props.handleNextClick}>
            <span className="icon ion-ios-skip-forward"></span>
          </button>
        </section>
        <section id="time-control">
          <div className="current-time">{this.props.formatTime(this.props.currentTime)}</div>
          <input
            type="range"
            className="seek-bar"
            value={(this.props.currentTime / this.props.duration) || 0}
            max="1"
            min="0"
            step="0.01"
            onChange={this.props.handleTimeChange}
          />
          <div className="total-time">{this.props.formatTime(this.props.duration)}</div>
        </section>
        <section id="volume-control">
          <div className="icon ion-ios-volume-low">{this.props.currentVolume}</div>
          <input
            type="range"
            className="seek-bar"
            value={this.props.currentVolume}
            max="10"
            min="0"
            step="1"
            onChange={this.props.handleVolumeChange}
          />
          <div className="icon ion-ios-volume-high">{this.props.currentVolume}</div>
        </section>
      </section>
     );
   }
 }

 export default PlayerBar;
