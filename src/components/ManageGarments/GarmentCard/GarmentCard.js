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
        const showDetails = this.state.showDetails
        const winter=this.props.garment.winter
        const spring=this.props.garment.spring
        const summer=this.props.garment.summer
        const fall=this.props.garment.fall
        const red=this.props.garment.red
        const orange=this.props.garment.orange
        const yellow=this.props.garment.yellow
        const green=this.props.garment.green
        const blue=this.props.garment.blue
        const purple=this.props.garment.purple
        const white=this.props.garment.white
        const grey=this.props.garment.grey
        const black=this.props.garment.black
        const tan=this.props.garment.tan
        const brown=this.props.garment.brown
        const pink=this.props.garment.pink


        return(
            
            <div className="garmentCard">
                {/*This will display the image of the garment in a card format*/}
                <h3>{this.props.garment.garment_name}</h3>
                
                {showDetails ? 
                    <div className= "garmentContent">
                        <p>Comfort Level: {this.props.garment.comfort_level}</p>
                        <p>Wash Instructions: {this.props.garment.wash_instructions}</p>
                        <p>Seasons: {winter && 'winter'} {spring && ' spring'} {summer && ' summer'} {fall && ' fall'}</p>
                        <p>Colors: {red && 'red'} {pink && 'pink'} {orange && 'orange'} {yellow && 'yellow'} {green && 'green'} {blue && 'blue'} {purple && 'purple'} {black && 'black'} {grey && 'grey'} {white && 'white'} {tan && 'tan'} {brown && 'brown'} </p>
                    </div>
                    :
                    <div className= "garmentContent">
                        <img className="garmentImage"src={this.props.garment.image_path} alt="garment"></img>
                    </div>
                }
                <br/>
                <button onClick={() => { if (window.confirm('Are you sure you wish to delete this garment?')) this.handleDeleteClick()}}>Delete</button>
                <button >Edit</button>
                <button  className ="infoBTN" onClick={this.handleMoreInfoClick}>{showDetails ? 'Show Image' : <img className="imgIcon" src={require("./information.svg")}/>}</button>
            </div>
        )}

}

export default GarmentCard;
