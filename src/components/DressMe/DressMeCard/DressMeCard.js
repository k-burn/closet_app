import React, {Component } from 'react';

class DressMeCard extends Component{

   
    render(){
        return(
            <div className="outfitCard">
                {/*This will display the image of the garment in a card format*/}
                
                <h3>Top id: {this.props.outfit.top_id}</h3>
                <img className="topImg" src={this.props.outfit.top_url} alt="outfit"></img>
                <h3>Bottom id: {this.props.outfit.bottom_id}</h3>
                <img className="bottomImg"src={this.props.outfit.bottom_url} alt="outfit"></img>
                <br/>
                <h3>{this.props.outfit.notes}</h3>
                <br/>
            </div>
        )}

}

export default DressMeCard;