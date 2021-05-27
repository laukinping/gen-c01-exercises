import React from 'react';
import './PlaylistListItem.css';


class PlaylistListItem extends React.Component {
    constructor(props){
        super(props);
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect() {
        
        this.props.onClick(this.props.id)
        // this.props.onClick(this.props.key)
        
    }
    render(){

        return (
            <div className="PlaylistListItem" >
                <div className="PlaylistListItem-information" onClick={this.onSelect}>
                    <h4>{this.props.name}  </h4>                
                </div>
                
            </div>
        )
    }
}

export default PlaylistListItem;