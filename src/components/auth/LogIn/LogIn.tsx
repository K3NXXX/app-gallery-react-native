import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import EmailIcon from '../../../../assets/images/sign-up/email.svg'
import EyeHideIcon from '../../../../assets/images/sign-up/eye-hide.svg'
import EyeShowIcon from '../../../../assets/images/sign-up/eye-show.svg'
import PasswordIcon from '../../../../assets/images/sign-up/password.svg'
import { ILoginData } from '../../../@types/auth/login.types'
import { SCREENS } from '../../../constants/screens.constants'
import { styles } from './LogIn.styles'
import { useLoginMutation } from '../../../hooks/auth/useLoginMutation'

const LogIn: React.FC = () => {
	const [showPassword, setShowPassword] = useState(true)
	const { navigate } = useNavigation()

	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<ILoginData>({
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const {login, loginError} = useLoginMutation()

	const onSubmit = (loginData: ILoginData) => {
		const data = {
			email: loginData.email,
			password: loginData.password
		}
		login(data)
	}
	return (
		<View style={styles.root}>
			<View style={styles.wrapper}>
				<Text style={styles.title}>Log in</Text>
				<Text style={styles.descr}>Log in to account to use gallery</Text>
				<View style={styles.form}>
					<View style={styles.inputWrapper}>
						<View style={styles.top}>
							<Text style={styles.label}>Email</Text>
							<EmailIcon width={20} height={20} />
						</View>
						<Controller
							control={control}
							rules={{
								required: 'Email is required',
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: 'Incorrect email format',
								},
								maxLength: {
									value: 100,
									message: 'Email must contain max 100 letters',
								},
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									placeholder='Enter your email'
									placeholderTextColor='rgb(97, 100, 107)'
									style={styles.input}
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
								/>
							)}
							name='email'
						/>
						{errors.email && (
							<Text style={styles.errorText}>{errors.email.message}</Text>
						)}
					</View>
					<View style={styles.inputWrapper}>
						<View style={styles.top}>
							<Text style={styles.label}>Password</Text>
							<PasswordIcon width={20} height={20} />
						</View>
						<Controller
							control={control}
							rules={{
								required: 'Password is required',
								minLength: {
									value: 8,
									message: 'Password must contain at least 8 letters',
								},
								pattern: {
									value: /\d/,
									message: 'Password must contain at least 1 number',
								},
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<View style={styles.passwordWrapper}>
									<TextInput
										secureTextEntry={showPassword}
										placeholder='********'
										placeholderTextColor='rgb(97, 100, 107)'
										style={styles.input}
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
									/>
									{showPassword}
									{showPassword ? (
										<EyeShowIcon
											onPress={() => setShowPassword(false)}
											style={styles.eye}
										/>
									) : (
										<EyeHideIcon
											onPress={() => setShowPassword(true)}
											style={styles.eye}
										/>
									)}
								</View>
							)}
							name='password'
						/>
						{errors.password && (
							<Text style={styles.errorText}>{errors.password.message}</Text>
						)}
						{loginError && (
							<Text style={styles.errorText}>Invalid email or password</Text>
						) }
					</View>
					<TouchableOpacity
						onPress={handleSubmit(onSubmit)}
						style={styles.button}
					>
						<Text style={styles.buttonText}>Log in </Text>
					</TouchableOpacity>
				</View>
				<Text style={styles.haveAccount}>
					Don't have an account?{' '}
					<Text
						onPress={() =>
							//@ts-ignore
							navigate(SCREENS.SIGNUP)
						}
						style={styles.logIn}
					>
						Sign in
					</Text>
				</Text>
			</View>
		</View>
	)
}

export default LogIn
