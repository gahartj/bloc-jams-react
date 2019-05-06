import React, { Component } from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import albumData from '/Users/jakegahart/web-dev/bloc/bloc-jams-react/src/data/albums';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }

  render() {
=======
import albumData from './../data/albums';

class Library extends Component {
  constructor(props) {
     super(props);
     this.state = { albums: albumData };
   }

   render() {
>>>>>>> checkpoint-5-components-library
    return (
      <section className='library'>
        {
          this.state.albums.map( (album, index) =>
            <Link to={`/album/${album.slug}`} key={index}>
              <img src={album.albumCover} alt={album.title} />
              <div>{album.title}</div>
              <div>{album.artist}</div>
              <div>{album.songs.length} songs</div>
            </Link>
          )
        }
      </section>
<<<<<<< HEAD
    );
  }
}
=======
     );
   }
 }
>>>>>>> checkpoint-5-components-library

export default Library;
