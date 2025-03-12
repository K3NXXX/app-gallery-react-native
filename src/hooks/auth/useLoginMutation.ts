import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { ILoginData } from '../../@types/auth/login.types'
import { authService } from '../../services/auth.service'

export const useLoginMutation = () => {
	const [loginError, setLoginError] = useState(false)
	const { mutate: login } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: ILoginData) => authService.login(data),
		onError: (error: any) => {
			if (error.status === 401) setLoginError(true)
		},
	})

	return { login, loginError }
}
