export const login = () => {
	console.log('within-action');
	return {
        type: 'LOGIN_REQUEST'
    };
};

export const logout = () => {
	console.log('within-action');
    return {
        type: 'LOGOUT_REQUEST'
    };
};
