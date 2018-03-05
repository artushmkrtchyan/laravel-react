import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import {Form, FormGroup, ControlLabel, FormControl, Button, Checkbox, Col, Row, Modal, ListGroup, ListGroupItem} from 'react-bootstrap';
import Services from '../service'
import { NavBar } from '../components/navbar.jsx';
import config from '../../config';

export default class AddPost extends Component {

	constructor(props) {
			super(props);

			this.state = {
				error: '',
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

		Services.addpost(this.state.postData)
		.then( res => {
        if(res.success){
    			hashHistory.push('/account')
        }else{
					this.state.error = 'title required';
				}
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
      console.log(this.state.postData);
  }

  render() {
		console.log(this.state.error);
		return (

        <div className="container">
        <NavBar></NavBar>
        	<div className="post-section">
	          	<Row>
                  <Col xsOffset={2} xs={8}>
                    <form onSubmit={this.addNewPost.bind(this)}>
                        <FormGroup>
                            <ControlLabel>Title:</ControlLabel>
                            <FormControl type="text" name="title" onChange={this.changeHandle} />
                            <ControlLabel>Content:</ControlLabel>
                            <FormControl componentClass="textarea" name="content" onChange={this.changeHandle} />
                            <ControlLabel>Image:</ControlLabel>
                            <FormControl type="file" name="image" onChange={this.changeHandle} />
                            <Checkbox name="status" onChange={this.changeHandle}>Status</Checkbox>
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
                            <Button onClick={this.addNewPost.bind(this)} type="submit" className="create_account submit-form" name="create_account" bsStyle="primary" bsSize="small">Add</Button>
                        </FormGroup>
                    </form>
                  </Col>
	          	</Row>
	        </div>
        </div>
    );
  }
}
