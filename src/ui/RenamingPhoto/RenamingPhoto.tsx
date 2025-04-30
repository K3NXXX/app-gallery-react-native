import React, { useEffect, useRef, useState } from 'react'
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useRenamePhotoMutation } from '../../hooks/photos/useRenamePhotoMutation'
import { useGetOneAlbumMutation } from '../../hooks/albums/useGetOneAlbumMutation'
import { useImageStore } from '../../zustand/useStore'
import { styles } from './RenamingPhoto.styles'

interface IRenamingPhotoProps {
	setIsRenamingPhotoOpened: (isRenamingPhotoOpened: boolean) => void
	currentPhotoName: string
	photoId: number
}

const RenamingPhoto: React.FC<IRenamingPhotoProps> = ({
	setIsRenamingPhotoOpened,
	currentPhotoName,
	photoId,
}) => {
	const { albumId } = useImageStore() 
	const inputRef = useRef<TextInput>(null)
	const [text, setText] = useState(currentPhotoName)
	const actualAlbumId = albumId || 0
	const {getOneAlbum} = useGetOneAlbumMutation()
	const { renamePhoto, renamingSuccess, renamePhotoError } =
		useRenamePhotoMutation(actualAlbumId, getOneAlbum)


		const handleRename = () => {
			const data = {
				photoId: photoId,
				newName: text,
			}
			renamePhoto(data)
		}
	

	useEffect(() => {
		setTimeout(() => {
			if (inputRef.current) {
				inputRef.current.focus()
				inputRef.current.setSelection(0, text.length)
			}
		}, 100)
	}, [])

	
	useEffect(() => {
		if (renamingSuccess) setIsRenamingPhotoOpened(false)
	}, [renamingSuccess])

	return (
		<Modal transparent={true} animationType='fade'>
			<View style={styles.root}>
				<View style={styles.wrapper}>
					<Text style={styles.sure}>Rename your photo</Text>
					<View style={styles.inputWrapper}>
						<TextInput
							ref={inputRef}
							value={text}
							onChangeText={setText}
							style={styles.input}
						/>
						{renamePhotoError && (
							<Text style={styles.errorText}>Photo name is required</Text>
						)}
					</View>
					<View style={styles.buttonsWrapper}>
						<TouchableOpacity
							onPress={() => setIsRenamingPhotoOpened(false)}
							style={styles.cancel}
						>
							<Text style={styles.cancelText}>Cancel</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={handleRename} style={styles.delete}>
							<Text style={styles.deleteText}>Rename</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	)
}

export default RenamingPhoto
