//imports
import React, { Component } from 'react';
import Nav from '../../components/Nav/Nav';
import axios from 'axios';
import DressMeCard from './DressMeCard/DressMeCard.js'
import Header from '../../components/Header/Header';
import './DressMe.css';

//class extends components
class DressMe extends Component{

    //constructor
    constructor(props) {
        super(props);
        this.state ={
            outfit: [], //<-- currently an empty array, but this is where the generated outfit will be stored
            dressMeClicked: false, //<--this records whether or not the dress me button has been clicked on the current page session
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

    handleWearIt = () => {
        alert(" You see how picky I am about my shoes and they only go on my feet.")
    }


    //render is what shows up on the page
    render() {
        return(
            //you can only return one thing, so wrap it all up in one div
            <div>
                <Header title="Project Base" />
                <Nav />
                <div id="dressMeContainer">
                    <br/>
                    {this.state.dressMeClicked ? null : <button id="dressMeBTN" onClick={this.handleDressMeClick}>Dress Me</button>}
                    {this.state.dressMeClicked ? <div id="dressMePressedContainer">
                        <div id="btnContainerN">
                            <button id="noBTN" onClick= {this.getRandomOutfit}> X <span className="asIF">Ugh, as IF!</span> </button>
                        </div>
                        <div id="dressMeDisplayContainer">
                        {/* This will be where the cards with each garment will be displayed. 
                            cards will be mapped over here and will appear in a grid*/}
                            {this.state.outfit.map((outfit, i)=>{
                                    return(
                                        <DressMeCard key= {i} outfit={outfit}/>
                                    );
                            })}
                        </div>
                        <div id="btnContainerY">
                            <button id="yesBTN" onClick= {this.handleWearIt}> ♥ <span className="wearIt">Wear it today!</span> </button>
                        </div>
                    </div> : null}
                </div>
            </div>
        )
    }
}

//export component
export default DressMe;