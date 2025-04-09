import React from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './ConfirmDeletePhoto.styles'

interface IConfirmDeletePhotoProps {
	setIsConfirmPhotoDelete: (isConfirmPhotoDelete: boolean) => void
	handleDeletePhoto: (photoId: number) => void
	photoId: number
	fromWhichPage: string
}

const ConfirmDeletePhoto: React.FC<IConfirmDeletePhotoProps> = ({
	setIsConfirmPhotoDelete,
	handleDeletePhoto,
	photoId,
	fromWhichPage,
}) => {
	return (
		<Modal transparent={true} animationType='fade'>
			<View style={styles.root}>
				<View style={styles.wrapper}>
					{fromWhichPage === 'fullAlbum' ? (
						<Text style={styles.sure}>Delete this photo from album?</Text>
					) : (
						<Text style={styles.sure}>Delete this photo?</Text>
					)}
					<View style={styles.buttonsWrapper}>
						<TouchableOpacity
							onPress={() => setIsConfirmPhotoDelete(false)}
							style={styles.cancel}
						>
							<Text style={styles.cancelText}>Cancel</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => {
								handleDeletePhoto(photoId)
								setIsConfirmPhotoDelete(false)
							}}
							style={styles.delete}
						>
							<Text style={styles.deleteText}>Delete</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	)
}

export default ConfirmDeletePhoto
