import React, {Component } from 'react';
import './GarmentCard.css';

class GarmentCard extends Component{
    constructor() {
        super();
        this.state = {
            showDetails: false,
        };
    }

    handleDeleteClick = () => {
        this.props.deleteGarment(this.props.garment.id);
    }
    handleInfoClick = (garment) => {
        console.log('in handleInfoClick. Garment: ', garment);
        this.props.showMoreInfo(garment)
    }
    handleMoreInfoClick = (event) => {
        console.log('clicked on moreInfo');
        // reverse state
        this.setState( {
            showDetails: !this.state.showDetails,
        });
        
    }
   
    render(){
        return(
            
            <div className="garmentCard">
                {/*This will display the image of the garment in a card format*/}
                <h3>{this.props.garment.garment_name}</h3>
                
                {this.state.showDetails ? 
                    <div className= "garmentContent">
                        <p>Comfort Level: {this.props.garment.comfort_level}</p>
                        <p>Wash Instructions: {this.props.garment.wash_instructions}</p>
                    </div>
                    :
                    <div className= "garmentContent">
                        <img className="garmentImage"src={this.props.garment.image_path} alt="garment"></img>
                    </div>
                }
                <br/>
                <button onClick={() => { if (window.confirm('Are you sure you wish to delete this garment?')) this.handleDeleteClick()}}>Delete</button>
                <button >Edit</button>
                <button onClick={this.handleMoreInfoClick}>More Info</button>
            </div>
        )}

}

export default GarmentCard;
