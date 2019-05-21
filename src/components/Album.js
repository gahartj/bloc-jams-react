import React, { Component } from 'react';
import albumData from './../data/albums';


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
      isPlaying: false,
      classNames: blankClassNames
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
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
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
            <div className="album-details">
              <h1 id="album-title">{this.state.album.title}</h1>
              <h2 className="artist">{this.state.album.artist}</h2>
              <div id="release-info">{this.state.album.releaseInfo}</div>
            </div>
        </section>

      <table id="song-list">
        <colgroup>
          <col id="song-number-column" />
          <col id="song-title-column" />
          <col id="song-duration-column" />
        </colgroup>
        <tbody>
          {this.state.album.songs.map( (song, index) =>
            <tr className="song" key={index} onClick={() => this.handleSongClick(song, index)} onMouseEnter={() => this.handleMouseEnter(index, song)} onMouseLeave={() => this.handleMouseLeave(index, song)} >
              <td><span className={this.state.classNames[index]}>{this.state.classNames[index] === "" ? index+1 : ""}</span></td>
              <td>{song.title}</td>
              <td>{song.duration}</td>
            </tr>
          )}
        </tbody>
       </table>

      </section>
    );
  }
}

export default Album;
