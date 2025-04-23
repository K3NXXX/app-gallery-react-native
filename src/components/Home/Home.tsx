import React, { useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'

import NoPhotosIcon from '../../../assets/images/home/no-photos-icon.svg'
import { IPhoto } from '../../@types/photos/photos.type'
import Logo from '../../ui/Logo/Logo'
import NavigationMenu from '../../ui/NavigationMenu/NavigationMenu'
import PhotoViewerModal from '../../ui/PhotoViewerModal/PhotoViewerModal'
import SortPanel from '../../ui/SortPanel/SortPanel'
import { styles } from './Home.styles'

const Home: React.FC = () => {
	const [filteredPhotos, setFilteredPhotos] = useState<IPhoto[] | undefined>(
		undefined
	)
	const [isLoading, setIsLoading] = useState(false)

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
					<Logo />
					<View style={{ flex: 1 }}></View>
					<Text style={styles.title}>Home</Text>
					<SortPanel
						setIsLoading={setIsLoading}
						onFilter={setFilteredPhotos}
						fromWhichPage='home'
					/>

					{filteredPhotos?.length === 0 ? (
						<View style={styles.noPhotosWrapper}>
							<NoPhotosIcon width={50} height={50} />
							<Text style={styles.noPhotosText1}>There is no photos yet</Text>
							<Text style={styles.noPhotosText2}>Add some</Text>
						</View>
					) : (
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
					)}
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
