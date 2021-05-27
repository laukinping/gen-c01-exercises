import React from 'react';

import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import PlaylistList from '../PlaylistList/PlaylistList';



class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: [] ,
      playlistId: null,
      deletedTracks: [],
      newTracks: []

    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.selectPlaylist = this.selectPlaylist.bind(this);

    }
  
    addTrack(track) {

        let tracks = this.state.playlistTracks;
        let newTrack = this.state.newTracks;
        if (tracks.find(savedTrack => savedTrack.id === track.id)) {
          return;
        } else {
          tracks.push(track);
          newTrack.push(track)
          this.setState({playlistTracks: tracks,
                          newTracks: newTrack});
        }
    }

    removeTrack(track){

      if(!this.state.playlistId){
      let tracks = this.state.playlistTracks;
      tracks = tracks.filter(currentTrack => currentTrack.id === track.id)
    
      this.setState({playlistTracks: tracks});

      } else {

        let tracks = this.state.playlistTracks;
        let deletedTracks = this.state.deletedTracks;
        deletedTracks.push( {uri: track.uri})

        tracks = tracks.filter(currentTrack => currentTrack.id !== track.id)
          this.setState({playlistTracks: tracks,
          deletedTracks: deletedTracks});
      }

    }

    updatePlaylistName(name) {
      this.setState({playlistName: name});
    }


    async savePlaylist () {

      if(this.state.playlistId) {
        const trackUris = this.state.newTracks.map(track => track.uri);
        const delTrackUris = this.state.deletedTracks;
        Spotify.savePlaylist(this.state.playlistName, trackUris, this.state.playlistId, delTrackUris).then (() => {
          this.setState({
            playlistName: 'New Playlist',
            playlistTracks: [],
            playlistId: null,
            deletedTracks: [],
            newTracks: [],
          })
        })
      } else {
      const trackUris = this.state.playlistTracks.map(track => track.uri);  
      Spotify.savePlaylist(this.state.playlistName, trackUris).then (() => {
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: [],
          playlistId: null,
          deletedTracks: [],
        })
      }) 
    }
      
    }

    search(term) {
      Spotify.search(term).then(searchResults => {
        this.setState({searchResults: searchResults})
      })
    }


    async selectPlaylist (id) {
      
      let tracks = this.state.playlistTracks;
      tracks = [];
      let playlistTracks = await Spotify.getPlaylist(id)

      if (playlistTracks.items.length === 0){
        return [];
      } else {
      for (let i=0; i<playlistTracks.items.length; i++){
        tracks.push({
          name: playlistTracks.items[i].track.name  ,
          id:  playlistTracks.items[i].track.id,
          artist: playlistTracks.items[i].track.artists[0].name ,
          album: playlistTracks.items[i].track.album.name  ,
          uri: playlistTracks.items[i].track.uri
        })

      }

    }

      let name = await Spotify.getPlaylistName(id)
        this.setState({
          playlistTracks: tracks,
          playlistName: name,
          playlistId: id,
          newTracks: []

      })
    }


  render() {
  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch = {this.search}/>
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults}
          onAdd={this.addTrack} />
          <Playlist playlistName={this.state.playlistName}
                    playlistTracks={this.state.playlistTracks}
                    onRemove={this.removeTrack}
                    onNameChange={this.updatePlaylistName}
                    onSave={this.savePlaylist}
                    key = {this.state.playlistId}
                    playlistId = {this.state.playlistId}

                    />
        </div>
        <div className = "App-users-details">

           <PlaylistList onClick ={this.selectPlaylist} playlistName ={this.state.playlistName}/>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
