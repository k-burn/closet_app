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
            topSelected: '',
            bottomSelected: '',
            addNewOutfit: false,
            winter: false,
            spring: false,
            summer: false,
            fall: false,
            goodFor: [],
            minTemp: -10 ,
            maxTemp: 80 ,

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
    };

    sendFavToDatabase =() => { 
        console.log('in favoriteOutfit')
        axios({
            method: 'POST',
            url: '/api/outfits/favorites',
            data: this.state
        }).then((response)=>{
            console.log('Garment was successfully saved', response);
        }).catch((error)=>{
            console.log('an error has occurred when trying to save the outfit', error);
            alert('Error saving outfit')
        })
    }

    handleFavorite = () => {
        this.setState({
            topSelected: this.state.tops[this.state.topIndex],
            bottomSelected: this.state.bottoms[this.state.bottomIndex],
            addNewOutfit: true,
        })
    }

    //componentDidMount
    componentDidMount() {
        //put things here to run on page-load
        this.getTops();
        this.getBottoms();

    }
    handleCheckboxChange= (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({
            [event.target.name]: value
          })
    }
    //need to add a function to push entries in the GoodFor form into an array
    //pushToGoodFor = () => {

    //}
    //arrow functions

    //render is what shows up on the page
    render() {
        const selectedTop = this.state.tops[this.state.topIndex];
        const selectedBottom = this.state.bottoms[this.state.bottomIndex];
        const showAddForm = this.state.addNewOutfit;

        if (selectedTop && selectedBottom && !showAddForm) {
            return (
                //you can only return one thing, so wrap it all up in one div
                <div>
                    <Nav />
                    <p>Mix 'n Match View</p>
                    <p>{JSON.stringify(this.state.topSelected)}</p>
                    <button onClick={this.peruseTopsBackward}> Back </button>
                    <img src={selectedTop && selectedTop.image_path} className = "selectorDisplay" alt= {selectedTop.garment_name}/>
                    <button onClick={this.peruseTopsForward}> Forward </button>
                    <br />
                    <div className="mixMatchCard">
                        <div className="mMCardBody">
                            <img src={selectedTop && selectedTop.image_path} className= "mMTopImg" alt= {selectedTop.garment_name}/> {/* && delays the appearance of the second thing until the first thing is true */}
                            <img src={selectedBottom && selectedBottom.image_path} className= "mMBottomImg" alt= {selectedBottom.garment_name}/>
                        </div>
                        <button className="favBTN" onClick= {this.handleFavorite}>Favorite</button>
                    </div>
                    <br />
                    <button onClick={this.peruseBottomsBackward}> Back </button>
                    <img src={selectedBottom && selectedBottom.image_path} className = "selectorDisplay" alt= {selectedBottom.garment_name}/>
                    <button onClick={this.peruseBottomsForward}> Forward </button>
                </div>
            )
        } 
        else if (selectedTop && selectedBottom && showAddForm) {
            return (
                <div>
                     <Nav />
                    <p>Add Form</p>
                    <form>
                        <input placeholder="goodFor"></input>
                        <div>
                            Chip Box
                        </div>
                        <div id="seasonsCheckboxContainerOutfit">
                            <p>Season</p>
                            <input type="checkbox" name="winter"
                            checked={this.state.winter}
                            onChange={this.handleCheckboxChange}/>
                            <label htmlFor="winter">Winter</label>
                            <br/>
                            <input type="checkbox" name="spring"
                            checked={this.state.spring}
                            onChange={this.handleCheckboxChange}/>
                            <label htmlFor="spring">Spring</label>
                            <br/>
                            <input type="checkbox" name="summer"
                            checked={this.state.summer}
                            onChange={this.handleCheckboxChange}/>
                            <label htmlFor="summer">Summer</label>
                            <br/>
                            <input type="checkbox" name="fall"
                            checked={this.state.fall}
                            onChange={this.handleCheckboxChange}/>
                            <label htmlFor="fall">Fall</label>
                        </div> 
                        <input placeholder="Minimum temperature (F)"/>
                        <input placeholder= "Maximum temperature (F)"/>
                        <input placeholder ="caption"/>
                        <input type="submit"/>
                    </form>
                </div>
            )
        }
        else {   
            return <p> Cher: Christian said he’d call the next day, but in boy time that meant Thursday...</p>;
        }
    }
}

//export component
export default MixNMatch;