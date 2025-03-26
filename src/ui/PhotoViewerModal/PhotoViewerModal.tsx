import * as Sharing from 'expo-sharing'
import React, { useEffect, useState } from 'react'
import { Animated, Modal, TouchableOpacity, View } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import FavouriteIcon from '../../../assets/images/photos/heart-icon.svg'
import ShareIcon from '../../../assets/images/photos/share-icon.svg'
import TrashIcon from '../../../assets/images/photos/trash-icon.svg'
import { IPhoto } from '../../@types/photos/photos.type'
import { useDeletePhotoMutation } from '../../hooks/photos/useDeletePhotoMutation'
import ConfirmDeletePhoto from '../ConfirmDeletePhoto/ConfirmDeletePhoto'
import { styles } from './PhotoViewerModal.styles'
import { useAddFavouriteMutation } from '../../hooks/favourites/useAddFavouriteMutation'

interface PhotoViewerModalProps {
	isVisible: boolean
	photos: IPhoto[] | undefined
	selectedImageIndex?: number
	setSelectedImageIndex: (selectedImageIndex: number) => void
	onClose: () => void

	
}

const PhotoViewerModal: React.FC<PhotoViewerModalProps> = ({
	isVisible,
	photos,
	selectedImageIndex = 0,
	setSelectedImageIndex,
	onClose,


}) => {
	const [isPhotoPressed, setIsPhotoPressed] = useState(false)
	const [animationValue] = useState(new Animated.Value(-100))
	const [isConfirmPhotoDelete, setIsConfirmPhotoDelete] = useState(false)

	const handleImageChange = (newIndex: number | undefined) => {
		if (newIndex !== undefined && newIndex !== selectedImageIndex) {
			setTimeout(() => {
				setSelectedImageIndex(newIndex)
			}, 100)
		}
	}
	const { addToFavourite } = useAddFavouriteMutation()


	const handleAddToFavourite = (photoId: number, photoUrl: string) => {
		addToFavourite({ photoId: photoId, url: photoUrl })
	}



	useEffect(() => {
		if (isPhotoPressed) {
			Animated.timing(animationValue, {
				toValue: 0,
				duration: 200,
				useNativeDriver: true,
			}).start()
		} else {
			Animated.timing(animationValue, {
				toValue: -100,
				duration: 300,
				useNativeDriver: true,
			}).start()
		}
	}, [isPhotoPressed])

	const handleShare = async (imageUrl: string) => {
		if (await Sharing.isAvailableAsync()) {
			await Sharing.shareAsync(imageUrl)
		} else {
			console.log('Sharing is not available on this device')
		}
	}
	const { deletePhoto } = useDeletePhotoMutation()

	const handleDeletePhoto = (photoId: number) => {
		deletePhoto({ photoId: photoId })
		setIsConfirmPhotoDelete(false)
	}

	return (
		<>
			<Modal visible={isVisible} transparent onRequestClose={onClose}>
				<View style={styles.modalContainer}>
					<ImageViewer
						onLongPress={() => setIsPhotoPressed(true)}
						imageUrls={photos?.map(photo => ({ url: photo.url }))}
						onSwipeDown={onClose}
						index={selectedImageIndex}
						onChange={handleImageChange}
						onClick={() => setIsPhotoPressed(prev => !prev)}
						renderIndicator={() => <View />}
					/>

					{isPhotoPressed && photos && photos[selectedImageIndex] && (
						<Animated.View
							style={[
								styles.editRow,
								{ transform: [{ translateY: animationValue }] },
							]}
						>
							<TouchableOpacity
								onPress={() => setIsConfirmPhotoDelete(true)}
								style={styles.deleteButton}
							>
								<TrashIcon width={30} height={30} />
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => handleShare(photos[selectedImageIndex].url)}
								style={styles.deleteButton}
							>
								<ShareIcon width={30} height={30} />
							</TouchableOpacity>
							
								<TouchableOpacity
									onPress={() =>
										handleAddToFavourite(
											photos[selectedImageIndex].id,
											photos[selectedImageIndex].url
										)
									}
									style={styles.deleteButton}
								>
									<FavouriteIcon width={30} height={30} />
								</TouchableOpacity>
							
						</Animated.View>
					)}
				</View>
			</Modal>

			{isConfirmPhotoDelete && photos && (
				<ConfirmDeletePhoto
					setIsConfirmPhotoDelete={setIsConfirmPhotoDelete}
					handleDeletePhoto={handleDeletePhoto}
					photoId={photos[selectedImageIndex].id}
				/>
			)}
		</>
	)
}

export default PhotoViewerModal
