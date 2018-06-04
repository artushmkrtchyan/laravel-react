import React, { Component } from 'react';
import {Nav, Navbar, NavItem } from 'react-bootstrap';
import {hashHistory} from 'react-router';
import {AuthModal} from './authModal.jsx';

export class NavBar extends Component {
	render() {
		return (
			<Navbar collapseOnSelect>
				<Navbar.Collapse>
					<Nav>
						<NavItem eventKey={1} href="#"><span onClick={() => { hashHistory.push('home') }}>Home</span></NavItem>
						<NavItem eventKey={2} href="#"><span onClick={() => { hashHistory.push('posts') }}>Posts</span></NavItem>
						<NavItem eventKey={3} href="#"><span onClick={() => { hashHistory.push('products') }}>Products</span></NavItem>
						<NavItem eventKey={4} href="#"><span onClick={() => { hashHistory.push('films') }}>Films</span></NavItem>
						</Nav>
						<Nav pullRight>
						<AuthModal className="auth"></AuthModal>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}
