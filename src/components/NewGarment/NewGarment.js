//imports
import React, { Component } from 'react';
import Nav from '../../components/Nav/Nav';
import axios from 'axios';
import ReactFilestack from 'filestack-react';


//class extends components
class NewGarment extends Component{

    

    //constructor
    constructor(props) {
        super(props);
        this.state ={
            name: '',
            type: 'Type',
            url: 'https://media.istockphoto.com/vectors/denim-kids-overall-vector-id649676582?k=6&m=649676582&s=612x612&w=0&h=k5AHHSVyN6ZjDs2y86m3CFi8KhLeI-ZPeTsiTtaHV50=',
            red: false,
            orange: false,
            yellow: false,
            green: false,
            blue: false,
            purple: false,
            black: false,
            white: false,
            pink: false,
            grey: false,
            brown: false,
            tan: false,
            winter: false,
            spring: false,
            summer: false,
            fall: false,
            comfort: '5',
            wash_instructions:'',
        }
    }

    //componentDidMount
    //componentDidMount({
        //put things here to run on page-load
    //})
    //arrow functions

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
          })
    }

    handleCheckboxChange= (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({
            [event.target.name]: value
          })
    }
    sendGarmentToDatabase = () => {
        axios({
            method: 'POST',
            url: '/api/garments',
            data: this.state
        }).then((response)=>{
            console.log('Garment was successfully sent to the databse', response);
            
        }).catch((error)=>{
            console.log('an error has occurred when trying to send garment to the database', error);
            alert('Error submitting feedback')
        })
    }
      
    onSuccess = (result) => {
        // handle result of uppy here
        console.log('filestack submitted', result.filesUploaded);
        alert('Image added');
        this.setState({
            ...this.state,
            url: result.filesUploaded[0].url
        })
        console.log(this.state.url);
        
    }
    
          

    //render is what shows up on the page
    render() {
        //for filestack
        const options = {
            accept: 'image/*',
            maxFiles: 1,
            storeTo: {
              location: 's3',
            },
          };
        return(
            //you can only return one thing, so wrap it all up in one div
            <div>
                <Nav />
                <p>New Garment View</p>
                <p>{JSON.stringify(this.state)}</p>
                <form onSubmit={this.sendGarmentToDatabase}>
                    <input name="name" placeholder="garment name" onChange={this.handleChange}></input>
                    <br/>
                    <select name="type" onChange={this.handleChange} value={this.state.type}>
                        <option disabled >Type</option>
                        <option value= "top">top</option>
                        <option value="bottom">bottom</option>
                    </select>
                    <br/>
                    {/*<input name="url" onChange={this.handleChange} placeholder="image url"></input>
                    <br/>*/}
                    <ReactFilestack
                        apikey='AQW1eg1Y8Qs8h9tXuiSSgz'
                        buttonText="Add Image"
                        buttonClass="classname"
                        options={options}
                        name="url"
                        onSuccess={this.onSuccess}
                    />
                    <br/>
                    <div id="colorsCheckboxContainer">
                        <p>Colors</p>
                        <input type="checkbox" name="red"
                        checked={this.state.red}
                        onChange={this.handleCheckboxChange} />
                        <label htmlFor="red">Red</label>
                        <input type="checkbox" name="orange" 
                        checked={this.state.orange}
                        onChange={this.handleCheckboxChange} />
                        <label htmlFor="orange">Orange</label>
                        <br/>
                        <input type="checkbox" name="yellow"
                        checked={this.state.yellow}
                        onChange={this.handleCheckboxChange}  />
                        <label htmlFor="yellow">Yellow</label>
                        <input type="checkbox"  name= "green"
                        checked={this.state.green}
                        onChange={this.handleCheckboxChange} />
                        <label htmlFor="green">Green</label>
                        <br/>
                        <input type="checkbox" name="blue" 
                        checked={this.state.blue}
                        onChange={this.handleCheckboxChange} />
                        <label htmlFor="blue">Blue</label>
                        <input type="checkbox" name= "purple"
                        checked={this.state.purple}
                        onChange={this.handleCheckboxChange} />
                        <label htmlFor="purple">Purple</label>
                        <br/>
                        <input type="checkbox" name="black"
                        checked={this.state.black}
                        onChange={this.handleCheckboxChange} />
                        <label htmlFor="black">Black</label>
                        <input type="checkbox" name="white"
                        checked={this.state.white}
                        onChange={this.handleCheckboxChange} />
                        <label htmlFor="white">White</label>
                        <br/>
                        <input type="checkbox" name= "grey"
                        checked={this.state.grey}
                        onChange={this.handleCheckboxChange} />
                        <label htmlFor="grey">Grey</label>
                        <input type="checkbox" name="pink"
                        checked={this.state.pink}
                        onChange={this.handleCheckboxChange} />
                        <label htmlFor="pink">Pink</label>
                        <br/>
                        <input type="checkbox" name="brown"
                        checked={this.state.brown}
                        onChange={this.handleCheckboxChange} />
                        <label htmlFor="brown">Brown</label>
                        <input type="checkbox" name="tan"
                        checked={this.state.tan}
                        onChange={this.handleCheckboxChange} />
                        <label htmlFor="tan">Tan</label>

                    </div>
                    <div id="seasonsCheckboxContainer">
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
                    <br/>
                    <label htmlFor="comfort">Comfort on a scale of 1-10</label>
                    <input 
                        name="comfort"
                        className= "slider"
                        type="range" 
                        min="1" max="10" 
                        value={this.state.comfort}
                        onChange={this.handleChange}
                        step="1"/>
                    <label htmlFor="comfort">{this.state.comfort}</label>
                    <textarea placeholder="washing instructions"
                        name= "wash_instructions"
                        cols="30"
                        rows="6"
                        onChange={this.handleChange}>
                    </textarea>
                    <br/>
                    <input type="submit"/>


                </form>
            </div>
        )
    }
}

//export component
export default NewGarment;