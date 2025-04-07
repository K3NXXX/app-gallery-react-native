import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import AddImageIcon from '../../../assets/images/albums/add-image.svg'
import DeleteIcon from '../../../assets/images/albums/delete-icon.svg'
import EditIcon from '../../../assets/images/albums/edit-icon.svg'
import ReturnIcon from '../../../assets/images/albums/return-icon.svg'
import { IAlbum } from '../../@types/albums/albums.types'
import { SCREENS } from '../../constants/screens.constants'
import { useGetAlbumPhotosMutation } from '../../hooks/albums/useGetAlbumPhotosMutation'
import ConfirmDeleteAlbum from '../../ui/ConfirmDeleteAlbum/ConfirmDeleteAlbum'
import MultiSelection from '../../ui/MultiSelection/MultiSelection'
import AlbumEditForm from '../Albums/EditAlbumForm/EditAlbumForm'
import { styles } from './FullAlbum.styles'

type FullAlbumRouteProp = RouteProp<{ Album: { album: IAlbum } }, 'Album'>

const FullAlbum: React.FC = () => {
	const route = useRoute<FullAlbumRouteProp>()
	const { album } = route.params
	const navigation = useNavigation()

	const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false)
	const [isMultiSelectionOpened, setIsMultiSelectionOpened] = useState(false)
	const [isEditFormOpen, setIsEditFormOpen] = useState(false)

	const { getAlbumPhotos, albumPhotos } = useGetAlbumPhotosMutation()

	useEffect(() => {
		getAlbumPhotos({albumId: album.id})
	}, [getAlbumPhotos])
	return (
		<View style={styles.root}>
			<View style={styles.top}>
				<View style={styles.topLeft}>
					<Text style={styles.albumName}>{album.name}</Text>
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
			<View>
				{getAlbumPhotos.length === 0 ? (
					<View></View>
				) : (
					<FlatList
					style={styles.list}
						data={albumPhotos}
						keyExtractor={item => item.id.toString()}
						numColumns={3}
						showsVerticalScrollIndicator={false}
						renderItem={({ item, index }) => (
							<TouchableOpacity
								style={styles.photoContainer}
								// onPress={() => openImageModal(index)}
							>
								<View>
									<Image source={{ uri: item.url }} style={styles.photo} />
								</View>
							</TouchableOpacity>
						)}
					/>
				)}
			</View>
			{album.description && (
				<View style={styles.descriptionWrapper}>
					<Text style={styles.description}>Description</Text>
					<Text style={styles.descriptionText}>{album.description}</Text>
				</View>
			)}

			{isConfirmDeleteOpen && (
				<ConfirmDeleteAlbum
					albumId={album.id}
					setIsConfirmDeleteOpen={setIsConfirmDeleteOpen}
				/>
			)}

			{isEditFormOpen && (
				<AlbumEditForm
					albumId={album.id}
					setIsEditFormOpen={setIsEditFormOpen}
				/>
			)}

			{isMultiSelectionOpened && (
				<MultiSelection
					albumId={album.id}
					setIsMultiSelectionOpened={setIsMultiSelectionOpened}
				/>
			)}
		</View>
	)
}

export default FullAlbum
