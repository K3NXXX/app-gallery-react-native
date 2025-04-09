import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import Toast from 'react-native-toast-message'
import { ISignUpData } from '../../@types/auth/signup.types'
import { SCREENS } from '../../constants/screens.constants'
import { authService } from '../../services/auth.service'

export const useSignUpMutation = (logIn: () => void) => {
	const [emailError, setEmailError] = useState(false)
	const { reset } = useNavigation()
	const { mutate: signup } = useMutation({
		mutationKey: ['signUp'],
		mutationFn: (data: ISignUpData) => authService.signup(data),
		onSuccess: async data => {
			console.log(data)
			await AsyncStorage.setItem('token', data.token)
			if (data.user) {
				await AsyncStorage.setItem('userData', JSON.stringify(data.user))
			}
			logIn()
			reset({
				index: 0,
				//@ts-ignore
				routes: [{ name: SCREENS.HOME }],
			})
			Toast.show({
				type: 'success',
				text1: 'Registration successful',
			})
		},
		onError: (error: any) => {
			if (error.status === 400) setEmailError(true)
		},
	})

	return { signup, emailError }
}
