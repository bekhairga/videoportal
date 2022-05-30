export const getContentType = () => ({
	'Content-Type': 'application/json',
})
export const errorCatch = (error: any): string => {
	// console.log(error.response)
	return error.response && error.response.data
		? typeof error.response.data.message === 'object'
			? error.response.data.message[0]
			: error.response.data.message
		: error.message
}
