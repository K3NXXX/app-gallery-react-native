import React, { useEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import Loading from '../../ui/Loading/Loading'
import ConfirmDeleteAlbum from '../../ui/ConfirmDeleteAlbum/ConfirmDeleteAlbum'
import MultiSelection from '../../ui/MultiSelection/MultiSelection'
import PhotoViewerModal from '../../ui/PhotoViewerModal/PhotoViewerModal'
import { useImageStore } from '../../zustand/useStore'
import { useGetOneAlbumMutation } from '../../hooks/albums/useGetOneAlbumMutation'
import { SCREENS } from '../../constants/screens.constants'
import AlbumEditForm from '../Albums/EditAlbumForm/EditAlbumForm'
import AddImageIcon from '../../../assets/images/albums/add-image.svg'
import DeleteIcon from '../../../assets/images/albums/delete-icon.svg'
import EditIcon from '../../../assets/images/albums/edit-icon.svg'
import NoAlbumIcon from '../../../assets/images/albums/no-album-icon.svg'
import ReturnIcon from '../../../assets/images/albums/return-icon.svg'
import { styles } from './FullAlbum.styles'

type FullAlbumRouteProp = RouteProp<{ Album: { albumId: number } }, 'Album'>

const FullAlbum: React.FC = () => {
	const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false)
	const [isMultiSelectionOpened, setIsMultiSelectionOpened] = useState(false)
	const [isPhotoViewerVisible, setPhotoViewerVisible] = useState(false)
	const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)
	const [isEditFormOpen, setIsEditFormOpen] = useState(false)

	const route = useRoute<FullAlbumRouteProp>()
	const { albumId } = route.params
	const { data } = useGetOneAlbumMutation()
	const navigation = useNavigation()
	const albumData = data?.album
	const { setAlbumId } = useImageStore()

	const openImageModal = (image: any, index: number) => {
		setSelectedImageIndex(index)
		setPhotoViewerVisible(true)
	}

	useEffect(() => {
		setAlbumId(albumId)
	}, [albumId])

	if (!albumData) {
		return <Loading />
	}

	return (
		<View style={styles.root}>
			<View style={styles.top}>
				<View style={styles.topLeft}>
					<View style={styles.topLeftWrapper}>
						<Text style={styles.albumName}>{albumData.name}</Text>
						<View style={styles.albumBadge}>
							<Text style={styles.albumBadgeText}>
								{albumData.photos.length} 📸
							</Text>
						</View>
					</View>
				</View>

				<View style={styles.topRight}>
					<TouchableOpacity
						onPress={() => setIsMultiSelectionOpened(true)}
						style={styles.editButton}
					>
						<AddImageIcon width={30} height={30} />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setIsEditFormOpen(true)}
						style={styles.editButton}
					>
						<EditIcon width={30} height={30} />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setIsConfirmDeleteOpen(true)}
						style={styles.editButton}
					>
						<DeleteIcon width={30} height={30} />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							//@ts-ignore
							navigation.navigate(SCREENS.ALBUMS)
						}}
						style={styles.returnButton}
					>
						<ReturnIcon width={30} height={30} />
					</TouchableOpacity>
				</View>
			</View>
			{albumData?.description && (
				<View style={styles.descriptionWrapper}>
					<Text style={styles.description}>Description</Text>
					<Text style={styles.descriptionText}>{albumData.description}</Text>
				</View>
			)}

			<View style={styles.content}>
				{albumData.photos.length === 0 ? (
					<View style={styles.createAlbum}>
						<Text style={styles.text1}>There is no photos in album</Text>
						<Text style={styles.text2}>Add some</Text>
						<TouchableOpacity onPress={() => setIsMultiSelectionOpened(true)}>
							<NoAlbumIcon width={50} height={50} />
						</TouchableOpacity>
					</View>
				) : (
					<FlatList
						data={albumData.photos}
						keyExtractor={item => item.id.toString()}
						numColumns={3}
						showsVerticalScrollIndicator={false}
						renderItem={({ item, index }) => (
							<TouchableOpacity
								style={styles.photoContainer}
								onPress={() => openImageModal(item, index)}
							>
								<View>
									<Image source={{ uri: item.url }} style={styles.photo} />
								</View>
							</TouchableOpacity>
						)}
					/>
				)}
			</View>
			<PhotoViewerModal
				fromWhichPage='fullAlbum'
				isVisible={isPhotoViewerVisible}
				photos={albumData.photos}
				selectedImageIndex={selectedImageIndex}
				setSelectedImageIndex={setSelectedImageIndex}
				onClose={() => setPhotoViewerVisible(false)}
			/>

			{isConfirmDeleteOpen && albumData && (
				<ConfirmDeleteAlbum
					albumId={albumData.id}
					setIsConfirmDeleteOpen={setIsConfirmDeleteOpen}
				/>
			)}

			{isEditFormOpen && albumData && (
				<AlbumEditForm
					albumId={albumData.id}
					setIsEditFormOpen={setIsEditFormOpen}
				/>
			)}

			{isMultiSelectionOpened && albumData && (
				<MultiSelection
					albumId={albumData.id}
					setIsEditFormOpen={setIsEditFormOpen}
					setIsMultiSelectionOpened={setIsMultiSelectionOpened}
				/>
			)}
		</View>
	)
}

export default FullAlbum
