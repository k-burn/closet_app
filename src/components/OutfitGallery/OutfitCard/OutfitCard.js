import React, {Component } from 'react';
import './OutfitCard.css';

class OutfitCard extends Component{

    handleDeleteClick = () => {
        this.props.deleteOutfit(this.props.outfit.id);
    }

   
    render(){
        return(
            <div className="card">
                {/*This will display the image of the garment in a card format*/}
                
                <h3>Top id: {this.props.outfit.top_id}</h3>
                <h3>Bottom id: {this.props.outfit.bottom_id}</h3>
                <br/>
                <h3>{this.props.outfit.notes}</h3>
                <br/>
                <button onClick={() => { if (window.confirm('Are you sure you wish to delete this outfit?')) this.handleDeleteClick()}}>Delete</button>
            </div>
        )}

}

export default GarmentCard;