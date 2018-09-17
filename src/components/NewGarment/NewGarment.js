//imports
import React, { Component } from 'react';
import Nav from '../../components/Nav/Nav';


//class extends components
class NewGarment extends Component{

    //constructor
    constructor(props) {
        super(props);
        this.state ={

        }
    }

    //componentDidMount
    //componentDidMount({
        //put things here to run on page-load
    //})
    //arrow functions

    //render is what shows up on the page
    render() {
        return(
            //you can only return one thing, so wrap it all up in one div
            <div>
                <Nav />
                <p>New Garment View</p>
            </div>
        )
    }
}

//export component
export default NewGarment;