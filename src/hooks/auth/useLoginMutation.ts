import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { ILoginData } from '../../@types/auth/login.types'
import { SCREENS } from '../../constants/screens.constants'
import { authService } from '../../services/auth.service'

export const useLoginMutation = () => {
	const [loginError, setLoginError] = useState(false)
	const { reset } = useNavigation()
	const { mutate: login } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: ILoginData) => authService.login(data),
		onSuccess: () => {
			reset({
				index: 0,
				//@ts-ignore
				routes: [{ name: SCREENS.HOME }],
			})
			toast.success('Logged in successfully')
		},
		onError: (error: any) => {
			if (error.status === 401) setLoginError(true)
		},
	})

	return { login, loginError }
}
