import React, { useState } from 'react'
import { FlatList, Image, Text, TextInput, View, TouchableOpacity, Modal } from 'react-native'
import CloseIcon from '../../../assets/images/home/close-icon.svg'
import SearchIcon from '../../../assets/images/home/search-icon.svg'
import { useGetAllPhotos } from '../../hooks/photos/useGetAllPhotosMutation'
import NavigationMenu from '../../ui/NavigationMenu/NavigationMenu'
import { styles } from './Home.styles'
import ImageViewer from 'react-native-image-zoom-viewer'

const Home: React.FC = () => {
	const [searchValue, setSearchValue] = useState('')
	const [isModalVisible, setModalVisible] = useState(false)
	const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)
	const { allPhotos } = useGetAllPhotos()

	const filteredPhotos = allPhotos?.filter(photo =>
		photo.name.toLowerCase().includes(searchValue.toLowerCase())
	)

	const openImageModal = (image: any, index: number) => {
		setSelectedImageIndex(index)
		setModalVisible(true)
	}

	const closeImageModal = () => {
		setModalVisible(false)
	}

	return (
		<View style={styles.root}>
			<View style={styles.wrapper}>
				<Text style={styles.title}>Home</Text>
				<View style={styles.search}>
					<TextInput
						value={searchValue}
						onChange={e => setSearchValue(e.nativeEvent.text)}
						placeholderTextColor='#61646B'
						style={styles.input}
						placeholder='Search here'
					/>
					<SearchIcon width={30} height={30} style={styles.searchIcon} />
					{searchValue.length > 0 && (
						<CloseIcon
							onPress={() => setSearchValue('')}
							width={27}
							height={27}
							style={styles.closeIcon}
						/>
					)}
				</View>

				<FlatList
					data={filteredPhotos}
					keyExtractor={item => item.id.toString()}
					numColumns={3}
					showsVerticalScrollIndicator={false}
					renderItem={({ item, index }) => (
						<TouchableOpacity  style={styles.photoContainer} onPress={() => openImageModal(item, index)}>
							<View>
								<Image source={{ uri: item.url }} style={styles.photo} />
							</View>
						</TouchableOpacity>
					)}
				/>
			</View>

			<NavigationMenu />

			<Modal visible={isModalVisible} transparent={true} onRequestClose={closeImageModal}>
				<ImageViewer
					imageUrls={filteredPhotos?.map(photo => ({ url: photo.url }))}
					onSwipeDown={closeImageModal}
					index={selectedImageIndex}
					onClick={closeImageModal}
					renderIndicator={() => <View/>}
				/>
			</Modal>
		</View>
	)
}

export default Home
