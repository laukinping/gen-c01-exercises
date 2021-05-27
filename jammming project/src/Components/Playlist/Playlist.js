import React from 'react';
import TrackList from '../TrackList/TrackList';

import './Playlist.css';


class Playlist extends React.Component {
    constructor (props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);


    }

    handleNameChange (event) {

            this.props.onNameChange (event.target.value)
    }

    // componentDidUpdate(prevProps) {
    //     if(prevProps.playlistName !== this.props.playlistName) {
    //         this.setState({playlistName: this.props.playlistName})
    //     }


    // }
        


    render () {
        return (
            <div className="Playlist">
                <input  defaultValue={this.props.playlistName}  onChange={this.handleNameChange}  />
                <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true} playlistId = {this.props.playlistId}/>
                <button className="Playlist-save" onClick={this.props.onSave} >SAVE TO SPOTIFY</button>
            </div>
        );
    }
}

export default Playlist;

// onClick={() => window.location.reload(true)}