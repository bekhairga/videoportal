export const getGenresListEach = (
	index: number,
	length: number,
	name: string
) => (index + 1 === length ? name : name + ', ')
export const getGenresList = (array: { name: string }[]) =>
	array.map((item) => item.name).join(', ')
