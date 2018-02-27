import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, IndexRedirect  } from 'react-router';

import Home from '../pages/home.jsx';
import Posts from '../pages/posts.jsx';
import Account from '../pages/account.jsx';

export default (<Route path="/">
	<IndexRedirect to="/home"/>
	<Route path="/home" component={Home} />
	<Route path="/posts" component={Posts} />
	<Route path="/account" component={Account} />
</Route>)
