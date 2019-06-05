export const updateEmail = (event) => {
	return {
		type: 'UPDATE_EMAIL',
		payload: event.target.value
	}
}

export const updatePassword = (event) => {
	return {
		type: 'UPDATE_PASSWORD',
		payload: event.target.value
	}
}