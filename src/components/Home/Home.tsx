import React, { useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'

import { useGetAllPhotos } from '../../hooks/photos/useGetAllPhotosMutation'
import NavigationMenu from '../../ui/NavigationMenu/NavigationMenu'
import PhotosSortPanel from '../../ui/PhotosSortPanel/PhotosSortPanel'
import PhotoViewerModal from '../../ui/PhotoViewerModal/PhotoViewerModal'
import { styles } from './Home.styles'
import { IPhoto } from '../../@types/photos/photos.type'

const Home: React.FC = () => {
	const [filteredPhotos, setFilteredPhotos] = useState<IPhoto[] | undefined>(undefined);

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
					<Text style={styles.title}>Home</Text>
					<PhotosSortPanel onFilter={setFilteredPhotos} />

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
