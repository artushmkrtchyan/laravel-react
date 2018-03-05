import { fetcher } from './fetch'

export default {
	login: credentials => fetcher('/login', 'POST', credentials),
	register: Register => fetcher('/register', 'POST', Register),
	logout: LogOut => fetcher('/logout', 'POST'),
	account: Account => fetcher('/details', 'POST'),
	deleteuser: DeleteUser => fetcher('/users/'+DeleteUser, 'DELETE'),
	edituser: (userID, EditUser) => fetcher('/users/'+userID, 'PUT', EditUser),
	postsUser: userID =>fetcher('/userposts', 'POST'),

	posts: () => fetcher('/posts'),
	post: postID => fetcher('/posts/'+postID),
	products: () => fetcher('/products'),
	product: productID => fetcher('/products/'+productID),
	addpost: postData => fetcher('/posts', 'POST', postData),
	editpost: (postID, postData) => fetcher('/posts/'+postID, 'PUT', postData),
	categories: categories => fetcher('/category'),
}
