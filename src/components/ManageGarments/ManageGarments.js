//imports
import React, { Component } from 'react';

//class extends components
class ManageGarments extends Component{

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
                <p>Manage Garments View</p>
            </div>
        )
    }
}

//export component
export default ManageGarments;