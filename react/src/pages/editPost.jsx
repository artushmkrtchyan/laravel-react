import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import {Grid, Form, FormGroup, checked, ControlLabel, FormControl, Button, Checkbox, Col, Row, Modal, ListGroup, ListGroupItem} from 'react-bootstrap';
import Services from '../service'
import { NavBar } from '../components/navbar.jsx';
import config from '../../config';

export default class EdirPost extends Component {

	constructor(props) {
			super(props);

			this.state = {
				postID: this.props.params.postId,
        error: '',
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
      console.log(this.state.error);
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
		Services.editPost(this.state.postID, this.state.postData)
		.then( res => {
        if(res.success){
    			hashHistory.push('/account')
        }else{
					this.state.error = 'title required';
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
                    <Button bsSize="xsmall" bsStyle="danger" onClick={this.deletePost.bind(this)}>Delete</Button>
                  </Col>
                    <Col xs={8}>
                      <form onSubmit={this.editPost.bind(this)}>
                          <FormGroup>
                              <ControlLabel>Title:</ControlLabel>
                              <FormControl type="text" name="title" value={this.state.postData.title} onChange={this.changeHandle} />
                              <ControlLabel>Content:</ControlLabel>
                              <FormControl componentClass="textarea" rows={10} name="content" value={this.state.postData.content} onChange={this.changeHandle} />
                              <ControlLabel>Image:</ControlLabel>
                              <FormControl type="file" name="image" onChange={this.changeHandle} />
                              <Checkbox name="status" checked={this.state.postData.status == "publish" ? "checked" : ""} onChange={this.changeHandle}>Status</Checkbox>
                              <FormGroup>
                                <ControlLabel>Catedory</ControlLabel>
                                <FormControl name="catedories" componentClass="select" multiple  onChange={this.changeHandle}>
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
                              <Button onClick={this.editPost.bind(this)} type="submit" className="create_account submit-form" name="create_account" bsStyle="primary" bsSize="small">Edit Post</Button>
                          </FormGroup>
                      </form>
                    </Col>
  	          	</Row>
              }
  	        </div>
        </Grid>
    );
  }
}
