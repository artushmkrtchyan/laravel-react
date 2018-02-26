import { fetcher } from './fetch'

export default {
	login: credentials => fetcher('/login', 'POST', credentials),
	register: Register => fetcher('/register', 'POST', Register),
	logout: LogOut => fetcher('/logout', 'POST'),

	posts: () => fetcher('/posts')
}