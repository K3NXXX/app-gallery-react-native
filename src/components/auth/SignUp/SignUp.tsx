import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import { TextInput } from 'react-native-gesture-handler'
import EmailIcon from '../../../../assets/images/sign-up/email.svg'
import EyeHideIcon from '../../../../assets/images/sign-up/eye-hide.svg'
import EyeShowIcon from '../../../../assets/images/sign-up/eye-show.svg'
import PasswordIcon from '../../../../assets/images/sign-up/password.svg'
import UserIcon from '../../../../assets/images/sign-up/user.svg'
import { ISignUpData } from '../../../@types/auth/signup.types'
import { SCREENS } from '../../../constants/screens.constants'
import { styles } from './SignUp.styles'
import { useMutation } from '@tanstack/react-query'
import { authService } from '../../../services/auth.service'
import { useSignUpMutation } from '../../../hooks/auth/useSignUpMutation'

const SignUp: React.FC = () => {
	const [showPassword, setShowPassword] = useState(true)
	const [showConfPassword, setShowConfPassword] = useState(true)
	const { navigate } = useNavigation()

	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<ISignUpData>({
		mode: 'onChange',
		defaultValues: {
			name: '',
			email: '',
			password: '',
			passwordConfirm: '',
		},
	})
	const password = watch('password')

	const {signup, emailError} = useSignUpMutation()

	const onSubmit = (signupData: ISignUpData) => {
		const data = {
			name: signupData.name,
			email: signupData.email,
			password: signupData.password
		}
		signup(data)
		console.log(signupData)
	}
	return (
		<View style={styles.root}>
			<View style={styles.wrapper}>
				<Text style={styles.title}>Sign in</Text>
				<Text style={styles.descr}>
					Sign in to access an account and explore many things
				</Text>
				<View style={styles.form}>
					<View style={styles.inputWrapper}>
						<View style={styles.top}>
							<Text style={styles.label}>Name</Text>
							<UserIcon width={20} height={20} />
						</View>
						<Controller
							control={control}
							rules={{
								required: 'Name is required',
								minLength: {
									value: 3,
									message: 'Name must contain at least 3 letters',
								},
								maxLength: {
									value: 50,
									message: 'Name must contain max 50 letters',
								},
								pattern: {
									value: /^[a-zA-Zа-яА-Я0-9]+$/,
									message: 'Name cannot contain special characters',
								},
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									placeholder='Richard'
									placeholderTextColor='rgb(97, 100, 107)'
									style={styles.input}
									onChangeText={onChange}
									onBlur={onBlur}
									value={value}
								/>
							)}
							name='name'
						/>
						{errors.name && (
							<Text style={styles.errorText}>{errors.name.message}</Text>
						)}
					</View>
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
									placeholder='richardcorp@gmail.com'
									placeholderTextColor='rgb(97, 100, 107)'
									style={styles.input}
									onChangeText={onChange}
									onBlur={onBlur}
									value={value}
								/>
							)}
							name='email'
						/>
						{errors.email && (
							<Text style={styles.errorText}>{errors.email.message}</Text>
						)}
						{emailError  && (
							<Text style={styles.errorText}>Email is already in use</Text> )}
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
										onChangeText={onChange}
										onBlur={onBlur}
										value={value}
									/>
									{showPassword}
									{/* {showPassword ? (
										<EyeShowIcon
											onPress={() => setShowPassword(false)}
											style={styles.eye}
										/>
									) : (
										<EyeHideIcon
											onPress={() => setShowPassword(true)}
											style={styles.eye}
										/>
									)} */}
								</View>
							)}
							name='password'
						/>
						{errors.password && (
							<Text style={styles.errorText}>{errors.password.message}</Text>
						)}
					</View>
					<View style={styles.inputWrapper}>
						<View style={styles.top}>
							<Text style={styles.label}>Confirm password</Text>
							<PasswordIcon width={20} height={20} />
						</View>
						<Controller
							control={control}
							rules={{
								required: 'Confirm password is required',
								validate: value =>
									value === password || 'Passwords do not match',
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<View style={styles.passwordWrapper}>
									<TextInput
										secureTextEntry={showConfPassword}
										placeholder='********'
										placeholderTextColor='rgb(97, 100, 107)'
										style={styles.input}
										onChangeText={onChange}
										onBlur={onBlur}
										value={value}
									/>
									{showConfPassword}
									{/* {showConfPassword ? (
										<EyeShowIcon
											onPress={() => setShowConfPassword(false)}
											style={styles.eye}
										/>
									) : (
										<EyeHideIcon
											onPress={() => setShowConfPassword(true)}
											style={styles.eye}
										/>
									)} */}
								</View>
							)}
							name='passwordConfirm'
						/>
						{errors.passwordConfirm && (
							<Text style={styles.errorText}>
								{errors.passwordConfirm.message}
							</Text>
						)}
					</View>
					<TouchableOpacity
						onPress={handleSubmit(onSubmit)}
						style={styles.button}
					>
						<Text style={styles.buttonText}>Sign in</Text>
					</TouchableOpacity>
				</View>
				<Text style={styles.haveAccount}>
					Have an account?{' '}
					<Text
						onPress={() =>
							//@ts-ignore
							navigate(SCREENS.LOGIN)
						}
						style={styles.logIn}
					>
						Log in
					</Text>
				</Text>
			</View>
		</View>
	)
}

export default SignUp
