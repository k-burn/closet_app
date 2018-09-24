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
            addNewOutfit: false, //this should default to false, but set to true to test form view
            winter: false,
            spring: false,
            summer: false,
            fall: false,
            goodFor: [],
            minTemp: -10 ,
            maxTemp: 80 ,
            comfort: 5,
            formality: 5,
            goodForInput: '',
            captions:'',

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

    sendFavToDatabase = async() => { 
        
        console.log('in sendFavToDatabase')
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

    handleFavoriteClick = () => {
        this.setState({
            topSelected: this.state.tops[this.state.topIndex],
            bottomSelected: this.state.bottoms[this.state.bottomIndex],
            addNewOutfit: true,
        })
    }

    handleOutfitFormSubmit = () => {
        this.sendFavToDatabase().then(this.setState({
            addNewOutfit: false,
        }))

    }

   pushToChipBox = (event) => {
       event.preventDefault();
        this.setState({
            goodFor: [...this.state.goodFor, this.state.goodForInput]
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
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
                        <button className="favBTN" onClick= {this.handleFavoriteClick}>Favorite</button>
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
                    {/*{JSON.stringify(this.state)}*/}
                    <form onSubmit={this.handleOutfitFormSubmit}>
                        <input name="goodForInput" placeholder="goodFor" onChange={this.handleChange} value={this.state.goodForInput}  ></input>
                        <button id="addGoodForBTN" onClick={this.pushToChipBox}>Add Key Word</button>
                        <div>
                            chip box
                            {JSON.stringify(this.state.goodFor)}
                            
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
                        <br/>
                        <label htmlFor="formality">Formality</label>
                        <input 
                        name="formality"
                        className= "slider"
                        type="range" 
                        min="1" max="10" 
                        value={this.state.formality}
                        onChange={this.handleChange}
                        step="1"/>
                        <br/>
                        <label htmlFor="comfort">Comfort</label>
                        <input 
                        name="comfort"
                        className= "slider"
                        type="range" 
                        min="1" max="10" 
                        value={this.state.comfort}
                        onChange={this.handleChange}
                        step="1"/>
                        <br/>
                        <input name="caption" placeholder ="caption" onChange={this.handleChange}/>
                        <br/>
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