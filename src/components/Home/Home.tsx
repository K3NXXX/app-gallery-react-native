import React, { useEffect, useState } from 'react'
import {
	Animated,
	FlatList,
	Image,
	Modal,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import CloseIcon from '../../../assets/images/home/close-icon.svg'
import SearchIcon from '../../../assets/images/home/search-icon.svg'
import TrashIcon from '../../../assets/images/photos/trash-icon.svg'
import { useDeletePhotoMutation } from '../../hooks/photos/useDeletePhotoMutation'
import { useGetAllPhotos } from '../../hooks/photos/useGetAllPhotosMutation'
import NavigationMenu from '../../ui/NavigationMenu/NavigationMenu'
import { styles } from './Home.styles'

const Home: React.FC = () => {
	const [searchValue, setSearchValue] = useState('')
	const [isPhotoPressed, setIsPhotoPressed] = useState(false)
	const [isModalVisible, setModalVisible] = useState(false)
	const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)
	const { allPhotos } = useGetAllPhotos()
	const { deletePhoto } = useDeletePhotoMutation()

	const [animationValue] = useState(new Animated.Value(-100))

	const filteredPhotos = allPhotos?.filter(photo =>
		photo.name.toLowerCase().includes(searchValue.toLowerCase())
	)

	const openImageModal = (image: any, index: number) => {
		setSelectedImageIndex(index)
		setModalVisible(true)
	}

	const closeImageModal = () => {
		setModalVisible(false)
		setIsPhotoPressed(false)
	}

	const handleDeletePhoto = (photoId: number) => {
		deletePhoto({ photoId: photoId })
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

			<Modal
				visible={isModalVisible}
				transparent={true}
				onRequestClose={closeImageModal}
			>
				<View style={styles.modalContainer}>
					<ImageViewer
						onLongPress={() => setIsPhotoPressed(true)}
						imageUrls={filteredPhotos?.map(photo => ({ url: photo.url }))}
						onSwipeDown={closeImageModal}
						index={selectedImageIndex}
						onClick={() => setIsPhotoPressed(prev => !prev)}
						renderIndicator={() => <View />}
					/>

					{isPhotoPressed &&
						filteredPhotos &&
						filteredPhotos[selectedImageIndex] && (
							<Animated.View
								style={[
									styles.editRow,
									{ transform: [{ translateY: animationValue }] },
								]}
							>
								<TouchableOpacity
									onPress={() =>
										handleDeletePhoto(filteredPhotos[selectedImageIndex].id)
									}
									style={styles.deleteButton}
								>
									<TrashIcon width={30} height={30} />
								</TouchableOpacity>
							</Animated.View>
						)}
				</View>
			</Modal>
		</View>
	)
}

export default Home
