import React, {Component } from 'react';
import './GarmentCard.css';

class GarmentCard extends Component{

    handleClick = () => {
        this.props.deleteGarment(this.props.garment.id);
    }

    render(){
        return(
            <div className="card">
                {/*This will display the image of the garment in a card format*/}
                <img src={this.props.garment.image_path} alt="garment"></img>
                <button onClick={() => { if (window.confirm('Are you sure you wish to delete this garment?')) this.handleClick()}}>Delete</button>
            </div>
        )}

}

export default GarmentCard;
