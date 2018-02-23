import React, { Component } from 'react';
import {FormGroup, ControlLabel, FormControl, Button, Checkbox, Col, Row, Modal, ListGroup, ListGroupItem} from 'react-bootstrap';
import config from '../../config';
// import $ from 'jquery';

export class SignUp extends Component {
  constructor(props) {
      super(props);

      this.state = {
        form_data: {
          SignUp: 'signUp',
          Name: '',
          Email: '',
          Password: '',
          ConfirmPassword: '',
          Description: '',
          Avatar: '',
        },
        data: ''
      }

      this.changeHandle = this.changeHandle.bind(this);
    }

    signup () {
        // $.ajax({
        //   url: conf.wp_ajax_path + 'user.php',
        //   type: 'post',
        //   data: this.state.form_data,
        //   success: data => {
        //     this.setState({data})
        //     if(data == 'success'){
        //         this.props.hideModalSignUp()
        //     }
        //   }
        // });
    }


    changeHandle(e) {
        let input_name = e.target.getAttribute('name');
        let input_value = e.target.value;
        this.state.form_data[input_name] = input_value;

        this.setState(this.state);
    }

  render() {
		return (
        <FormGroup>
            <FormControl name="SignUp" type="hidden" value="signUp" />
            <ControlLabel>Name:</ControlLabel>
            <FormControl name="name" type="input" onChange={this.changeHandle} />
            <ControlLabel>Email:</ControlLabel>
            <FormControl name="email" type="email" onChange={this.changeHandle} />
            <ControlLabel>Password:</ControlLabel>
            <FormControl name="password" type="password" onChange={this.changeHandle} />
            <ControlLabel>Confirm Password:</ControlLabel>
            <FormControl name="confirm_password" type="password" onChange={this.changeHandle} />
            <ControlLabel>Description:</ControlLabel>
            <FormControl componentClass="textarea" name="description" onChange={this.changeHandle} />
            {this.state.data ?
              <ListGroup className="error-mesage">
                <ListGroupItem bsStyle="danger"><span dangerouslySetInnerHTML={{__html: this.state.data}}></span></ListGroupItem>
              </ListGroup> : ''
             }
            <Button onClick={this.signup.bind(this)} className="create_account submit-form" name="create_account" bsStyle="primary" bsSize="small">Sign Up</Button>
        </FormGroup>
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

    signin () {

        fetch(config.api_url + 'login', {
           method: 'POST',
           headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded'
           },
           body: JSON.stringify(this.state.login_data)
        })
         .then( res => res.json() )
         .then( data => this.setState({data}) );
    }

    changeHandle(e) {
        let inputName = e.target.getAttribute('name');
        let inputValue = e.target.value;
        this.state.login_data[inputName] = inputValue;

        this.setState(this.state);
    }

  render() {
		return (
        <FormGroup>
          <FormControl name="SignIn" type="hidden" value="signin" />
            <ControlLabel>Email:</ControlLabel>
            <FormControl name="email" type="input" onChange={this.changeHandle} />
            <ControlLabel>Password:</ControlLabel>
            <FormControl name="password" type="password" onChange={this.changeHandle} />
            <Checkbox name='remember' className="remember-me" onChange={this.changeHandle}>Remember me</Checkbox>
            {this.state.data ?
              <ListGroup className="error-mesage">
                <ListGroupItem bsStyle="danger"><span dangerouslySetInnerHTML={{__html: this.state.data}}></span></ListGroupItem>
              </ListGroup> : ''
             }
            <Button onClick={this.signin.bind(this)} className="login submit-form" name="login" bsStyle="primary" bsSize="small">Sign In</Button>
        </FormGroup>
    );
  }
}
