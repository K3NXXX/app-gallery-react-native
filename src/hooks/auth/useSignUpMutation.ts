import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { ISignUpData } from '../../@types/auth/signup.types'
import { authService } from '../../services/auth.service'
import { useNavigation } from '@react-navigation/native'
import { toast } from 'react-toastify'
import { SCREENS } from '../../constants/screens.constants'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useSignUpMutation = () => {
	const [emailError, setEmailError] = useState(false)
	const {reset} = useNavigation()
	const { mutate: signup } = useMutation({
		mutationKey: ['signUp'],
		mutationFn: (data: ISignUpData) => authService.signup(data),
			onSuccess: async (data) => {
				await AsyncStorage.setItem('token', data.token)
				await AsyncStorage.setItem('userData', JSON.stringify(data.user)); 
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
