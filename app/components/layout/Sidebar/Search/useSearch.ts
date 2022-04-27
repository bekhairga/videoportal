import { ChangeEvent, useState } from 'react'
import { useQuery } from 'react-query'

import { MovieService } from '@/services/movie.service'

import { useDebounce } from '../../../../../hooks/useDebounce'

export const useSearch = () => {
	const [searchTerm, setSearchTern] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)
	const { isSuccess, data } = useQuery(
		['search movie list', debouncedSearch],
		() => MovieService.getAll(debouncedSearch),
		{ select: ({ data }) => data, enabled: !!debouncedSearch }
	)

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTern(event.target.value)
	}
	return { searchTerm, isSuccess, handleSearch, data }
}
