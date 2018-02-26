import React, { Component } from 'react';
import {Form, FormGroup, ControlLabel, FormControl, Button, Checkbox, Col, Row, Modal, ListGroup, ListGroupItem} from 'react-bootstrap';
import { hashHistory } from 'react-router'
import Services from '../service'
import config from '../../config';
// import $ from 'jquery';

export class SignUp extends Component {
  constructor(props) {
      super(props);

      this.state = {
        register_data: {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          description: '',
          avatar: '',
        },
        data: ''
      }

      this.changeHandle = this.changeHandle.bind(this);
    }

    signup(e) {

        e.preventDefault()

        Services.register(this.state.register_data)
        .then( data => {
        if('token' in data) {
          window.localStorage.setItem('user', data.token)
          hashHistory.push('/posts')
        }else if(data.error.email){
          this.setState({data: data.error.email})
        }else if(data.error.password){
          this.setState({data: data.error.password})
        }
      });
    }


    changeHandle(e) {
        let input_name = e.target.getAttribute('name');
        let input_value = e.target.value;
        this.state.register_data[input_name] = input_value;

        this.setState(this.state);
    }

  render() {
		return (
        <form onSubmit={this.signup.bind(this)}>
            <FormGroup>
                <ControlLabel>Name:</ControlLabel>
                <FormControl name="name" type="input" onChange={this.changeHandle} />
                <ControlLabel>Email:</ControlLabel>
                <FormControl name="email" type="email" onChange={this.changeHandle} />
                <ControlLabel>Password:</ControlLabel>
                <FormControl name="password" type="password" onChange={this.changeHandle} />
                <ControlLabel>Confirm Password:</ControlLabel>
                <FormControl name="password_confirmation" type="password" onChange={this.changeHandle} />
                <ControlLabel>Description:</ControlLabel>
                <FormControl componentClass="textarea" name="description" onChange={this.changeHandle} />
                {this.state.data ?
                  <ListGroup className="error-mesage">
                    <ListGroupItem bsStyle="danger"><span dangerouslySetInnerHTML={{__html: this.state.data}}></span></ListGroupItem>
                  </ListGroup> : ''
                 }
                <Button onClick={this.signup.bind(this)} type="submit" className="create_account submit-form" name="create_account" bsStyle="primary" bsSize="small">Sign Up</Button>
            </FormGroup>
        </form>
    )
  }
}

export class SignIn extends Component {
  constructor(props) {
      super(props);

      this.state = {
        login_data: {
          email: '',
          password: '',
          remember: ''
        },
        data: ''
      }

      this.changeHandle = this.changeHandle.bind(this);
    }

    signin(e) {
      e.preventDefault()

      Services.login(this.state.login_data)
      .then( data => {
        if('token' in data.success) {
          window.localStorage.setItem('user', data.success.token)
          hashHistory.push('/posts')
        }
      })
      .catch(this.setState({data: 'Incorrect email or password'}));
    }

    changeHandle(e) {
        let inputName = e.target.getAttribute('name');
        let inputValue = e.target.value;
        this.state.login_data[inputName] = inputValue;

        this.setState(this.state);
    }

  render() {
		return (
        <form onSubmit={this.signin.bind(this)}>
          <FormGroup>
              <ControlLabel>Email:</ControlLabel>
              <FormControl name="email" type="email" onChange={this.changeHandle} />
              <ControlLabel>Password:</ControlLabel>
              <FormControl name="password" type="password" onChange={this.changeHandle} />
              <Checkbox name='remember' className="remember-me" onChange={this.changeHandle}>Remember me</Checkbox>
              {this.state.data ?
                <ListGroup className="error-mesage">
                  <ListGroupItem bsStyle="danger"><span dangerouslySetInnerHTML={{__html: this.state.data}}></span></ListGroupItem>
                </ListGroup> : ''
               }
              <Button className="login submit-form" name="login" type="submit" bsStyle="primary" bsSize="small">Sign In</Button>
          </FormGroup>
        </form>
    );
  }
}
