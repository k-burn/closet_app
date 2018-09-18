import React, {Component } from 'react';
import './GarmentCard.css';

class GarmentCard extends Component{

    handleDeleteClick = () => {
        this.props.deleteGarment(this.props.garment.id);
    }

   
    render(){
        return(
            <div className="card">
                {/*This will display the image of the garment in a card format*/}
                <h3>{this.props.garment.garment_name}</h3>
                <img className="garmentImage"src={this.props.garment.image_path} alt="garment"></img>
                <br/>
                <button onClick={() => { if (window.confirm('Are you sure you wish to delete this garment?')) this.handleDeleteClick()}}>Delete</button>
            </div>
        )}

}

export default GarmentCard;
