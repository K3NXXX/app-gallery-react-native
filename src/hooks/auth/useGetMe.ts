import { useQuery } from '@tanstack/react-query'
import { authService } from '../../services/auth.service'
import { IUser } from '../../@types/auth/user.types'

export const useGetMe = () => {
	const { data: userData, isLoading, error } = useQuery<IUser | null>({queryKey: ['getMe'],
		queryFn: () => authService.getMe()
	})
  
	if (isLoading) return { loading: true }
	if (error) return { error }
  
	return { userData }
  }