// Reference: https://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example#user-actions-js
import { userService } from '../services';
import { history } from '../helpers';
import { alertActions } from './';

export const userActions = {
	login,
	logout,
	register
}

const login = (email, password) => {
	return dispatch => {
		dispatch(request({ email }));
		userService.login(email, password)
			.then(
				user => {
					dispatch(success(user));
					history.push('/');
				},
				error => {
					dispatch(failure(error.toString()));
					dispatch(alertActions.error(error.toString()));
				}
			);
	};

	function request(user) { return { type: 'LOGIN_REQUEST', user}}
	function success(user) { return { type: 'LOGIN_SUCCESS', user}}
	function failure(error) { return { type: 'LOGIN_FAILURE', error}}
}

const logout = () => {
	userService.logout();
	return { type: 'LOG_OUT' };
}

const register = (user) => {
	return dispatch => {
		dispatch(request(user));
		userService.register(user)
			.then(
				user => {
					dispatch(success());
					history.push('/login');
					dispatch(alertActions.success('Registration successful'));
				},
				error => {
					dispatch(failure(error.toString()));
					dispatch(alertActions.error(error.toString()));
				}
			);
	};

	function request(user) { return { type: 'REGISTRATION_REQUEST', user}}
	function success(user) { return { type: 'REGISTRATION_SUCCESS', user}}
	function failure(error) { return { type: 'REGISTRATION_FAILURE', error}}
}