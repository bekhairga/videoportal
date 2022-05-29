import { instance as axios, axiosClassic } from 'api/interceptors'

import { IActorEditInput } from '@/components/screens/admin/actors/edit/actor-edit.interface'

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
	async getById(_id: string) {
		return axios.get<IActorEditInput>(getActorUrl(`/${_id}`))
	},
	async updateActor(_id: string, data: IActorEditInput) {
		return axios.put<string>(getActorUrl(`/${_id}`), data)
	},
	async createActor() {
		return axios.post<string>(getActorUrl('/'))
	},
	async deleteActor(_id: string) {
		return axios.delete<string>(getActorUrl(`/${_id}`))
	},
}
