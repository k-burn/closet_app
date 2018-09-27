//imports
import React, { Component } from 'react';
import Nav from '../../components/Nav/Nav';
import axios from 'axios';
import OutfitCard from './OutfitCard/OutfitCard.js';
import Header from '../../components/Header/Header';
import './OutfitGallery.css';


//class extends components
class OutfitGallery extends Component{
    constructor(props) {
        super(props);
        this.state ={
            outfits: [],
        }
    }

    //componentDidMount
    componentDidMount(){
        //put things here to run on page-load
        this.getOutfits();
    }
    //arrow functions
    getOutfits = () => {
        axios({
            method: 'GET',
            url:'/api/outfits',
        }).then((response)=>{
            console.log(response.data);
            this.setState({
                outfits: response.data,
            })
        }).catch((error)=>{
                console.log(error, 'Issue getting outfits');
                alert('Outfits could\'t be obtained');
        })
    }
    deleteOutfit = (id) => {
        console.log('in delete outfit');
        axios({
            method: 'DELETE',
            url:'/api/outfits/' + id,
        }).then((response)=>{
            console.log(response.data);
            this.getOutfits();
        }).catch((error)=>{
                console.log(error, 'Issue deleting Outfit');
                alert('Outfit could\'t be deleted');
        })
    }

    handleNewOutfitClick = () => {
        console.log('Clicked New Outft button; redirecting to Mix\'nMatch View')
        this.props.history.push('mixNMatch');
    }

    //render is what shows up on the page
    render() {
        return(
            //you can only return one thing, so wrap it all up in one div
            <div>
                <Header title="Project Base" />
                <Nav />
                <button onClick={this.handleAddGarmentClick} >Add New Garment</button>
                <div id="manageOutfitsContainer">
                    <p>Manage Outfits </p>
                    <button>Sort by</button>
                    <button>Filter By</button>
                    <button>More Filters</button>
                    <br/>
                    <div id="outfitDisplayContainer">
                    {/* This will be where the cards with each garment will be displayed. 
                        cards will be mapped over here and will appear in a grid*/}
                     {this.state.outfits.map((outfit, i)=>{
                                return(
                                    <OutfitCard key= {i} outfit={outfit}
                                                deleteOutfit={this.deleteOutfit} />
                                );
                            })}
                    </div>
                </div>
            </div>
        )
    }
}

//export component
//export component
export default OutfitGallery;