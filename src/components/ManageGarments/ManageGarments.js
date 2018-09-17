//imports
import React, { Component } from 'react';
import Nav from '../../components/Nav/Nav';
import GarmentCard from './GarmentCard/GarmentCard.js';
import axios from 'axios';
import './ManageGarments.css';


//class extends components
class ManageGarments extends Component{

    //constructor
    constructor(props) {
        super(props);
        this.state ={
            garments: [],
        }
    }

    //componentDidMount
    componentDidMount(){
        //put things here to run on page-load
        this.getGarments();
    }
    //arrow functions
    getGarments = () => {
        axios({
            method: 'GET',
            url:'/api/garments',
        }).then((response)=>{
            console.log(response.data);
            this.setState({
                garments: response.data,
            })
        }).catch((error)=>{
                console.log(error, 'Issue getting garments');
                alert('Garments could\'t be obtained');
        })
    }
    deleteGarment = (id) => {
        console.log('in delete garment');
        axios({
            method: 'DELETE',
            url:'/api/garments/' + id,
        }).then((response)=>{
            console.log(response.data);
            this.getGarments();
        }).catch((error)=>{
                console.log(error, 'Issue deleting Garment');
                alert('Garment could\'t be deleted');
        })
    }

    //render is what shows up on the page
    render() {
        return(
            //you can only return one thing, so wrap it all up in one div
            <div>
                <Nav />
                <button>Add New Garment</button>
                <div>
                    <p>Manage Existing Garments </p>
                    <button>Sort by</button>
                    <button>Filter By</button>
                    <button>More Filters</button>
                    <br/>
                    <div id="garmentDisplayContainer">
                    {/* This will be where the cards with each garment will be displayed. 
                        cards will be mapped over here and will appear in a grid*/}
                     {this.state.garments.map((garment, i)=>{
                                return(
                                    <GarmentCard key= {i} garment={garment}
                                                deleteGarment={this.deleteGarment} />
                                );
                            })}
                    </div>
                </div>
            </div>
        )
    }
}

//export component
export default ManageGarments;