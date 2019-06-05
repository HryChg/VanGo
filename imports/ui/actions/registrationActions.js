export const registrationActions = {
    handleChange,
    handleSubmit
}

const handleChange = (event) => {
	return {
		type: 'FIELD_CHANGE',
		payload: event.target.value
	}
}

const handleSubmit = (event) => {
    event.preventDefault();
    
}