import cnf from '../../config'

export function fetcher(url, method = 'GET', body = {}) {

	let options = {
		headers: {
			'Content-Type': 'application/json'
		}
	}
	let token = window.localStorage.getItem('user')

	if(method.toLowerCase() !== 'get') {
		options.method = method
		options.body = JSON.stringify(body)
	}

	if(token) {
		options.headers.Authorization = 'Bearer ' + token
	}

	return fetch(cnf.api_url + url, options)
		.then(res => res.json())

}