import * as ImageManipulator from 'expo-image-manipulator'
import * as ImagePicker from 'expo-image-picker'

export const handleUploadImage = async (
	mode: string | undefined,
	uploadPhotoFunction?: any,
	fromWhichPage?: string,
	setAlbumImageUrl?: (url: string) => void
) => {
	try {
		let result: ImagePicker.ImagePickerResult
		if (mode === 'gallery') {
			await ImagePicker.requestMediaLibraryPermissionsAsync()
			result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: false,
				quality: 1,
				allowsMultipleSelection:
					fromWhichPage === 'profile' || fromWhichPage === 'album'
						? false
						: true,
			})
		} else {
			const { status } = await ImagePicker.requestCameraPermissionsAsync()
			if (status !== 'granted') {
				alert('Permission to access camera is required!')
				return
			}
			result = await ImagePicker.launchCameraAsync({
				cameraType: ImagePicker.CameraType.back,
				allowsEditing: true,
				quality: 1,
			})
		}

		if (!result.canceled && result.assets?.length > 0) {
			const uploadPromises = result.assets.map(async asset => {
				const manipulatedImage = await ImageManipulator.manipulateAsync(
					asset.uri,
					[{ resize: { width: 800 } }],
					{ compress: 0.8 }
				)

				if (fromWhichPage === 'album' && setAlbumImageUrl) {
					setAlbumImageUrl(manipulatedImage.uri)
				} else {
					return uploadPhotoFunction({
						url: manipulatedImage.uri,
					})
				}
			})

			await Promise.allSettled(uploadPromises)
		}
	} catch (error: any) {
		alert('Error uploading images: ' + error.message)
	}
}
