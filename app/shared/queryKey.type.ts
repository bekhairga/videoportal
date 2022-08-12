import { QueryKey } from '@tanstack/react-query'

export const convertStringToQueryKey = (key: string): QueryKey => [key]
