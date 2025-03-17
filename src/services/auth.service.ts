import axios from 'axios'
import { ISignUpData } from '../@types/auth/signup.types'
import { ILoginData } from '../@types/auth/login.types'
import Config from 'react-native-config';

class AuthService {
	private BASE_URL= process.env.EXPO_PUBLIC_API_URL

	async signup(signupData: ISignUpData) {
		const { data } = await axios.post(`${this.BASE_URL}/auth/register`, signupData)
		console.log('Config:', this.BASE_URL);
		return data
	}

	async login(loginData: ILoginData) {
		const { data } = await axios.post(`${this.BASE_URL}/auth/login`, loginData)
		return data
	}

	
}

export const authService = new AuthService()