import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { ISignUpData } from '../../@types/auth/signup.types'
import { authService } from '../../services/auth.service'
import { useNavigation } from '@react-navigation/native'
import { toast } from 'react-toastify'

export const useSignUpMutation = () => {
	const [emailError, setEmailError] = useState(false)
	const {reset} = useNavigation()
	const { mutate: signup } = useMutation({
		mutationKey: ['signUp'],
		mutationFn: (data: ISignUpData) => authService.signup(data),
			onSuccess: () => {
					reset({
						index: 0,
						//@ts-ignore
						routes: [{ name: SCREENS.HOME }],
					})
					toast.success('Signed in successfully')
				},
		onError: (error: any) => {
			if (error.status === 400) setEmailError(true)
		},
	})

	return { signup, emailError }
}
