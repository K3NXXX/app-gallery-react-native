import * as Sharing from 'expo-sharing'
import React, { useEffect, useState } from 'react'
import { Animated, Modal, TouchableOpacity, View } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import ActiveFavouritePhoto from '../../../assets/images/photos/active-favourite-icon.svg'
import AddToAlbumIcon from '../../../assets/images/photos/add-to-album-icon.svg'
import EditIcon from '../../../assets/images/photos/edit-icon.svg'
import HashtagIcon from '../../../assets/images/photos/hashtag-icon.svg'
import FavouriteIcon from '../../../assets/images/photos/heart-icon.svg'
import RenamingIcon from '../../../assets/images/photos/renaming-icon.svg'
import ShareIcon from '../../../assets/images/photos/share-icon.svg'
import TrashIcon from '../../../assets/images/photos/trash-icon.svg'
import { IPhoto } from '../../@types/photos/photos.type'
import { useDeletePhotoFromAlbumMutation } from '../../hooks/albums/useDeletePhotoFromAlbumMutation'
import { useAddFavouriteMutation } from '../../hooks/favourites/useAddFavouriteMutation'
import { useGetAllFavouritesPhotoQuery } from '../../hooks/favourites/useGetAllFavouritesPhotoQuery'
import { useRemoveFromFavourites } from '../../hooks/favourites/useRemoveFromFavouritesMutation'
import { useDeletePhotoMutation } from '../../hooks/photos/useDeletePhotoMutation'
import { useImageStore } from '../../zustand/useStore'
import AddHashTagsForm from '../AddHashTagsForm/AddHashTagsForm'
import ChooseAlbumToAddPhoto from '../ChooseAlbumToAddPhoto/ChooseAlbumToAddPhoto'
import ConfirmDeletePhoto from '../ConfirmDeletePhoto/ConfirmDeletePhoto'
import FiltersPanel from '../FiltersPanel/FiltersPanel'
import RenamingPhoto from '../RenamingPhoto/RenamingPhoto'
import { styles } from './PhotoViewerModal.styles'

interface PhotoViewerModalProps {
	isVisible: boolean
	photos: IPhoto[] | undefined
	selectedImageIndex?: number
	setSelectedImageIndex: (selectedImageIndex: number) => void
	onClose: () => void
	fromWhichPage: string
}

