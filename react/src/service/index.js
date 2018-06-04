import { fetcher, uploadFetcher } from './fetch'

export default {
	login: credentials => fetcher('/login', 'POST', credentials),
	register: Register => uploadFetcher('/register', 'POST', Register),
	logout: () => fetcher('/logout', 'POST'),
	account: () => fetcher('/details', 'POST'),
	deleteUser: userID => fetcher('/users/'+userID, 'DELETE'),
	editUser: (userID, userData) => fetcher('/users/'+userID, 'PUT', userData),
	postsUser: () =>fetcher('/userposts', 'POST'),

	posts: () => fetcher('/posts'),
	postsCount: count => fetcher('/posts?count='+count),
	post: postID => fetcher('/posts/'+postID),
	addPost: postData => uploadFetcher('/posts', 'POST', postData),
	editPost: (postID, postData) => fetcher('/posts/'+postID, 'PUT', postData),
	deletePost: postID => fetcher('/posts/'+postID, 'DELETE'),

	products: () => fetcher('/products'),
	product: productID => fetcher('/products/'+productID),
	productsCount: count => fetcher('/products?count='+count),
	categories: () => fetcher('/category'),

	films: () => fetcher('/films'),
	film: filmID => fetcher('/films/'+filmID),
}
