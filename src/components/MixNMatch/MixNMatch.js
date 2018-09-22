//imports
import React, { Component } from 'react';
import Nav from '../../components/Nav/Nav';
import axios from 'axios';
import './MixNMatch.css';

//class extends components
class MixNMatch extends Component {

    //constructor
    constructor(props) {
        super(props);
        this.state = {
            tops: [],
            bottoms: [],
            topIndex: 0,
            bottomIndex: 0,

        }
    }


    getTops = () => {
        axios({
            method: 'GET',
            url: '/api/garments/tops',
        }).then((response) => {
            console.log(response.data);
            this.setState({
                tops: response.data,
            })
        }).catch((error) => {
            console.log(error, 'Issue getting tops');
            alert('Tops could\'t be obtained');
        })
    }

    getBottoms = () => {
        axios({
            method: 'GET',
            url: '/api/garments/bottoms',
        }).then((response) => {
            console.log(response.data);
            this.setState({
                bottoms: response.data,
            })
        }).catch((error) => {
            console.log(error, 'Issue getting bottoms');
            alert('Bottoms could\'t be obtained');
        })
    }
    peruseTopsForward = () => {
        if (this.state.topIndex >= (this.state.tops.length - 1)) {
            this.setState({
                topIndex: 0,
            })
        }
        else {
            this.setState({
                topIndex: this.state.topIndex + 1,
            })
        }
    }
    peruseTopsBackward = () => {
        console.log(' In Peruse Tops');
        if (0 >= this.state.topIndex) {
            this.setState({
                topIndex: this.state.tops.length - 1,
            })
        }
        else {
            this.setState({
                topIndex: this.state.topIndex - 1,
            })
        }
    }

    peruseBottomsForward = () => {
        if (this.state.bottomIndex >= (this.state.bottoms.length - 1)) {
            this.setState({
                bottomIndex: 0,
            })
        }
        else {
            this.setState({
                bottomIndex: this.state.bottomIndex + 1,
            })
        }
    }
    peruseBottomsBackward = () => {
        console.log(' In Peruse Tops');
        if (0 >= this.state.bottomIndex) {
            this.setState({
                bottomIndex: this.state.bottoms.length - 1,
            })
        }
        else {
            this.setState({
                bottomIndex: this.state.bottomIndex - 1,
            })
        }
    }

    handleFavoriteClick = () => {

    }


    //componentDidMount
    componentDidMount() {
        //put things here to run on page-load
        this.getTops();
        this.getBottoms();

    }
    //arrow functions

    //render is what shows up on the page
    render() {
        const selectedTop = this.state.tops[this.state.topIndex];
        const selectedBottom = this.state.bottoms[this.state.bottomIndex];

        if (selectedTop && selectedBottom) {
            return (
                //you can only return one thing, so wrap it all up in one div
                <div>
                    <Nav />
                    <p>Mix 'n Match View</p>
                    <button onClick={this.peruseTopsBackward}> Back </button>
                    <img src={selectedTop && selectedTop.image_path} className = "selectorDisplay" alt= {selectedTop.garment_name}/>
                    <button onClick={this.peruseTopsForward}> Forward </button>
                    <br />
                    <div className="mixMatchCard">
                        <div className="mMCardBody">
                            <img src={selectedTop && selectedTop.image_path} className= "mMTopImg" alt= {selectedTop.garment_name}/> {/* && delays the appearance of the second thing until the first thing is true */}
                            <img src={selectedBottom && selectedBottom.image_path} className= "mMBottomImg" alt= {selectedBottom.garment_name}/>
                        </div>
                        <button className="favBTN">Favorite</button>
                    </div>
                    <br />
                    <button onClick={this.peruseBottomsBackward}> Back </button>
                    <img src={selectedBottom && selectedBottom.image_path} className = "selectorDisplay" alt= {selectedBottom.garment_name}/>
                    <button onClick={this.peruseBottomsForward}> Forward </button>
                </div>
            )
        } 
        return <p> Cher: Christian said he’d call the next day, but in boy time that meant Thursday...</p>;
    }
}

//export component
export default MixNMatch;