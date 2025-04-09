import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
	Image,
	Pressable,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { useClickOutside } from 'react-native-click-outside'
import CloseIcon from '../../../../assets/images/albums/close-icon.svg'
import DescriptionIcon from '../../../../assets/images/albums/description-icon.svg'
import ImageIcon from '../../../../assets/images/albums/image-icon.svg'
import NameIcon from '../../../../assets/images/albums/name-icon.svg'
import ReturnIcon from '../../../../assets/images/home/return-icon.svg'
import CameraIcon from '../../../../assets/images/navigation-menu/camera.svg'
import GalleryIcon from '../../../../assets/images/navigation-menu/gallery-icon.svg'
import { ICreateAlbum, IEditAlbum, IGetOneAlbum } from '../../../@types/albums/albums.types'
import { useCreateAlbumMutation } from '../../../hooks/albums/useCreateAlbumMutation'
import { handleUploadImage } from '../../../utils/handleUploadImage'
import { useImageStore } from '../../../zustand/useStore'
import { styles } from './EditAlbumForm.styles'
import { useEditAlbumDataMutation } from '../../../hooks/albums/useEditAlbumDataMutation'

interface IAlbumAddingFormProps {
	setIsEditFormOpen: (isEditFormOpen: boolean) => void
	albumId: number
	getOneAlbum: (data: IGetOneAlbum) => void

}

const AlbumEditForm: React.FC<IAlbumAddingFormProps> = ({
	setIsEditFormOpen,
	albumId,
	getOneAlbum
}) => {
	const setAlbumImageUrl = useImageStore((state: any) => state.setAlbumImageUrl)
	const albumImageUrl = useImageStore((state: any) => state.albumImageUrl)
	const [errorMessage, setErrorMessage] = useState('')
	const [isUploadImageOpened, setIsUploadImageOpened] = useState(false)
	const albumFormOpenedRef = useClickOutside<View>(() =>
		setIsUploadImageOpened(false)
	)
	const {  updateAlbum} = useEditAlbumDataMutation(albumId, getOneAlbum)
	const onClose = () => {
		setIsEditFormOpen(false)
		setAlbumImageUrl('')
	}

	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<IEditAlbum>({
		mode: 'onChange',
		defaultValues: {
			name: '',
			description: '',
			imageUrl: '',
		},
	})

	const onSubmit = (albumData: IEditAlbum) => {
		const descriptionFilled = albumData.description?.trim() !== ''
		if (!albumData.name.trim() && !descriptionFilled && !albumImageUrl) {
			setErrorMessage('Please enter a name, description, or upload an image');
			return;
		}

		setErrorMessage('')
		const data = {
			albumId: albumId,
			name: albumData.name,
			description: albumData.description,
			imageUrl: albumImageUrl ? albumImageUrl : '',
		}
		console.log(data)

		updateAlbum(data)
		onClose()
	}

	return (
		<View style={styles.root}>
			<ReturnIcon
				onPress={() => onClose()}
				width={30}
				height={30}
				style={styles.closeIcon}
			/>
			<View style={styles.form}>
				<View style={styles.inputWrapper}>
					<View style={styles.top}>
						<Text style={styles.label}>New album name</Text>
						<NameIcon width={20} height={20} />
					</View>
					<Controller
						control={control}
						rules={{
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
								placeholderTextColor='rgb(255, 255, 255)'
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
						<Text style={styles.label}>New album description (optional)</Text>
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
								placeholderTextColor='rgb(255, 255, 255)'
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
					<Text style={styles.label}>New album image (optional)</Text>
					<ImageIcon width={20} height={20} />
				</View>
				<View>
					{albumImageUrl ? (
						<View style={styles.albumImageWrapper}>
							<Image
								style={styles.albumImage}
								source={{ uri: albumImageUrl }}
							/>
							<TouchableOpacity
								onPress={() => setAlbumImageUrl('')}
								style={styles.albumCloseIcon}
							>
								<CloseIcon width={30} height={30} />
							</TouchableOpacity>
						</View>
					) : (
						<TouchableOpacity
							onPress={() => setIsUploadImageOpened(true)}
							style={styles.button}
						>
							<Text style={styles.buttonText}>Upload image</Text>
						</TouchableOpacity>
					)}
				</View>
				<Text style={styles.error}>{errorMessage}</Text>
				<TouchableOpacity
					onPress={handleSubmit(onSubmit)}
					style={styles.createButton}
				>
					<Text style={styles.createText}>Edit album</Text>
				</TouchableOpacity>
			</View>
			{isUploadImageOpened && (
				<View style={styles.modal}>
					<View ref={albumFormOpenedRef} style={styles.ways}>
						<Text style={styles.titlePhoto}>Upload image</Text>
						<View style={styles.wayWrapper}>
							<Pressable
								onPress={() =>
									handleUploadImage(undefined, null, 'album', setAlbumImageUrl)
								}
							>
								<View style={[styles.container, styles.firstContainer]}>
									<CameraIcon width={40} height={40} />
									<Text style={styles.way}>Camera</Text>
								</View>
							</Pressable>
							<Pressable
								onPress={() =>
									handleUploadImage('gallery', null, 'album', setAlbumImageUrl)
								}
							>
								<View style={styles.container}>
									<GalleryIcon
										style={styles.iconGallery}
										width={30}
										height={30}
									/>
									<Text style={styles.way}>Gallery</Text>
								</View>
							</Pressable>
						</View>
					</View>
				</View>
			)}
		</View>
	)
}

export default AlbumEditForm
