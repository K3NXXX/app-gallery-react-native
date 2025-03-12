import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native-gesture-handler'
import EmailIcon from '../../../../assets/images/sign-up/email.svg'
import EyeHideIcon from '../../../../assets/images/sign-up/eye-hide.svg'
import EyeShowIcon from '../../../../assets/images/sign-up/eye-show.svg'
import PasswordIcon from '../../../../assets/images/sign-up/password.svg'
import UserIcon from '../../../../assets/images/sign-up/user.svg'
import { SCREENS } from '../../../constants/screens.constants'
import { styles } from './SignUp.styles'

const SignUp: React.FC = () => {
	const [showPassword, setShowPassword] = useState(true)
	const navigation = useNavigation()
	const { navigate } = useNavigation()
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
							<Text style={styles.label}>Full name</Text>
							<UserIcon width={20} height={20} />
						</View>
						<TextInput
							placeholder='Enter your full name'
							placeholderTextColor='rgb(97, 100, 107)'
							style={styles.input}
						/>
					</View>
					<View style={styles.inputWrapper}>
						<View style={styles.top}>
							<Text style={styles.label}>Email</Text>
							<EmailIcon width={20} height={20} />
						</View>
						<TextInput
							placeholder='Enter your email'
							placeholderTextColor='rgb(97, 100, 107)'
							style={styles.input}
						/>
					</View>
					<View style={styles.inputWrapper}>
						<View style={styles.top}>
							<Text style={styles.label}>Password</Text>
							<PasswordIcon width={20} height={20} />
						</View>
						<View style={styles.passwordWrapper}>
							<TextInput
								secureTextEntry={showPassword}
								placeholder='********'
								placeholderTextColor='rgb(97, 100, 107)'
								style={styles.input}
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
					</View>
					<TouchableOpacity style={styles.button}>
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
