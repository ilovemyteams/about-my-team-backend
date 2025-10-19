export function parseBoolean(value: string): boolean {
	if (typeof value === 'boolean') {
		return value
	}
	if (typeof value === 'string') {
		const val = value.trim().toLowerCase()
		if (val === 'true') {
			return true
		}
		if (val === 'false') {
			return false
		}
	}
	throw new Error(
		`Value "${value}" cannot be parsed to boolean. Accepted values are "true" or "false".`
	)
}
