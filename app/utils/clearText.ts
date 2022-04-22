export const onlyText = (
	_string: string,
	limit: null | number = null
): string => {
	let result = _string
		.replace(/<[^>]+>/g, '')
		.replace(/&[^;]+./g, '')
		.replace(
			/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\u2DC00-\uDFFF]|[\u2011-\u26FF]|\uD83F[\uDD10-\uDDFF])/,
			''
		)
	if (limit) result = result.slice(0, limit) + '...'
	return result
}
