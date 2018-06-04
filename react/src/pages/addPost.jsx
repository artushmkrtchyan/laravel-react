import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import {Grid, Form, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Checkbox, Col, Row, Modal, ListGroup, ListGroupItem} from 'react-bootstrap';
import Services from '../service'
import { NavBar } from '../components/navbar.jsx';
import Footer from '../components/footer.jsx';
import config from '../config';

export default class AddPost extends Component {

	constructor(props) {
			super(props);

			if(!window.localStorage.getItem('user')){
				hashHistory.push('/home');
			}
			
			this.state = {
				error: '',
				validation: '',
        category: [],
        postData: {
          title: '',
          content: '',
          status: '',
          image: '',
          categories: [],
        }
			}
    this.changeHandle = this.changeHandle.bind(this);
	}

  componentDidMount() {
		Services.categories()
		.then( res => {
			this.setState({category: res.data.data});
		})
	}

	addNewPost(e) {

    e.preventDefault()
		let formData = new FormData();
		formData.append('image', this.state.postData.image);
		formData.append('title', this.state.postData.title);
		formData.append('content', this.state.postData.content);
		formData.append('status', this.state.postData.status);
		formData.append('categories', this.state.postData.categories);

		Services.addPost(formData)
		.then( res => {
        if(res.success){
    			hashHistory.push('/account')
        }else{
					this.setState({validation: res.error})
				}
		}).catch(error => {
      this.setState({error: error})
    })
	}

  changeHandle(e) {
      let inputName = e.target.getAttribute('name');
      let inputValue = '';
      let value = [];
      if(e.target.type === 'checkbox'){
        inputValue = e.target.checked;
      }else if(e.target.type === 'select-multiple'){
        let options = e.target.options;
        for (let i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        inputValue = value;
      }else if(e.target.type === 'file') {
        let inputFile = document.querySelector('input[type="file"]')
        inputValue = inputFile.files[0];
      }else{
        inputValue = e.target.value
      }
      this.state.postData[inputName] = inputValue;
      this.setState(this.state);
  }

  render() {
		return (

        <Grid>
	        <NavBar></NavBar>
	        	<div className="post-section">
		          	<Row>
	                  <Col xsOffset={2} xs={8}>
	                    <form onSubmit={this.addNewPost.bind(this)}>
	                        <FormGroup validationState={this.state.validation.title ? "error" : null}>
	                            <ControlLabel>Title:</ControlLabel>
	                            <FormControl type="text" name="title" onChange={this.changeHandle} />
															{this.state.validation.title ?
																<HelpBlock>{this.state.validation.title}</HelpBlock>
																: ""
															}
													</FormGroup>
													<FormGroup validationState={this.state.validation.content ? "error" : null}>
	                            <ControlLabel>Content:</ControlLabel>
	                            <FormControl componentClass="textarea" rows={10} name="content" onChange={this.changeHandle} />
															{this.state.validation.content ?
																<HelpBlock>{this.state.validation.content}</HelpBlock>
																: ""
															}
													</FormGroup>
													<FormGroup>
	                            <ControlLabel className="file-image" htmlFor="image"><i className="fa fa-camera"></i>Image</ControlLabel>
	                            <FormControl id="image" className="hidden" type="file" name="image" onChange={this.changeHandle} />
													</FormGroup>
	                            <Checkbox name="status" onChange={this.changeHandle}>Status</Checkbox>
	                        <FormGroup>
	                              <ControlLabel>Category</ControlLabel>
													</FormGroup>
													<FormGroup>
	                              <FormControl name="categories" componentClass="select" multiple  onChange={this.changeHandle}>
	                                {
	                                  this.state.category.map( (cat, key) => (
	                                    <option key={key} value={cat.id}>{cat.name}</option>
	                                  ))
	                                }
	                              </FormControl>
	                        </FormGroup>
	                            {this.state.error ?
	                              <ListGroup className="error-mesage">
	                                <ListGroupItem bsStyle="danger"><span dangerouslySetInnerHTML={{__html: this.state.error}}></span></ListGroupItem>
	                              </ListGroup> : ''
	                             }
													<FormGroup>
	                            <Button onClick={this.addNewPost.bind(this)} type="submit" className="create_account submit-form" name="create_account" bsStyle="primary" bsSize="small">Add</Button>
	                        </FormGroup>
	                    </form>
	                  </Col>
		          	</Row>
		        </div>
						<Footer></Footer>
        </Grid>
    );
  }
}
