//imports
import React, { Component } from 'react';
import Nav from '../../components/Nav/Nav';


//class extends components
class DressMe extends Component{

    //constructor
    constructor(props) {
        super(props);
        this.state ={

        }
    }

    //componentDidMount
    //componentDidMount({
        //put things here to run on page-load
   // })
    //arrow functions

    //render is what shows up on the page
    render() {
        return(
            //you can only return one thing, so wrap it all up in one div
            <div>
                <Nav />
                <div>
                    <p>Dress Me View</p>
                    <button>Dress Me</button>
                    
                </div>
            </div>
        )
    }
}

//export component
export default DressMe;