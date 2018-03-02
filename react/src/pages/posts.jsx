import React, { Component } from 'react';
import {Col, Row, container } from 'react-bootstrap';
import { Link } from 'react-router';
import Services from '../service'

import { NavBar } from '../components/navbar.jsx';
import config from '../../config';

export default class Posts extends Component {

	constructor(props) {
			super(props);

			this.state = {
        		data: []
			}
		}

	componentWillMount() {

		Services.posts()
		.then( res => {
			this.setState({data: res.data.data})
		})
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
				            </Link>
										<Link to={"post/"+post.id}>
				        					<div className="post-img"><img src={config.img_url+'posts/'+post.image} alt="" /></div>
				            </Link>
										<Link to={"post/"+post.id}>
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
