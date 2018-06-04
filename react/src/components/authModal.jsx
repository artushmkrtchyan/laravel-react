import React, { Component } from 'react';
import {Button, Modal } from 'react-bootstrap';
import { hashHistory } from 'react-router';
import {SignIn, SignUp} from './auth.jsx';
import Services from '../service'

export class AuthModal extends Component {

  constructor(props) {

      super(props);
      this.state = {
          showModalUp:false,
          showModalIn:false,
          token:window.localStorage.getItem('user')
      }
      this.openUp  = this.openUp.bind(this);
      this.closeUp = this.closeUp.bind(this);

      this.openIn  = this.openIn.bind(this);
      this.closeIn = this.closeIn.bind(this);
  }

  closeUp() {
      this.setState({ showModalUp: false });
  }
  openUp() {
      this.setState({ showModalUp: true });
  }

  closeIn() {
      this.setState({ showModalIn: false });
  }
  openIn() {
      this.setState({ showModalIn: true });
  }

  logOut() {

        Services.logout()
        .then( data => {
          if(data.success) {
            window.localStorage.removeItem('user');
            hashHistory.push('/home');
          }
        });
    }



  render() {
    return (
      <div className="account-buttons">
          <div className="main-modal">
          {
            this.state.token ? <div><span className="sign-up" onClick={this.logOut}>Logout</span><span className="account" onClick={() => { hashHistory.push('account') }}>Account</span></div> :
            <div><span className="sign-in" onClick={this.openIn}>Sign In</span><span className="sign-up" onClick={this.openUp}>Sign up</span></div>
          }

              <Modal show={this.state.showModalUp} onHide={this.closeUp}>
                <Modal.Header closeButton>
                  <Modal.Title>Create account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <SignUp hideModalSignUp={this.closeUp}></SignUp>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.closeUp}>Close</Button>
                </Modal.Footer>
              </Modal>

              <Modal show={this.state.showModalIn} onHide={this.closeIn}>
                <Modal.Header closeButton>
                  <Modal.Title>Login form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <SignIn hideModalSignIn={this.closeIn}></SignIn>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.closeIn}>Close</Button>
                </Modal.Footer>
              </Modal>
          </div>
      </div>
    );
  }
}
