import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import React, { useState } from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { useClickOutside } from 'react-native-click-outside'
import CameraIcon from '../../../assets/images/navigation-menu/camera.svg'
import GalleryIcon from '../../../assets/images/navigation-menu/gallery-icon.svg'
import { menuList } from '../../lists/menu.list'
import { useImageStore } from '../../zustand/useStore'
import { styles } from './NavigationMenu.styles'
import { useAddPhotoMutation } from '../../hooks/photos/useAddPhotoMutation'
import { useGetMe } from '../../hooks/auth/useGetMe'

const NavigationMenu: React.FC = () => {
	const [addPhoto, setAddPhoto] = useState(false)
	const { navigate } = useNavigation()
	const ref = useClickOutside<View>(() => setAddPhoto(false))
	const { createPhoto } = useAddPhotoMutation()
	const {userData} = useGetMe()

	const setImage = useImageStore(state => state.setImage)

	const handleUploadImage = async () => {
		try {
			const { status } = await ImagePicker.requestCameraPermissionsAsync()
			if (status !== 'granted') {
				alert('Permission to access camera is required!')
				return
			}

			const result = await ImagePicker.launchCameraAsync({
				cameraType: ImagePicker.CameraType.back,
				allowsEditing: true,
				quality: 1,
			})

			if (!result.canceled) {
				// Compress the image
				const manipulatedImage = await ImageManipulator.manipulateAsync(
					result.assets[0].uri,
					[{ resize: { width: 800 } }], // Resize the image to a smaller width
					{ compress: 0.5 } // Compress the image to reduce size
				)

				setImage(manipulatedImage.uri)
				createPhoto({ userId: userData?.user.id, url: manipulatedImage.uri })
				console.log(manipulatedImage.uri)
			}
		} catch (error: any) {
			alert('Error uploading image: ' + error.message)
		}
	}

	return (
		<>
			{addPhoto && (
				<View style={styles.modal}>
					<View ref={ref} style={styles.ways}>
						<Text style={styles.title}>Add photo</Text>
						<View style={styles.wayWrapper}>
							<Pressable onPress={() => handleUploadImage()}>
								<View style={[styles.container, styles.firstContainer]}>
									<CameraIcon width={40} height={40} />
									<Text style={styles.way}>Camera</Text>
								</View>
							</Pressable>
							<View style={styles.container}>
								<GalleryIcon
									style={styles.iconGallery}
									width={30}
									height={30}
								/>
								<Text style={styles.way}>Gallery</Text>
							</View>
						</View>
					</View>
				</View>
			)}

			<View style={styles.root}>
				<View style={styles.wrapper}>
					{menuList.map(item => (
						<TouchableOpacity
							//@ts-ignore
							onPress={() => navigate(item.link)}
							style={styles.item}
							key={item.id}
						>
							{item.id === 3 ? (
								<View style={styles.addPhotoWrapper}>
									<TouchableOpacity onPress={() => setAddPhoto(!addPhoto)}>
										<item.icon style={styles.createIcon} fill='#ee9938' />
									</TouchableOpacity>
								</View>
							) : (
								<item.icon width={25} height={25} style={styles.icon} />
							)}
							<Text style={styles.label}>{item.label}</Text>
						</TouchableOpacity>
					))}
				</View>
			</View>
		</>
	)
}
export default NavigationMenu
