import React, { Component } from 'react';
import {Grid,Form, FormGroup, ControlLabel, FormControl, ListGroup, ListGroupItem, Col, Row, Button, Modal } from 'react-bootstrap';
import { hashHistory, Link } from 'react-router';
import Services from '../service';
import { NavBar } from '../components/navbar.jsx';
import Footer from '../components/footer.jsx';
import config from '../../config';

export default class Account extends Component {

	constructor(props) {
			super(props);

			this.handleShow = this.handleShow.bind(this);
    	this.handleClose = this.handleClose.bind(this);
			this.changeHandle = this.changeHandle.bind(this);

			this.state = {
				show: false,
				userID: '',
				error: '',
				posts: [],
        data: {
					name: '',
					email: '',
					description: '',
					avatar: 'default.jpg'
				}
			}
	}

	handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
	}

	componentWillMount() {
		Services.account()
		.then( res => {
			this.setState({data: res.data, userID:res.data.id})
		}).catch(error => {
			window.localStorage.removeItem('user');
			hashHistory.push('/home');
    })
	}

componentDidMount() {
	Services.postsUser()
	.then( res => {
		this.setState({posts: res.data})
	}).catch(error => {
		this.setState({error: error})
	})
}

	DeleteUser() {
		Services.deleteUser(this.state.userID)
		.then( data => {
			if(data.success) {
				window.localStorage.removeItem('user');
				hashHistory.push('/home');
			}
		}).catch(error => {
      this.setState({error: error})
    })
	}

	editUser(e) {
		e.preventDefault()
		Services.editUser(this.state.userID, this.state.data)
		.then( data => {
			if(data.success) {
				this.handleClose()
			}
		}).catch(error => {
      this.setState({error: error})
    })
	}

	changeHandle(e) {
			let input_name = e.target.getAttribute('name');
			let input_value = e.target.value;
			this.state.data[input_name] = input_value;

			this.setState(this.state);
	}

  render() {
		return (

        <Grid>
	        <NavBar></NavBar>
					{this.state.error ?
						<ListGroup className="error-mesage">
							<ListGroupItem bsStyle="danger"><span dangerouslySetInnerHTML={{__html: this.state.error}}></span></ListGroupItem>
						</ListGroup> : ''
					}
	        	<div className="account-section">
		          	<Row>
										<Col  xs={3}>
											<div className="avatar">
												<img src={config.img_url+'avatars/'+this.state.data.avatar} alt="" />
											</div>
											<div className="user-setings">
												<Button bsSize="xsmall" bsStyle="danger" onClick={this.DeleteUser.bind(this)}>Delete Profile</Button>
												<Button bsSize="xsmall" onClick={this.handleShow}>Edit Profile</Button>
												<Link to={"add-post"}>
													<Button bsSize="xsmall">Add Post</Button>
												</Link>
												<Modal show={this.state.show} onHide={this.handleClose}>
					                <Modal.Header closeButton>
					                  <Modal.Title>Edit account</Modal.Title>
					                </Modal.Header>
					                <Modal.Body>
														<form onSubmit={this.editUser.bind(this)}>
										            <FormGroup>
										                <ControlLabel>Name:</ControlLabel>
										                <FormControl name="name" type="input" value={this.state.data.name} onChange={this.changeHandle} />
										                <ControlLabel>Email:</ControlLabel>
										                <FormControl name="email" type="email" value={this.state.data.email} onChange={this.changeHandle} />
										                <ControlLabel>Description:</ControlLabel>
										                <FormControl componentClass="textarea" value={this.state.data.description} name="description" onChange={this.changeHandle} />

										                <Button onClick={this.editUser.bind(this)} type="submit" className="edit_account submit-form" name="edit_account" bsStyle="primary" bsSize="small">Edit</Button>
										            </FormGroup>
										        </form>
					                </Modal.Body>
					                <Modal.Footer>
					                  <Button onClick={this.handleClose}>Close</Button>
					                </Modal.Footer>
					              </Modal>
											</div>
										</Col>
		                <Col  xs={9}>
					      				<div id={"user_"+this.state.data.id}>
					        					<div className="user-name"><span dangerouslySetInnerHTML={{__html: this.state.data.name}}></span></div>
					                  <div className="user-description"><span dangerouslySetInnerHTML={{__html: this.state.data.description}}></span></div>
					      				</div>
		                </Col>
								</Row>
								<Row>
										<Col  xs={9}>
					      				<div className="user-posts">
													{
														this.state.posts.map( (post, key) => (
															<Link key={key} to={"edit-post/"+post.id}>
							        					<p className="item-post">
																	<span>{key+1}) </span><span dangerouslySetInnerHTML={{__html: post.title}}></span>
																</p>
															</Link>
														))
													}
					      				</div>
		                </Col>
		          	</Row>
		        </div>
						<Footer></Footer>
        </Grid>
    );
  }
}
