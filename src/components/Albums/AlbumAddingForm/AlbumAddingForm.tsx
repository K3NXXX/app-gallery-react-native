import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import DescriptionIcon from '../../../../assets/images/albums/description-icon.svg'
import ImageIcon from '../../../../assets/images/albums/image -icon.svg'
import NameIcon from '../../../../assets/images/albums/name-icon.svg'
import CloseIcon from '../../../../assets/images/home/close-icon.svg'
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
						<NameIcon width={20} height={20} />
					</View>
					<Controller
						control={control}
						rules={{
							required: 'Album name is required',
							minLength: {
								value: 3,
								message: 'Album name contain min 3 letters',
							},
							maxLength: {
								value: 100,
								message: 'Album name contain max 100 letters',
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
				<View style={styles.inputWrapper}>
					<View style={styles.top}>
						<Text style={styles.label}>Album description (optional)</Text>
						<DescriptionIcon width={20} height={20} />
					</View>
					<Controller
						control={control}
						rules={{
							maxLength: {
								value: 300,
								message: 'Email must contain max 300 letters',
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								placeholder='Your description'
								placeholderTextColor='rgb(97, 100, 107)'
								style={styles.input}
								onChangeText={onChange}
								onBlur={onBlur}
								value={value}
								multiline
								numberOfLines={8}
							/>
						)}
						name='description'
					/>
					{errors.description && (
						<Text style={styles.errorText}>{errors.description.message}</Text>
					)}
				</View>
				<View style={styles.top}>
					<Text style={styles.label}>Album image</Text>
					<ImageIcon width={20} height={20} />
				</View>
				<TouchableOpacity
					style={styles.button}
				>
					<Text style={styles.buttonText}>Upload image</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.createButton}
				>
					<Text style={styles.createText}>Create album</Text>
				</TouchableOpacity>

				
			</View>
		</View>
	)
}

export default AlbumAddingForm
