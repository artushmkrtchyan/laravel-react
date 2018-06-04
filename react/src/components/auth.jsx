import React, { Component } from 'react';
import {Form, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Checkbox, ListGroup, ListGroupItem} from 'react-bootstrap';
import { hashHistory } from 'react-router';
import TwitterLogin from 'react-twitter-auth';
import GitHubLogin from 'react-github-login';
import Services from '../service';
import config from '../config';

export class SignUp extends Component {
  constructor(props) {
      super(props);

      this.state = {
        validation: '',
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
        let formData = new FormData();
    		formData.append('name', this.state.register_data.name);
    		formData.append('email', this.state.register_data.email);
    		formData.append('password', this.state.register_data.password);
    		formData.append('password_confirmation', this.state.register_data.password_confirmation);
    		formData.append('description', this.state.register_data.description);
        formData.append('avatar', this.state.register_data.avatar);

        Services.register(formData)
        .then( data => {
        if('token' in data) {
          window.localStorage.setItem('user', data.token)
          hashHistory.push('/account')
        }else{
          this.setState({validation: data.error})
        }
      });
    }


    changeHandle(e) {
        let input_name = e.target.getAttribute('name');
        let input_value = e.target.value;

        if(e.target.type === 'file') {
          let inputFile = document.querySelector('input[type="file"]')
          input_value = inputFile.files[0];
        }

        this.state.register_data[input_name] = input_value
        this.setState(this.state);
    }

  render() {
		return (
        <Form onSubmit={this.signup.bind(this)}>
          <FormGroup validationState={this.state.validation.name ? "error" : null}>
              <ControlLabel>Name:</ControlLabel>
              <FormControl name="name" type="input" onChange={this.changeHandle} />
              {this.state.validation.name ?
                <HelpBlock>{this.state.validation.name}</HelpBlock>
                : ""
              }
          </FormGroup>
          <FormGroup validationState={this.state.validation.email ? "error" : null}>
              <ControlLabel>Email:</ControlLabel>
              <FormControl name="email" type="email" onChange={this.changeHandle} />
              {this.state.validation.email ?
                <HelpBlock>{this.state.validation.email}</HelpBlock>
                : ""
              }
          </FormGroup>
          <FormGroup validationState={this.state.validation.password ? "error" : null}>
              <ControlLabel>Password:</ControlLabel>
              <FormControl name="password" type="password" onChange={this.changeHandle} />
              {this.state.validation.password ?
                <HelpBlock>{this.state.validation.password}</HelpBlock>
                : ""
              }
          </FormGroup>
          <FormGroup>
              <ControlLabel>Confirm Password:</ControlLabel>
              <FormControl name="password_confirmation" type="password" onChange={this.changeHandle} />
          </FormGroup>
          <FormGroup>
              <ControlLabel>Description:</ControlLabel>
              <FormControl componentClass="textarea" name="description" onChange={this.changeHandle} />
          </FormGroup>
          <FormGroup>
              <ControlLabel className="file-image" htmlFor="image"><i className="fa fa-camera"></i>Image</ControlLabel>
              <FormControl id="image" className="hidden" type="file" name="avatar" onChange={this.changeHandle} />
          </FormGroup>
          <FormGroup>
              {this.state.data ?
                <ListGroup className="error-mesage">
                  <ListGroupItem bsStyle="danger"><span dangerouslySetInnerHTML={{__html: this.state.data}}></span></ListGroupItem>
                </ListGroup> : ''
               }
           </FormGroup>
          <FormGroup>
              <Button onClick={this.signup.bind(this)} type="submit" className="create_account submit-form" name="create_account" bsStyle="primary" bsSize="small">Sign Up</Button>
          </FormGroup>
        </Form>
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

      this.onFailed = this.onFailed.bind(this);
      this.onSuccess = this.onSuccess.bind(this);
    }

    signin(e) {
      e.preventDefault()

      Services.login(this.state.login_data)
      .then( data => {
        if('token' in data.success) {
          window.localStorage.setItem('user', data.success.token)
          hashHistory.push('/account')
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

    onSuccess(response) {console.log(response)};
    onFailed(response) {console.error(response)};

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
              <TwitterLogin loginUrl="http://local.laravel/api/v1/auth/twitter"
                      onFailure={this.onFailed}
                      onSuccess={this.onSuccess}
                      requestTokenUrl="http://local.laravel/api/v1/auth/twitter/callback"
                      showIcon={true} />

              <GitHubLogin clientId="9577f5533e94f2ea31c2"
                      redirectUri="http://local.laravel/auth/github/callback"
                      onSuccess={this.onSuccess}
                      onFailure={this.onFailed}/>

          </FormGroup>
        </form>
    );
  }
}
