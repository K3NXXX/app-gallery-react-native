import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import CloseIcon from '../../../../assets/images/home/close-icon.svg'
import EmailIcon from '../../../../assets/images/sign-up/email.svg'
import { ICreateAlbum } from '../../../@types/albums/albums.types'
import { useGetMe } from '../../../hooks/auth/useGetMe'
import { styles } from './AlbumAddingForm.styles'

interface IAlbumAddingFormProps {
	setOpenAlbumAddingForm: (openAlbumAddingForm: boolean) => void
}

const AlbumAddingForm: React.FC<IAlbumAddingFormProps> = ({
	setOpenAlbumAddingForm,
}) => {
	const { userData } = useGetMe()

	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<ICreateAlbum>({
		mode: 'onChange',
		defaultValues: {
			name: '',
			description: '',
			image: '',
		},
	})

	const onSubmit = (updatedData: any) => {
		const data = {
			name: updatedData.name,
			email: updatedData.email,
			password: updatedData.password,
			currentPassword: updatedData.currentPassword,
		}
	}

	return (
		<View style={styles.root}>
			<CloseIcon
				onPress={() => setOpenAlbumAddingForm(false)}
				width={30}
				height={30}
				style={styles.closeIcon}
			/>
			<View style={styles.form}>
				<View style={styles.inputWrapper}>
					<View style={styles.top}>
						<Text style={styles.label}>Album name</Text>
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
								placeholder='My resorts'
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

				<TouchableOpacity
					onPress={handleSubmit(onSubmit)}
					style={styles.button}
				>
					<Text style={styles.buttonText}>Create album</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default AlbumAddingForm
