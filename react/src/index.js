import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';

import routes from './router/routes.jsx'

function init() {
	ReactDOM.render(<Router history={hashHistory}>
		{routes}
	</Router>, document.getElementById('root'))
}

init()
