// TODO: Add services
// import { userService } from '../services';

export const userActions = {
	login,
	logout,
	register
}

const login = (email, password) => {
	return {
		type: 'LOGIN_REQUEST',
		payload: {email, password}
	}
}

const logout = () => {
	userService.logout();
	return {
		type: 'LOG_OUT'
	}
}

const register = (user) => {
	
}