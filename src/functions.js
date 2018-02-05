function functions(object) {
	if (object == null) {
		return []
	}
	return Object.keys(object).filter((key) => typeof object[key] == 'function')
}

export default functions;