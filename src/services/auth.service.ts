import axios from 'axios'
import { ISignUpData } from '../@types/auth/signup.types'
import { ILoginData } from '../@types/auth/login.types'

class AuthService {
	private BASE_URL= "http://localhost:7777"

	async signup(signupData: ISignUpData) {
		const { data } = await axios.post(`${this.BASE_URL}/auth/register`, signupData)
		return data
	}

	async login(loginData: ILoginData) {
		const { data } = await axios.post(`${this.BASE_URL}/auth/login`, loginData)
		return data
	}

	
}

export const authService = new AuthService()