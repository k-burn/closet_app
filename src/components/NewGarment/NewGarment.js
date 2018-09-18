//imports
import React, { Component } from 'react';
import Nav from '../../components/Nav/Nav';


//class extends components
class NewGarment extends Component{

    //constructor
    constructor(props) {
        super(props);
        this.state ={
            name: '',
            type: '',
            red: '',
            orange: '',
            yellow:'',
            green: '',
            blue: '',
            purple: '',
            black: '',
            white: '',
            grey: '',
            pink:'',
            winter: '',
            spring: '',
            summer: '',
            fall:'',
            comfort: '5',
            wash_instructions:'',
        }
    }

    //componentDidMount
    //componentDidMount({
        //put things here to run on page-load
    //})
    //arrow functions
    handleSlide = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    //render is what shows up on the page
    render() {
        return(
            //you can only return one thing, so wrap it all up in one div
            <div>
                <Nav />
                <p>New Garment View</p>
                <form>
                    <input placeholder="garment name"></input>
                    <br/>
                    <select>
                        <option>top</option>
                        <option>bottom</option>
                    </select>
                    <br/>
                    <input placeholder="image url"></input>
                    <br/>
                    <div id="colorsCheckboxContainer">
                        <p>Colors</p>
                        <input type="checkbox" name="color" value= "red"/>
                        <label htmlFor="red">Red</label>
                        <input type="checkbox" name="color" value= "orange"/>
                        <label htmlFor="orange">Orange</label>
                        <br/>
                        <input type="checkbox" name="color" value= "yellow"/>
                        <label htmlFor="yellow">Yellow</label>
                        <input type="checkbox" name="color" value= "green"/>
                        <label htmlFor="green">Green</label>
                        <br/>
                        <input type="checkbox" name="color" value= "blue"/>
                        <label htmlFor="blue">Blue</label>
                        <input type="checkbox" name="color" value= "purple"/>
                        <label htmlFor="purple">Purple</label>
                        <br/>
                        <input type="checkbox" name="color" value= "black"/>
                        <label htmlFor="black">Black</label>
                        <input type="checkbox" name="color" value= "white"/>
                        <label htmlFor="white">White</label>
                        <br/>
                        <input type="checkbox" name="color" value= "grey"/>
                        <label htmlFor="grey">Grey</label>
                        <input type="checkbox" name="color" value= "pink"/>
                        <label htmlFor="pink">Pink</label>

                    </div>
                    <div id="seasonsCheckboxContainer">
                        <p>Season</p>
                        <input type="checkbox" name="season" value= "winter"/>
                        <label htmlFor="winter">Winter</label>
                        <br/>
                        <input type="checkbox" name="season" value= "spring"/>
                        <label htmlFor="spring">Spring</label>
                        <br/>
                        <input type="checkbox" name="season" value= "summer"/>
                        <label htmlFor="summer">Summer</label>
                        <br/>
                        <input type="checkbox" name="season" value= "fall"/>
                        <label htmlFor="fall">Fall</label>
                    </div>
                    <br/>
                    <label htmlFor="comfort">Comfort on a scale of 1-10</label>
                    <input 
                        name="comfort"
                        className= "slider"
                        type="range" 
                        min="1" max="10" 
                        value={this.state.comfort}
                        onChange={this.handleSlide}
                        step="1"/>
                    <label htmlFor="comfort">{this.state.comfort}</label>
                    <textarea placeholder="washing instructions"
                        cols="30"
                        rows="6"></textarea>
                    <br/>
                    <input type="submit"/>


                </form>
            </div>
        )
    }
}

//export component
export default NewGarment;