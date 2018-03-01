import React, { Component } from 'react';
import {Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
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
						<NavDropdown eventKey={4} title="Dropdown" id="basic-nav-dropdown">
							<MenuItem eventKey={4.1}>Action</MenuItem>
							<MenuItem eventKey={4.2}>Another action</MenuItem>
							<MenuItem divider />
							<MenuItem eventKey={4.3}>Separated link</MenuItem>
						</NavDropdown>
						</Nav>
						<Nav pullRight>
						<AuthModal className="auth"></AuthModal>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}
