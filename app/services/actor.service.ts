import { instance as axios, axiosClassic } from 'api/interceptors'

import { IActor } from '@/shared/types/movie.types'

import { getActorsUrl } from '@/config/api.config'
import { getActorUrl } from '@/config/url.config'

export const ActorService = {
	async getAll(searchTerm: string) {
		return axiosClassic.get<IActor[]>(getActorsUrl(''), {
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		})
	},

	async deleteActor(_id: string) {
		return axios.delete<string>(getActorUrl(`/${_id}`))
	},
}
