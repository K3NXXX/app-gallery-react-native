import React, { useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'

import { IPhoto } from '../../@types/photos/photos.type'
import NavigationMenu from '../../ui/NavigationMenu/NavigationMenu'
import PhotoViewerModal from '../../ui/PhotoViewerModal/PhotoViewerModal'
import SortPanel from '../../ui/SortPanel/SortPanel'
import { styles } from './Home.styles'
import Logo from '../../ui/Logo/Logo'

const Home: React.FC = () => {
	const [filteredPhotos, setFilteredPhotos] = useState<IPhoto[] | undefined>(
		undefined
	)

	const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)
	const [isPhotoViewerVisible, setPhotoViewerVisible] = useState(false)

	const openImageModal = (image: any, index: number) => {
		setSelectedImageIndex(index)
		setPhotoViewerVisible(true)
	}

	return (
		<>
			<View style={styles.root}>
				<View style={styles.wrapper}>
				<Logo/>
					<Text style={styles.title}>Home</Text>
					<SortPanel onFilter={setFilteredPhotos} fromWhichPage='home' />

					<FlatList
						data={filteredPhotos}
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
				</View>

				<NavigationMenu />

				<PhotoViewerModal
					fromWhichPage='home'
					isVisible={isPhotoViewerVisible}
					photos={filteredPhotos}
					selectedImageIndex={selectedImageIndex}
					setSelectedImageIndex={setSelectedImageIndex}
					onClose={() => setPhotoViewerVisible(false)}
				/>
			</View>
		</>
	)
}

export default Home
