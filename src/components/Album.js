import React, { Component } from 'react';
import albumData from './../data/albums';


class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    const blankClassNames = album.songs.map( x => "");

    this.state = {
      album: album,
      currentSong: album.songs[0],
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

    let pauseArray = [];
      for (let i = 0; i < this.state.classNames.length; i++) {
        if (i === index) {
          pauseArray.push("icon ion-ios-pause");
        } else {
          pauseArray.push("");
      }
    }
    this.setState({ classNames: pauseArray });
  }

  handleMouseEnter(index) {
    console.log(this.state.classNames);

    let newArray = this.state.classNames.map((className, i) => {
      if (className === "icon ion-ios-pause") {
        return "icon ion-ios-pause";
      } else if (i === index) {
        return "icon ion-ios-play";
      } else {
        return "";
      }
    })

    this.setState({ classNames: newArray });
  }

  handleMouseLeave(index) {
    console.log('the mouse has left the building');

    let emptyArray = [];
    for (let i = 0; i <this.state.classNames.length; i++) {
      if (this.state.classNames[i] === "icon ion-ios-pause") {
        emptyArray.push("icon ion-ios-pause");
      } else {
        emptyArray.push("");
      }
    }

    this.setState ({ classNames: emptyArray});
  }
//
// let icons = album.songs.length(index);

//   <span className="">{index+1}</span>
//   <span className="">{index+1}</span>
//   <span className="">{index+1}</span>
//   <span className="">{index+1}</span>

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
            <tr className="song" key={index} onClick={() => this.handleSongClick(song, index)} onMouseEnter={() => this.handleMouseEnter(index)} onMouseLeave={() => this.handleMouseLeave(index)} >
              <td><span className={this.state.classNames[index]}>{index+1}</span></td>
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
