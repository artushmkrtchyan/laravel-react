import React, { Component } from 'react';
import {Col, Row } from 'react-bootstrap';
import Services from '../service'
import { NavBar } from '../components/navbar.jsx';
import config from '../../config';

export default class Product extends Component {

	constructor(props) {
			super(props);

			this.state = {
        productID: this.props.params.productID,
        data: {
          image: 'no.png'
        }
			}
		}

	componentWillMount() {
		Services.product(this.state.productID)
		.then( res => {
        if(res.success){
    			this.setState({data: res.data})
        }
		})
	}

  render() {
		return (

        <div className="container">
        <NavBar></NavBar>
        	<div className="post-section">
	          	<Row>
                  <Col xs={9}>
                    <h2 className="post-title">{this.state.data.name}</h2>
                    <div className="post-title">{this.state.data.created_at}</div>
                    <div className="post-image"><img src={config.img_url+'products/'+this.state.data.image} alt="" /></div>
                    <div className="post-excerpt"><span dangerouslySetInnerHTML={{__html: this.state.data.description}}></span> </div>
                  </Col>
	          	</Row>
	        </div>
        </div>
    );
  }
}
