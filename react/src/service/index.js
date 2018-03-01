import { fetcher } from './fetch'

export default {
	login: credentials => fetcher('/login', 'POST', credentials),
	register: Register => fetcher('/register', 'POST', Register),
	logout: LogOut => fetcher('/logout', 'POST'),
	account: Account => fetcher('/details', 'POST'),
	deleteuser: DeleteUser => fetcher('/users/'+DeleteUser, 'DELETE'),
	edituser: (userID, EditUser) => fetcher('/users/'+userID, 'PUT', EditUser),

	posts: () => fetcher('/posts'),
	post: postID => fetcher('/posts/'+postID),
	products: () => fetcher('/products'),
	product: productID => fetcher('/products/'+productID),
}
