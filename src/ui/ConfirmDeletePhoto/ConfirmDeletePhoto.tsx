import React from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './ConfirmDeletePhoto.styles'

interface IConfirmDeletePhotoProps {
	setIsConfirmPhotoDelete: (isConfirmPhotoDelete: boolean) => void
	handleDeletePhoto: (photoId: number) => void
	photoId: number  
}

const ConfirmDeletePhoto: React.FC<IConfirmDeletePhotoProps> = ({
	setIsConfirmPhotoDelete,
	handleDeletePhoto,
	photoId  
}) => {
	console.log("photoId", photoId)
	return (
		<Modal transparent={true} animationType="fade">
			<View style={styles.root}>
				<View style={styles.wrapper}>
					<Text style={styles.sure}>Delete this photo?</Text>
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
