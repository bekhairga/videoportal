import { instance as axios } from 'api/interceptors'

import { IUserEditInput } from '@/components/screens/admin/home/users/edit/user-edit.interface'

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
	async createUser() {
		return axios.post<string>(getUsersUrl('/'))
	},
	async getById(_id: string) {
		return axios.get<IUserEditInput>(getUsersUrl(`/${_id}`))
	},
	async updateUser(_id: string, data: IUserEditInput) {
		return axios.put<string>(getUsersUrl(`/${_id}`), data)
	},
	async deleteUser(_id: string) {
		return axios.delete<string>(getUsersUrl(`/${_id}`))
	},
}
