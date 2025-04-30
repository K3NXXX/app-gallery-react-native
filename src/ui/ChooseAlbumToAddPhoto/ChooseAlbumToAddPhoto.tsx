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
import { useGetAllAlbumsQuery } from '../../hooks/albums/useGetAllAlbumsQuery'
import { useAddPhotoToAlbumMutation } from '../../hooks/albums/useAddPhotoToAlbumMutation'
import CheckMarkIcon from '../../../assets/images/albums/check-mark-icon.svg'
import CloseSelectionIcon from '../../../assets/images/albums/close-selection-icon.svg'
import NoImageIcon from '../../../assets/images/albums/no-image-icon.svg'
import ReturnIcon from '../../../assets/images/home/return-icon.svg'
import { styles } from './ChooseAlbumToAddPhoto.styles'

interface IChooseAlbumToAddPhoto {
	setIsChooseAlbumOpened: (isChooseAlbumOpened: boolean) => void
	photoId: number
}

const ChooseAlbumToAddPhoto: React.FC<IChooseAlbumToAddPhoto> = ({
	setIsChooseAlbumOpened,
	photoId
}) => {
	const { allAlbums } = useGetAllAlbumsQuery()
	const [selectedAlbums, setSelectedAlbums] = useState<number[]>([])

	const toggleSelection = (albumId: number) => {
		setSelectedAlbums(prevSelectedAlbums =>
			prevSelectedAlbums.includes(albumId)
				? prevSelectedAlbums.filter(id => id !== albumId)
				: [...prevSelectedAlbums, albumId]
		)
	}

	const getAlbumStyle = (photoId: number) => {
		return selectedAlbums.includes(photoId)
			? styles.selectedImageWrapper
			: styles.photoWrapper
	}

	const {addPhotoToAlbum} = useAddPhotoToAlbumMutation()

	const handleAddPhotoToAlbums = () => {
		const data = {
			albumIds: selectedAlbums,
			photoIds: [photoId]
		}
		addPhotoToAlbum(data)
		setIsChooseAlbumOpened(false)
	}

	return (
		<Modal transparent={true} animationType='fade'>
			<View style={styles.root}>
				<TouchableOpacity
					onPress={() => setIsChooseAlbumOpened(false)}
					style={styles.returnIcon}
				>
					<ReturnIcon width={30} height={30} />
				</TouchableOpacity>
				<View style={styles.top}>
					<Text style={styles.add}>Choose albums</Text>
					<Text style={styles.selected}>
						Selected albums: {selectedAlbums.length}
					</Text>
				</View>
				<View style={styles.list}>
					<FlatList
						data={allAlbums}
						keyExtractor={item => item.id.toString()}
						numColumns={2}
						showsVerticalScrollIndicator={false}
						renderItem={({ item }) => {
							const isSelected = selectedAlbums.includes(item.id)
							return (
								<Pressable
									style={styles.photoContainer}
									onPress={() => toggleSelection(item.id)}
								>
									<View style={getAlbumStyle(item.id)}>
										{item.imageUrl ? (
											<>
												<Image
													source={{ uri: item.imageUrl }}
													style={
														isSelected ? styles.selectedImage : styles.photo
													}
												/>
												<Text style={
													isSelected ? styles.isSelectedName : styles.albumName
												}>{item.name}</Text>
											</>
										) : (
											<>
											<NoImageIcon
												style={
													isSelected ? styles.isSelectedNoImage : styles.photo
												}
												width={isSelected ? 180 : 200}
												height={isSelected ? 180 : 190}
											/>
											<Text style={
													isSelected ? styles.isSelectedName : styles.albumName
												}>{item.name}</Text>
											</>
											
										)}

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
			{selectedAlbums.length > 0 && (
				<View style={styles.addRow}>
					<TouchableOpacity onPress={() => setSelectedAlbums([])}>
						<CloseSelectionIcon width={25} height={25} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => handleAddPhotoToAlbums()} style={styles.addImagesBtn}>
						<Text style={styles.addImagesBtnText}>Confirm</Text>
					</TouchableOpacity>
				</View>
			)}
		</Modal>
	)
}

export default ChooseAlbumToAddPhoto
