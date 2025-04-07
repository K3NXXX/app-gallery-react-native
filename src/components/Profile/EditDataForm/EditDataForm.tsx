import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import CloseIcon from '../../../../assets/images/home/close-icon.svg'
import EmailIcon from '../../../../assets/images/sign-up/email.svg'
import EyeHideIcon from '../../../../assets/images/sign-up/eye-hide.svg'
import EyeShowIcon from '../../../../assets/images/sign-up/eye-show.svg'
import PasswordIcon from '../../../../assets/images/sign-up/password.svg'
import UserIcon from '../../../../assets/images/sign-up/user.svg'
import { IEditData } from '../../../@types/auth/user.types'
import { useUpdateUserDataMutation } from '../../../hooks/auth/useUpdateUserDataMutation'
import { styles } from './EditDataForm.styles'
import { useGetMe } from '../../../hooks/auth/useGetMe'

interface IEditDataFormProps {
	setOpenEditForm: (openEditForm: boolean) => void
}

const EditDataForm: React.FC<IEditDataFormProps> = ({ setOpenEditForm }) => {
	const [showPassword, setShowPassword] = useState(true)
	const [showCurrentPassword, setShowCurrentPassword] = useState(true)
	const { updateData, dataEdited } = useUpdateUserDataMutation()
  const {userData} = useGetMe()

	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<IEditData>({
		mode: 'onChange',
		defaultValues: {
			name: '',
			email: '',
			password: '',
			currentPassword: '',
		},
	})

	const onSubmit = (updatedData: IEditData) => {
		const data = {
			name: updatedData.name,
			email: updatedData.email,
			password: updatedData.password,
			currentPassword: updatedData.currentPassword,
		}
		console.log("user", data)
		updateData(data)
	}

  useEffect(() => {
    setOpenEditForm(dataEdited)
  }, [dataEdited])
	

  

	return (
		<View style={styles.root}>
			<CloseIcon
				onPress={() => setOpenEditForm(false)}
				width={30}
				height={30}
				style={styles.closeIcon}
			/>
			<View style={styles.form}>
				<View style={styles.inputWrapper}>
					<View style={styles.top}>
						<Text style={styles.label}>Name</Text>
						<UserIcon width={20} height={20} />
					</View>
					<Controller
						control={control}
						rules={{
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
							validate: {
								atLeastOneField: value =>
									value || watch('email') || watch('password')
										? true
										: 'At least you have to edit name, email, or password',
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								placeholder={userData?.user?.name || 'Enter name'}
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
								placeholder={userData?.user?.email || 'Enter email'}
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
				</View>

				<View style={styles.inputWrapper}>
					<View style={styles.top}>
						<Text style={styles.label}>Password</Text>
						<PasswordIcon width={20} height={20} />
					</View>
					<Controller
						control={control}
						rules={{
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
								{showPassword ? (
									<EyeShowIcon
										width={25}
										height={25}
										onPress={() => setShowPassword(false)}
										style={styles.eye}
									/>
								) : (
									<EyeHideIcon
										width={25}
										height={25}
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
				</View>

				<View style={styles.inputWrapper}>
					<View style={styles.top}>
						<Text style={styles.label}>Current Password</Text>
						<PasswordIcon width={20} height={20} />
					</View>
					<Controller
						control={control}
						rules={{
							required: 'Current password is required',

							minLength: {
								value: 8,
								message: 'Current password must contain at least 8 letters',
							},
							pattern: {
								value: /\d/,
								message: 'Password must contain at least 1 number',
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<View style={styles.passwordWrapper}>
								<TextInput
									secureTextEntry={showCurrentPassword}
									placeholder='********'
									placeholderTextColor='rgb(97, 100, 107)'
									style={styles.input}
									onChangeText={onChange}
									onBlur={onBlur}
									value={value}
								/>
								{showCurrentPassword}
								{showCurrentPassword ? (
									<EyeShowIcon
										width={25}
										height={25}
										onPress={() => setShowCurrentPassword(false)}
										style={styles.eye}
									/>
								) : (
									<EyeHideIcon
										width={25}
										height={25}
										onPress={() => setShowCurrentPassword(true)}
										style={styles.eye}
									/>
								)}
							</View>
						)}
						name='currentPassword'
					/>
					{errors.currentPassword && (
						<Text style={styles.errorText}>
							{errors.currentPassword.message}
						</Text>
					)}
				</View>

				<TouchableOpacity
					onPress={handleSubmit(onSubmit)}
					style={styles.button}
				>
					<Text style={styles.buttonText}>Edit data</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default EditDataForm
