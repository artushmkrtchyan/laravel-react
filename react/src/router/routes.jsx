import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, IndexRedirect  } from 'react-router';

import Home from '../pages/home.jsx';
import Account from '../pages/account.jsx';
import Posts from '../pages/posts.jsx';
import Post from '../pages/post.jsx';
import Products from '../pages/products.jsx';
import Product from '../pages/product.jsx';
import AddPosts from '../pages/addPost.jsx';
import EditPosts from '../pages/editPost.jsx';

export default (<Route path="/">
	<IndexRedirect to="/home"/>
	<Route path="/home" component={Home} />
	<Route path="/account" component={Account} />
	<Route path="/posts" component={Posts} />
	<Route path="/post/:postId" component={Post} />
	<Route path="/products" component={Products} />
	<Route path="/product/:productID" component={Product} />
	<Route path="/add-post" component={AddPosts} />
	<Route path="/edit-post/:postId" component={EditPosts} />

</Route>)



// import React from 'react';
// import {BrowserRouter, Route, Switch} from 'react-router-dom';

// import Home from '../pages/home.jsx';
// import Account from '../pages/account.jsx';
// import Posts from '../pages/posts.jsx';
// import Post from '../pages/post.jsx';
// import Products from '../pages/products.jsx';
// import Product from '../pages/product.jsx';
// import AddPosts from '../pages/addPost.jsx';
// import EditPosts from '../pages/editPost.jsx';


// const Router = ({ store }) =>(
//     <Provider store={store}>
//       <BrowserRouter>
//       <Switch>
//         <Route exact path="/" component={Home}/>
// 		<Route path="/account" component={Account} />
// 		<Route path="/posts" component={Posts} />
// 		<Route path="/post/:postId" component={Post} />
// 		<Route path="/products" component={Products} />
// 		<Route path="/product/:productID" component={Product} />
// 		<Route path="/add-post" component={AddPosts} />
// 		<Route path="/edit-post/:postId" component={EditPosts} />
//       </Switch>
//     </BrowserRouter>
//     </Provider>
// );

// export default Router;