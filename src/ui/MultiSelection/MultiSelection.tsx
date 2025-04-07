import React, { useState } from 'react'
import {
	Image,
	Modal,
	Pressable,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import CheckMarkIcon from '../../../assets/images/albums/check-mark-icon.svg'
import CloseSelectionIcon from '../../../assets/images/albums/close-selection-icon.svg'
import ReturnIcon from '../../../assets/images/home/return-icon.svg'
import { useAddPhotoToAlbumMutation } from '../../hooks/albums/useAddPhotoToAlbumMutation'
import { useGetAllPhotos } from '../../hooks/photos/useGetAllPhotosMutation'
import { styles } from './MultiSelection.styles'

interface IMultiSelectionProps {
	setIsMultiSelectionOpened: (isMultiSelectionOpened: boolean) => void
	albumId: number
}

const MultiSelection: React.FC<IMultiSelectionProps> = ({
	setIsMultiSelectionOpened,
	albumId,
}) => {
	const { allPhotos } = useGetAllPhotos()
	const [selectedPhotos, setSelectedPhotos] = useState<number[]>([])
	const { addPhotoToAlbum } = useAddPhotoToAlbumMutation()

	const toggleSelection = (photoId: number) => {
		setSelectedPhotos(prevSelectedPhotos =>
			prevSelectedPhotos.includes(photoId)
				? prevSelectedPhotos.filter(id => id !== photoId)
				: [...prevSelectedPhotos, photoId]
		)
	}

	const getImageStyle = (photoId: number) => {
		return selectedPhotos.includes(photoId)
			? styles.selectedImageWrapper
			: styles.photoWrapper
	}

	const handleAddPhotoToAlbum = () => {
		const data = {
			albumId: albumId,
			photoIds: selectedPhotos,
		}
		addPhotoToAlbum(data)
		setIsMultiSelectionOpened(false)
	}


	return (
		<Modal transparent={true} animationType='fade'>
			<View style={styles.root}>
				<TouchableOpacity
					onPress={() => setIsMultiSelectionOpened(false)}
					style={styles.returnIcon}
				>
					<ReturnIcon width={30} height={30} />
				</TouchableOpacity>
				<View style={styles.top}>
					<Text style={styles.add}>Add images to album</Text>
					<Text style={styles.selected}>
						Selected images: {selectedPhotos.length}
					</Text>
				</View>
				<View style={styles.list}>
					<FlatList
						data={allPhotos}
						keyExtractor={item => item.id.toString()}
						numColumns={3}
						showsVerticalScrollIndicator={false}
						renderItem={({ item }) => {
							const isSelected = selectedPhotos.includes(item.id)
							return (
								<Pressable
									style={styles.photoContainer}
									onPress={() => toggleSelection(item.id)}
								>
									<View style={getImageStyle(item.id)}>
										<Image
											source={{ uri: item.url }}
											style={isSelected ? styles.selectedImage : styles.photo}
										/>

										{isSelected && (
											<CheckMarkIcon
												style={styles.checkMark}
												width={23}
												height={23}
											/>
										)}
									</View>
								</Pressable>
							)
						}}
					/>
				</View>
			</View>
			{selectedPhotos.length > 0 && (
				<View style={styles.addRow}>
					<TouchableOpacity onPress={() => setSelectedPhotos([])}>
						<CloseSelectionIcon width={25} height={25} />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => handleAddPhotoToAlbum()}
						style={styles.addImagesBtn}
					>
						<Text style={styles.addImagesBtnText}>Confirm</Text>
					</TouchableOpacity>
				</View>
			)}
		</Modal>
	)
}

export default MultiSelection