const PhotoViewerModal: React.FC<PhotoViewerModalProps> = ({
	isVisible,
	photos,
	selectedImageIndex = 0,
	setSelectedImageIndex,
	onClose,
	fromWhichPage,
}) => {
	const [isPhotoPressed, setIsPhotoPressed] = useState(false)
	const [animationValue] = useState(new Animated.Value(-100))
	const [isConfirmPhotoDelete, setIsConfirmPhotoDelete] = useState(false)
	const [isRenamingPhotoOpened, setIsRenamingPhotoOpened] = useState(false)
	const [isAddingHashtagFormOpened, setIsAddingHashtagFormOpened] =
		useState(false)
	const [isFiltersOpened, setIsFiltersOpened] = useState(false)
	const [isChooseAlbumOpened, setIsChooseAlbumOpened] = useState(false)
	const albumId = useImageStore(state => state.albumId)

	const { addToFavourite } = useAddFavouriteMutation()
	const { favouritePhotos } = useGetAllFavouritesPhotoQuery()
	const { removeFromFavourites } = useRemoveFromFavourites()
	const { deletePhoto } = useDeletePhotoMutation()
	const { deletePhotoFromAlbum } = useDeletePhotoFromAlbumMutation(albumId)

	const isPhotoInFavourites =
		photos &&
		favouritePhotos?.some(photo => photo.id === photos[selectedImageIndex]?.id)

	const handleImageChange = (newIndex: number | undefined) => {
		if (newIndex !== undefined && newIndex !== selectedImageIndex) {
			setTimeout(() => {
				setSelectedImageIndex(newIndex)
			}, 200)
		}
	}

	const handleAddToFavourite = (photoId: number, photoUrl: string) => {
		addToFavourite({ photoId: photoId })
	}

	const handleShare = async (imageUrl: string) => {
		if (await Sharing.isAvailableAsync()) {
			await Sharing.shareAsync(imageUrl)
		} else {
			console.log('Sharing is not available on this device')
		}
	}
	const handleDeletePhoto = (photoId: number) => {
		if (fromWhichPage === 'fullAlbum' && albumId !== null) {
			const data = {
				albumId: albumId,
				photoId: photoId,
			}
			deletePhotoFromAlbum(data)
		} else {
			deletePhoto({ photoId })
		}

		if (photos && photos.length === 1) {
			onClose()
		} else {
			const newIndex = selectedImageIndex > 0 ? selectedImageIndex - 1 : 0
			setSelectedImageIndex(newIndex)
		}

		setIsConfirmPhotoDelete(false)
	}

	const handleRemoveFromFavourites = (photoId: number) => {
		removeFromFavourites({ photoId })

		if (photos) {
			const nextIndex =
				selectedImageIndex < photos.length - 1
					? selectedImageIndex + 1
					: selectedImageIndex - 1
			setSelectedImageIndex(nextIndex)
		}
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
						<>
							<Animated.View
								style={[
									styles.editRow,
									{ transform: [{ translateY: animationValue }] },
								]}
							>
								<View style={styles.editRowLeft}>
									<TouchableOpacity
										onPress={() => handleShare(photos[selectedImageIndex].url)}
										style={styles.photoIcons}
									>
										<ShareIcon width={30} height={30} />
									</TouchableOpacity>

									{isPhotoInFavourites ? (
										<TouchableOpacity
											onPress={() =>
												handleRemoveFromFavourites(
													photos[selectedImageIndex].id
												)
											}
											style={styles.photoIcons}
										>
											<ActiveFavouritePhoto width={33} height={33} />
										</TouchableOpacity>
									) : (
										<TouchableOpacity
											onPress={() =>
												handleAddToFavourite(
													photos[selectedImageIndex].id,
													photos[selectedImageIndex].url
												)
											}
											style={styles.photoIcons}
										>
											<FavouriteIcon width={33} height={33} />
										</TouchableOpacity>
									)}

									<TouchableOpacity
										onPress={() => setIsRenamingPhotoOpened(true)}
										style={styles.photoIcons}
									>
										<RenamingIcon width={28} height={28} />
									</TouchableOpacity>

									<TouchableOpacity
										onPress={() => setIsChooseAlbumOpened(true)}
										style={styles.photoIcons}
									>
										<AddToAlbumIcon width={30} height={30} />
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() => setIsAddingHashtagFormOpened(true)}
										style={styles.photoIcons}
									>
										<HashtagIcon width={30} height={30} />
									</TouchableOpacity>
								</View>
								<View>
									<TouchableOpacity
										onPress={() => setIsConfirmPhotoDelete(true)}
										style={styles.photoIcons}
									>
										<TrashIcon width={30} height={30} />
									</TouchableOpacity>
								</View>
							</Animated.View>
							<TouchableOpacity
								onPress={() => setIsFiltersOpened(true)}
								style={styles.editButtonWrapper}
							>
								<EditIcon style={styles.editButton} width={30} height={30} />
							</TouchableOpacity>
						</>
					)}
				</View>
			</Modal>

			{isConfirmPhotoDelete && photos && (
				<ConfirmDeletePhoto
					fromWhichPage={fromWhichPage}
					setIsConfirmPhotoDelete={setIsConfirmPhotoDelete}
					handleDeletePhoto={handleDeletePhoto}
					photoId={photos[selectedImageIndex].id}
				/>
			)}
			{isRenamingPhotoOpened && photos && (
				<RenamingPhoto
					setIsRenamingPhotoOpened={setIsRenamingPhotoOpened}
					currentPhotoName={photos[selectedImageIndex].name}
					photoId={photos[selectedImageIndex].id}
				/>
			)}

			{isFiltersOpened && photos && (
				<FiltersPanel
					isFiltersOpened={isFiltersOpened}
					setIsFiltersOpened={setIsFiltersOpened}
					currentPhotoUrl={{ uri: photos[selectedImageIndex].url }}
				/>
			)}
			{isChooseAlbumOpened && photos && (
				<ChooseAlbumToAddPhoto
					photoId={photos[selectedImageIndex].id}
					setIsChooseAlbumOpened={setIsChooseAlbumOpened}
				/>
			)}
			{isAddingHashtagFormOpened && photos && (
				<AddHashTagsForm
					photoId={photos[selectedImageIndex].id}
					setIsAddingHashtagFormOpened={setIsAddingHashtagFormOpened}
					existingPhotoHashtags = {photos[selectedImageIndex].hashtags}
				/>
			)}
		</>
	)
}

export default PhotoViewerModal
