import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';


class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    const blankClassNames = album.songs.map((song, index) => {
      return "";
    });

    this.state = {
      album: album,
      currentSong: null,
      currentTime: 0,
      duration: album.songs[0].duration,
      currentVolume: 5,
      isPlaying: false,
      classNames: blankClassNames,
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumechange: e => {
        this.setState({ currentVolume: this.audioElement.currentVolume});
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
  }

  componentWillUnmount() {
     this.audioElement.src = null;
     this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
     this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
   }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song, index) {
    const isSameSong = this.state.currentSong === song;
    if ( this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
        this.play();
    }

    let clickArray = this.state.classNames.map((className, i) => {
        if (i === index && this.state.isPlaying === true) {
          return "icon ion-ios-play";
        } else if (i === index && this.state.isPlaying === false) {
          return "icon ion-ios-pause";
        } else {
          return "";
      }
    })

    this.setState({ classNames: clickArray });
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick(index) {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(currentIndex + 1, this.state.album.songs.length-1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  formatTime(sec) {
    let songTime = parseInt(sec, 10);
    if (typeof songTime == 'number') {
      let min = Math.floor(songTime / 60);
      let seconds = songTime - (min * 60);
      seconds = Math.round(seconds * 100) / 100

      let result = (min < 10 ? "0" + min : min);
      result += ":" + (seconds < 10 ? "0" + seconds : seconds);
      return result;
    } else {
      return "--:--"
    }
  }

  // formatTime(sec) {
  //   return(sec - (sec % 60)) / 60 + (9 < sec ? ':' : ':0') + sec;
  // }

  handleVolumeChange(e) {
    const newVolume = e.target.value / 10;
    this.audioElement.volume = newVolume;
    this.setState({ currentVolume: newVolume });
  }

  handleMouseEnter(index, song) {
     let onHover = this.state.classNames.map((className, i) => {
       if (this.state.isPlaying && this.state.album.songs[i] === this.state.currentSong) {
         return "icon ion-ios-pause";
     } else if (!this.state.isPlaying && this.state.album.songs[i] === this.state.currentSong){
       return "icon ion-ios-play";
     } else if (i === index && className === "") {
       return "icon ion-ios-play";
     } else {
       return "";
     }
   })
     this.setState({ classNames: onHover });
  }

  handleMouseLeave(index, song) {
    let offHover = this.state.classNames.map((className, i) => {
      if (this.state.isPlaying && this.state.album.songs[i] === this.state.currentSong) {
        return "icon ion-ios-pause";
      } else if (!this.state.isPlaying && this.state.album.songs[i] === this.state.currentSong){
        return "icon ion-ios-play";
      } else {
        return "";
      }
    })
    this.setState ({ classNames: offHover});
  }

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} className="album-pic"/>
            <div className="album-details">
              <h1 id="album-title">{this.state.album.title}</h1>
              <h2 className="artist">{this.state.album.artist}</h2>
              <div id="release-info">{this.state.album.releaseInfo}</div>
            </div>
        </section>
      <table id="song-list">
        <tbody>
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
            {this.state.album.songs.map( (song, index) =>
              <tr className="song" key={index} onClick={() => this.handleSongClick(song, index)} onMouseEnter={() => this.handleMouseEnter(index, song)} onMouseLeave={() => this.handleMouseLeave(index, song)} >
                <td><span className={this.state.classNames[index]}>{this.state.classNames[index] === "" ? index+1 : ""}</span></td>
                <td>{song.title}</td>
                <td>{this.formatTime(song.duration)}</td>
              </tr>
            )}
         </tbody>
       </table>
       <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          formatTime={(sec) => this.formatTime(sec)}
          currentVolume={this.audioElement.currentVolume}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
        />
      </section>
    );
  }
}

export default Album;
