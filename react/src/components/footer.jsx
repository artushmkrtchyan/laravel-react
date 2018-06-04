import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

export default class Footer extends Component {
	render() {
		return (
      <footer className="footer clearfix">

            <Col xs={12} sm={8}>
            </Col>

            <Col xs={12} sm={4}>
                <div className="social-follow-buttons clearfix">
                    <a target="_blank" className="facebook omniture-track" href="#">
                        <div className="button-container facebook-container">
                          <span aria-hidden="true" className="fa fa-facebook"></span>
                        </div>
                    </a>
                    <a target="_blank" className="twitter omniture-track" href="#">
                        <div className="button-container twitter-container">
                          <span aria-hidden="true" className="fa fa-twitter"></span>
                        </div>
                    </a>
                    <a target="_blank" className="google omniture-track" href="#">
                        <div className="button-container google-container">
                          <span aria-hidden="true" className="fa fa-google-plus"></span>
                        </div>
                    </a>
                    <a target="_blank" className="instagram omniture-track" href="#">
                        <div className="button-container instagram-container">
                          <span aria-hidden="true" className="fa fa-instagram"></span>
                        </div>
                    </a>
                    <a target="_blank" className="rss omniture-track" href="/feed">
                      <div className="button-container rss-container">
                        <span aria-hidden="true" className="fa fa-rss"></span>
                      </div>
                    </a>
                </div>
            </Col>
      </footer>
		)
	}
}
