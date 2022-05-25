import axios from 'api/interceptors'

import { getUsersUrl } from '@/config/api.config'

export const AdminService = {
	async getUsersCount() {
		return axios.get<number>(getUsersUrl('/count'))
	},
}
