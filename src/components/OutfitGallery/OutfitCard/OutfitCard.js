import React, {Component } from 'react';
import './OutfitCard.css';

class OutfitCard extends Component{

    handleDeleteClick = () => {
        this.props.deleteOutfit(this.props.outfit.id);
    }

   
    render(){
        return(
            <div className="outfitCard">
                {/*This will display the image of the garment in a card format*/}
                
                <h3> {this.props.outfit.garment_name}</h3>
                <img className="topImg" src={this.props.outfit.top_url} alt="outfit"></img>
                <h3> {this.props.outfit.garment_name}</h3>
                <img className="bottomImg"src={this.props.outfit.bottom_url} alt="outfit"></img>
                <br/>
                <h3>{this.props.outfit.notes}</h3>
                <br/>
                <button onClick={() => { if (window.confirm('Are you sure you wish to delete this outfit?')) this.handleDeleteClick()}}>Delete</button>
            </div>
        )}

}

export default OutfitCard;