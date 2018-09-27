import React, {Component } from 'react';

class DressMeCard extends Component{

   
    render(){
        return(
            <div className="dressMeOutfitCard">
                {/*This will display the image of the garment in a card format*/}
                
                <img className="topImgDM" src={this.props.outfit.top_url} alt="outfit"></img>
                <img className="bottomImgDM"src={this.props.outfit.bottom_url} alt="outfit"></img>
                <br/>
                <h3>{this.props.outfit.notes}</h3>
                <br/>
            </div>
        )}

}

export default DressMeCard;