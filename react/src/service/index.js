import { fetcher } from './fetch'

export default {
	login: credentials => fetcher('/login', 'POST', credentials),
	register: Register => fetcher('/register', 'POST', Register),
	logout: () => fetcher('/logout', 'POST'),
	account: () => fetcher('/details', 'POST'),
	deleteUser: userID => fetcher('/users/'+userID, 'DELETE'),
	editUser: (userID, EditUser) => fetcher('/users/'+userID, 'PUT', EditUser),
	postsUser: () =>fetcher('/userposts', 'POST'),

	posts: () => fetcher('/posts'),
	postsCount: count => fetcher('/posts?count='+count),
	post: postID => fetcher('/posts/'+postID),
	addPost: postData => fetcher('/posts', 'POST', postData),
	editPost: (postID, postData) => fetcher('/posts/'+postID, 'PUT', postData),
	deletePost: postID => fetcher('/posts/'+postID, 'DELETE'),

	products: () => fetcher('/products'),
	product: productID => fetcher('/products/'+productID),
	categories: () => fetcher('/category'),
}
