import axios from 'axios'
import { ILoginData } from '../@types/auth/login.types'
import { ISignUpData } from '../@types/auth/signup.types'
import { IEditData } from '../@types/auth/user.types'
import api from '../axios/interceptors'

class AuthService {
	private BASE_URL = process.env.EXPO_PUBLIC_API_URL

	async signup(signupData: ISignUpData) {
		const { data } = await axios.post(
			`${this.BASE_URL}/auth/register`,
			signupData
		)
		return data
	}

	async login(loginData: ILoginData) {
		const { data } = await axios.post(`${this.BASE_URL}/auth/login`, loginData)
		return data
	}

	async updateUser(userData: IEditData) {
		const { data } = await api.post(
			`${this.BASE_URL}/auth/updateUser`,
			userData
		)
		return data
	}

	async getMe() {
		const { data } = await api.get(`auth/getMe`)
		return data
	}
}

export const authService = new AuthService()
