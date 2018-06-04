import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import {Grid, Form, FormGroup, HelpBlock, checked, ControlLabel, FormControl, Button, Checkbox, Col, Row, Modal, ListGroup, ListGroupItem} from 'react-bootstrap';
import Services from '../service'
import { NavBar } from '../components/navbar.jsx';
import Footer from '../components/footer.jsx';
import config from '../config';

export default class EditPost extends Component {

	constructor(props) {
			super(props);

			if(!window.localStorage.getItem('user')){
				hashHistory.push('/home');
			}

			this.state = {
				postID: this.props.params.postId,
        error: '',
				validation: '',
        category: [],
        postData: {
          title: '',
          content: '',
          status: '',
          image: 'no.png',
          categories: [],
        }
			}
    this.changeHandle = this.changeHandle.bind(this);
	}

  componentWillMount() {
    Services.post(this.state.postID)
    .then( res => {
      this.state.postData.title = res.data.title
      this.state.postData.content = res.data.content
      this.state.postData.status = res.data.status
      this.state.postData.image = res.data.image
      this.setState(this.state);
    }).catch(error => {
      this.setState({error: error})
    })

  }

  componentDidMount() {
		Services.categories()
		.then( res => {
			this.setState({category: res.data.data});
		}).catch(error => {
      this.setState({error: error})
    })
	}

	editPost(e) {
    e.preventDefault()

		// let formData = new FormData();
		// formData.append('image', this.state.postData.image);
		// formData.append('title', this.state.postData.title);
		// formData.append('content', this.state.postData.content);
		// formData.append('status', this.state.postData.status);
		// formData.append('categories', this.state.postData.categories);

		Services.editPost(this.state.postID, this.state.postData)
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

  deletePost() {
    Services.deletePost(this.state.postID)
    .then( data => {
      if(data.success) {
        hashHistory.push('/account');
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
        let data = new FormData()
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
              {this.state.error ?
                <ListGroup className="error-mesage">
                  <ListGroupItem bsStyle="danger"><span dangerouslySetInnerHTML={{__html: this.state.error}}></span></ListGroupItem>
                </ListGroup>
                :
  	          	<Row>
                  <Col xs={2}>
										<div className="delete_post">
	                    <Button bsSize="xsmall" bsStyle="danger" onClick={this.deletePost.bind(this)}>Delete Post</Button>
										</div>
										<div className="post-image">
											<img src={config.img_url+'posts/'+this.state.postData.image} alt="" />
										</div>
                  </Col>
                    <Col xs={8}>
                      <form onSubmit={this.editPost.bind(this)}>
                          <FormGroup validationState={this.state.validation.title ? "error" : null}>
                              <ControlLabel>Title:</ControlLabel>
                              <FormControl type="text" name="title" value={this.state.postData.title} onChange={this.changeHandle} />
															{this.state.validation.title ?
																<HelpBlock>{this.state.validation.title}</HelpBlock>
																: ""
															}
													</FormGroup>
													<FormGroup validationState={this.state.validation.content ? "error" : null}>
                              <ControlLabel>Content:</ControlLabel>
                              <FormControl componentClass="textarea" rows={10} name="content" value={this.state.postData.content} onChange={this.changeHandle} />
															{this.state.validation.content ?
																<HelpBlock>{this.state.validation.content}</HelpBlock>
																: ""
															}
													</FormGroup>
													<FormGroup>
															<ControlLabel className="file-image" htmlFor="image"><i className="fa fa-camera"></i>Image</ControlLabel>
															<FormControl id="image" className="hidden" type="file" name="image" onChange={this.changeHandle} />
													</FormGroup>
													<FormGroup>
                              <Checkbox name="status" checked={this.state.postData.status == "publish" ? "checked" : ""} onChange={this.changeHandle}>Status</Checkbox>
													</FormGroup>
                          <FormGroup>
                              <ControlLabel>Category</ControlLabel>
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
                              <Button onClick={this.editPost.bind(this)} type="submit" className="create_account submit-form" name="create_account" bsStyle="primary" bsSize="small">Edit Post</Button>
                          </FormGroup>
                      </form>
                    </Col>
  	          	</Row>
              }
  	        </div>
						<Footer></Footer>
        </Grid>
    );
  }
}
