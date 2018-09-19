//imports
import React, { Component } from 'react';
import Nav from '../../components/Nav/Nav';
import axios from 'axios';
import DressMeCard from './DressMeCard/DressMeCard.js'


//class extends components
class DressMe extends Component{

    //constructor
    constructor(props) {
        super(props);
        this.state ={
            outfit: [],
            dressMeClicked: false,
        }
    }

    componentDidMount(){
        //put things here to run on page-load
        //this.getRandomOutfit(); <-- not using this because I want the page to start on empty
    }
    //arrow functions
    
    getRandomOutfit = () => {
        axios({
            method: 'GET',
            url:'/api/outfits/random',
        }).then((response)=>{
            console.log(response.data);
            this.setState({
                outfit: response.data,
            })
        }).catch((error)=>{
                console.log(error, 'Issue getting outfits');
                alert('Outfits could\'t be obtained');
        })
    }
    handleDressMeClick = () => {
        this.setState({dressMeClicked: true});
        this.getRandomOutfit();
    }


    //render is what shows up on the page
    render() {
        //const dressMeClicked = this.state.dressMeClicked;
        //if(dressMeClicked) {

        //}
        return(
            //you can only return one thing, so wrap it all up in one div
            <div>
                <Nav />
                <div>
                    <p>Dress Me View</p>
                    {JSON.stringify(this.state)}
                    <br/>
                    <button id="dressMe" onClick={this.handleDressMeClick}>Dress Me</button>
                    <div id="outfitDisplayContainer">
                    {/* This will be where the cards with each garment will be displayed. 
                        cards will be mapped over here and will appear in a grid*/}
                     {this.state.outfit.map((outfit, i)=>{
                                return(
                                    <DressMeCard key= {i} outfit={outfit}/>
                                );
                            })}
                    </div>
                    <button onClick= {this.getRandomOutfit}> Ugh, as IF! </button>
                </div>
            </div>
        )
    }
}

//export component
export default DressMe;