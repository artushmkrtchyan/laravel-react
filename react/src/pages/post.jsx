import React, { Component } from 'react';
import {Col, Row, container } from 'react-bootstrap';
import Services from '../service'
import { NavBar } from '../components/navbar.jsx';
import config from '../../config';

export default class Post extends Component {

	constructor(props) {
			super(props);

			this.state = {
        postID: this.props.params.postId,
        data: {
          image: 'no.png'
        }
			}
		}

	componentWillMount() {
		Services.post(this.state.postID)
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
                    <h2 className="post-title">{this.state.data.title}</h2>
                    <div className="post-title">{this.state.data.created_at}</div>
                    <div className="post-image"><img src={config.img_url+'posts/'+this.state.data.image} alt="" /></div>
                    <div className="post-excerpt"><span dangerouslySetInnerHTML={{__html: this.state.data.content}}></span> </div>
                  </Col>
	          	</Row>
	        </div>
        </div>
    );
  }
}
