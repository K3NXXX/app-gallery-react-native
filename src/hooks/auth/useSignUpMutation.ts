import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { ISignUpData } from '../../@types/auth/signup.types'
import { authService } from '../../services/auth.service'

export const useSignUpMutation = () => {
	const [emailError, setEmailError] = useState(false)
	const { mutate: signup } = useMutation({
		mutationKey: ['signUp'],
		mutationFn: (data: ISignUpData) => authService.signup(data),
		onError: (error: any) => {
			if (error.status === 400) setEmailError(true)
		},
	})

	return { signup, emailError }
}
