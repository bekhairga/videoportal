import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'
import { convertMongoDate } from 'utils/date/convertMongoDate'
import { toastError } from 'utils/toastError'

import {
	IAdminTableItem,
	ITableItem,
} from '@/components/ui/admin-table/admin-table.interface'

import { MovieService } from '@/services/movie.service'
import { UserService } from '@/services/user.service'

import { getAdminUrl } from '@/config/url.config'

import { useDebounce } from '../../../../../../hooks/useDebounce'

export const useUsers = () => {
	const [searchTerm, setSearchTern] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)
	const { push } = useRouter()
	const queryData = useQuery(
		['users list', debouncedSearch],
		() => UserService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(user): ITableItem => ({
						_id: user._id,
						editUrl: getAdminUrl(`user/edit/${user._id}`),
						items: [user.email, convertMongoDate(user.createdAt)],
					})
				),
			onError: (error) => {
				toastError(error, 'user list')
			},
		}
	)
	const { mutateAsync: createAsync } = useMutation(
		'create user',
		() => UserService.createUser(),
		{
			onError: (error) => {
				toastError(error, 'create user')
			},
			onSuccess: ({ data: _id }) => {
				toastr.success('create user', 'creating user was successful')
				push(getAdminUrl(`user/edit/${_id}`))
			},
		}
	)
	const { mutateAsync: deleteAsync } = useMutation(
		'delete user',
		(userId: string) => UserService.deleteUser(userId),
		{
			onError: (error) => {
				toastError(error, 'delete user')
			},
			onSuccess: () => {
				toastr.success('delete user', 'deleting user was successful'),
					queryData.refetch()
			},
		}
	)

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTern(event.target.value)
	}

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
			createAsync,
		}),
		[searchTerm, queryData, deleteAsync, createAsync]
	)
}
