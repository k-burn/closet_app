//imports
import React, { Component } from 'react';
import Nav from '../../components/Nav/Nav';
import axios from 'axios';
import './MixNMatch.css';

//class extends components
class MixNMatch extends Component{
    
    //constructor
    constructor(props) {
        super(props);
        this.state ={
            tops: [],
            bottoms:[],
            selectedTop: {},
            selectedBottom: {},
            arrayIndex: 0,
        }
    }


    getTops = () => {
        axios({
            method: 'GET',
            url:'/api/garments/tops',
        }).then((response)=>{
            console.log(response.data);
            this.setState({
                tops: response.data,
            })
        }).catch((error)=>{
                console.log(error, 'Issue getting tops');
                alert('Tops could\'t be obtained');
        })
    }

    getBottoms = () => {
        axios({
            method: 'GET',
            url:'/api/garments/bottoms',
        }).then((response)=>{
            console.log(response.data);
            this.setState({
                bottoms: response.data,
            })
        }).catch((error)=>{
                console.log(error, 'Issue getting bottoms');
                alert('Bottoms could\'t be obtained');
        })
    }
    peruseTops = ()=> {
        console.log(this.state.tops[this.state.arrIndex]);
        this.setState({
            arrayIndex: +1
        })
        console.log(this.state.tops[this.state.arrIndex]);
        
    }

    //componentDidMount
    componentDidMount(){
        //put things here to run on page-load
        this.getTops();
        this.getBottoms();
        
    }
    //arrow functions

    //render is what shows up on the page
    render() {
        let selectedTop = this.state.tops[0];
        let selectedBottom = this.state.bottoms[0];
        
        
        return(
            //you can only return one thing, so wrap it all up in one div
            <div>
                <Nav />
                <p>Mix 'n Match View</p>
                <button> Back </button>
                <div className="picker">{JSON.stringify(selectedTop)}</div>
                <button> Forward </button>
                <br/>
                <div className="dressMeCard"></div>
                <br/>
                <button> Back </button>
                <div className="picker">{JSON.stringify(selectedBottom)}</div>
                <button> Forward </button>
                


            </div>
        )
    }
}

//export component
export default MixNMatch;