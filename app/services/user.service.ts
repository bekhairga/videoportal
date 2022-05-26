import { instance as axios } from 'api/interceptors'

import { IUser } from '@/shared/types/user.types'

import { getUsersUrl } from '@/config/api.config'

export const UserService = {
	async getAll(searchTerm: string) {
		return axios.get<IUser[]>(getUsersUrl(''), {
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		})
	},
	async deleteUser(_id: string) {
		console.log('deleting')
		return axios.delete<string>(getUsersUrl(`/${_id}`))
	},
}
