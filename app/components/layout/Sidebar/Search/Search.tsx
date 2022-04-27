import SearchField from '@/components/ui/search-field/SearchField'

import './Search.module.scss'
import styles from './Search.module.scss'
import SearchList from './SearchList/SearchList'
import { useSearch } from './useSearch'

const Search = () => {
	const { isSuccess, searchTerm, handleSearch, data } = useSearch()

	return (
		<div className={styles.wrapper}>
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
			{isSuccess && <SearchList movies={data || []} />}
		</div>
	)
}

export default Search
