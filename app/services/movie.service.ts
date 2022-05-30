import { instance as axios, axiosClassic } from 'api/interceptors'

import { IMovieEditInput } from '@/components/screens/admin/movies/edit/movie-edit.interface'

import { IMovie } from '@/shared/types/movie.types'

import { getMoviesUrl } from '@/config/api.config'

export const MovieService = {
	async getAll(searchTerm: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(''), {
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		})
	},
	async createMovie() {
		return axios.post<string>(getMoviesUrl('/'))
	},
	async getMostPopularMovies() {
		const { data: movies } = await axiosClassic.get<IMovie[]>(
			getMoviesUrl('/most-popular')
		)
		return movies
	},
	async getById(_id: string) {
		return axios.get<IMovieEditInput>(getMoviesUrl(`/${_id}`))
	},
	async updateMovie(_id: string, data: IMovieEditInput) {
		console.log(JSON.stringify(data))
		return axios.put<string>(getMoviesUrl(`/${_id}`), data)
	},
	async deleteMovie(_id: string) {
		return axios.delete<string>(getMoviesUrl(`/${_id}`))
	},
}
