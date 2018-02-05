function defaultTo(value, defaultValue) {
	return (value == null || value !== value) ? defaultValue : value;
}

module.exports = defaultTo;