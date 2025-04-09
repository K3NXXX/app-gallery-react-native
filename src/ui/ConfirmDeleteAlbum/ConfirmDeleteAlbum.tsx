import React from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { useDeleteAlbumMutation } from '../../hooks/albums/useDeleteAlbumMutation'
import { styles } from './ConfirmDeleteAlbum.styles'
import { useGetAllAlbumsQuery } from '../../hooks/albums/useGetAllAlbumsQuery'

interface IConfirmDeleteAlbumProps {
	setIsConfirmDeleteOpen: (isConfirmDeleteOpen: boolean) => void
	albumId: number
}

const ConfirmDeleteAlbum: React.FC<IConfirmDeleteAlbumProps> = ({
	setIsConfirmDeleteOpen,
	albumId,
}) => {

	const { deleteAlbum } = useDeleteAlbumMutation()
	return (
		<Modal transparent={true} animationType='fade'>
			<View style={styles.root}>
				<View style={styles.wrapper}>
					<Text style={styles.sure}>Delete this album?</Text>
					<Text style={styles.info}>
						All images from this album will be removed
					</Text>
					<View style={styles.buttonsWrapper}>
						<TouchableOpacity
							onPress={() => setIsConfirmDeleteOpen(false)}
							style={styles.cancel}
						>
							<Text style={styles.cancelText}>Cancel</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								setIsConfirmDeleteOpen(false)
								deleteAlbum({ albumId: albumId })
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

export default ConfirmDeleteAlbum
