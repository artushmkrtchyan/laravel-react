import React, { Component } from 'react';
import {Col, Row } from 'react-bootstrap';
import { Link } from 'react-router';
import { NavBar } from '../components/navbar.jsx';
import config from '../../config';

export default class Sport extends Component {

	constructor(props) {
			super(props);

			this.state = {
        		data: []
			}
		}

	componentWillMount() {

		fetch(config.api_url + 'posts')
		.then( res => res.json() )
		.then( res => this.setState({data: res.data.data}))
	}

  render() {
		return (

        <div className="container">
        <NavBar></NavBar>
        	<div className="posts-section">
	          	<Row>
	    		{
	  				this.state.data.map( (post, key) => (
	                <Col key={key}  xs={3}>
	      				<div id={"post_"+post.id} className="post-item">
							<Link to={"post/"+post.id}>
	        					<div className="post-title"><span dangerouslySetInnerHTML={{__html: post.title}}></span> </div>
	        					<div className="post-img"><img src={config.img_url+'posts/'+post.image} alt="" /></div>
	                          	<div className="post-excerpt"><span dangerouslySetInnerHTML={{__html: post.content}}></span> </div>
	                        </Link>
	      				</div>
	                </Col>
	  				))
	    		}
	          	</Row>
	        </div>
        </div>
    );
  }
}