import React, { Component } from 'react';
import { NavBar } from '../components/navbar.jsx';
import { container } from 'react-bootstrap';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show:false,
            showModal:false
        }

        this.onButtonClick = this.onButtonClick.bind(this);
        this.open          = this.open.bind(this);
        this.close         = this.close.bind(this);
    }

    onButtonClick(event) {
    	if(this.state.show){
        	this.setState({show:false});
        }else {
        	this.setState({show:true});
        }
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    render() {
        let show = this.state.show;

        return (
            <div className="container">
            <NavBar></NavBar>
                <div className="main-container home-page">
                    <div className="bootstrap-test">
                        <div onClick={this.onButtonClick} >Something</div>
                    </div>
                    {
                        show ? "asdasdasdasdasd" : "chka"
                    }
                </div>
            </div>
        );
    }
}
