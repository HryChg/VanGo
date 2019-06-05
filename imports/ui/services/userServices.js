// Reference: https://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example#user-actions-js
export const userService = {
    login,
    logout,
    register,
    getById,
    update
}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ username, password });
    };

    return fetch(`${config.apiUrl}`)
}