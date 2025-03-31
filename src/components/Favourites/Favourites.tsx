import React, { useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import HeartIcon from '../../../assets/images/favourites/heart-icon.svg'
import { useGetAllFavouritesPhotoQuery } from '../../hooks/favourites/useGetAllFavouritesPhotoQuery'
import NavigationMenu from '../../ui/NavigationMenu/NavigationMenu'
import PhotoViewerModal from '../../ui/PhotoViewerModal/PhotoViewerModal'
import { styles } from './Favourites.styles'

const Favourites: React.FC = () => {
	const { favouritePhotos, error } = useGetAllFavouritesPhotoQuery()
	const [isPhotoViewerVisible, setPhotoViewerVisible] = useState(false)
	const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)

	const openImageModal = (index: number) => {
		setSelectedImageIndex(index)
		setPhotoViewerVisible(true)
	}

	


	return (
		<View style={styles.root}>
			<View style={styles.wrapper}>
				{error ? (
					<View style={styles.noPhotoContainer}>
						<Text style={styles.title}>Favourites</Text>
						<Text style={styles.noPhoto}>There is no favourites photo</Text>
						<Text style={styles.noPhoto2}>You can add it from gallery</Text>
						<HeartIcon width={50} height={50} />
					</View>
				) : (
					<View>
						<Text style={styles.title}>Favourites</Text>
						<FlatList
							data={favouritePhotos}
							keyExtractor={item => item.id.toString()}
							numColumns={3}
							showsVerticalScrollIndicator={false}
							renderItem={({ item, index }) => (
								<TouchableOpacity
									style={styles.photoContainer}
									onPress={() => openImageModal(index)}
								>
									<View>
										<Image source={{ uri: item.url }} style={styles.photo} />
									</View>
								</TouchableOpacity>
							)}
						/>
					</View>
				)}
			</View>

			<PhotoViewerModal
			fromWhichPage="favourites"
				isVisible={isPhotoViewerVisible}
				photos={favouritePhotos}
				selectedImageIndex={selectedImageIndex}
				setSelectedImageIndex={setSelectedImageIndex}
				onClose={() => setPhotoViewerVisible(false)}
			/>

			<NavigationMenu />
		</View>
	)
}

export default Favourites
