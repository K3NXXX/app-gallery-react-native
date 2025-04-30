import React, { useEffect, useState } from 'react'
import {
	Animated,
	FlatList,
	Image,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import Logo from '../../ui/Logo/Logo'
import NavigationMenu from '../../ui/NavigationMenu/NavigationMenu'
import PhotoViewerModal from '../../ui/PhotoViewerModal/PhotoViewerModal'
import { useGetAllFavouritesPhotoQuery } from '../../hooks/favourites/useGetAllFavouritesPhotoQuery'
import HeartIcon from '../../../assets/images/favourites/heart-icon.svg'
import { styles } from './Favourites.styles'

const Favourites: React.FC = () => {
	const [isPhotoViewerVisible, setPhotoViewerVisible] = useState(false)
	const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)
	const { favouritePhotos = [] } = useGetAllFavouritesPhotoQuery()
	const fadeAnim = useState(new Animated.Value(0))[0]

	const openImageModal = (index: number) => {
		setSelectedImageIndex(index)
		setPhotoViewerVisible(true)
	}

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 700,
			useNativeDriver: true,
		}).start()
	}, [fadeAnim])



	return (
		<View style={styles.root}>
			<View style={styles.wrapper}>
				<Logo />
				{favouritePhotos.length === 0 ? (
					<View style={styles.noPhotoContainer}>
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
									<Animated.View style={{ opacity: fadeAnim }}>
										<Image source={{ uri: item.url }} style={styles.photo} />
									</Animated.View>
								</TouchableOpacity>
							)}
						/>
					</View>
				)}
			</View>

			<PhotoViewerModal
				fromWhichPage='favourites'
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
