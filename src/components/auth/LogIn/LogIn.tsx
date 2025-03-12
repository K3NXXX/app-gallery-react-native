import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import EmailIcon from '../../../../assets/images/sign-up/email.svg'
import EyeHideIcon from '../../../../assets/images/sign-up/eye-hide.svg'
import EyeShowIcon from '../../../../assets/images/sign-up/eye-show.svg'
import PasswordIcon from '../../../../assets/images/sign-up/password.svg'
import { styles } from './LogIn.styles'

const LogIn: React.FC = () => {
	const [showPassword, setShowPassword] = useState(true)
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
						<Text style={styles.buttonText}>Log in </Text>
					</TouchableOpacity>
				</View>
				<Text style={styles.haveAccount}>
					Don't have an account? <Text style={styles.logIn}>Sign in</Text>
				</Text>
			</View>
		</View>
	)
}

export default LogIn
