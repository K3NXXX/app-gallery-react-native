import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import Toast from 'react-native-toast-message'
import { ILoginData } from '../../@types/auth/login.types'
import { SCREENS } from '../../constants/screens.constants'
import { authService } from '../../services/auth.service'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useLoginMutation = () => {
	const [loginError, setLoginError] = useState(false)
	const { reset } = useNavigation()
	const { mutate: login } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: ILoginData) => authService.login(data),
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
				text1: 'Log in successful',
			})
		},
		onError: (error: any) => {
			if (error.status === 401) setLoginError(true)
		},
	})

	return { login, loginError }
}
