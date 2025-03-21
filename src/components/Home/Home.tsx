import React, { useState, useEffect } from 'react'
import { Animated, Modal, TextInput, FlatList, TouchableOpacity, View, Text, Image } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import * as Sharing from 'expo-sharing'
import CloseIcon from '../../../assets/images/home/close-icon.svg'
import SearchIcon from '../../../assets/images/home/search-icon.svg'
import FavouriteIcon from '../../../assets/images/photos/heart-icon.svg'
import ShareIcon from '../../../assets/images/photos/share-icon.svg'
import TrashIcon from '../../../assets/images/photos/trash-icon.svg'
import { useGetAllPhotos } from '../../hooks/photos/useGetAllPhotosMutation'
import { useDeletePhotoMutation } from '../../hooks/photos/useDeletePhotoMutation'
import { useAddFavouriteMutation } from '../../hooks/favourites/useAddFavouriteMutation'
import NavigationMenu from '../../ui/NavigationMenu/NavigationMenu'
import { styles } from './Home.styles'

const Home: React.FC = () => {
  const [searchValue, setSearchValue] = useState('')
  const [isPhotoPressed, setIsPhotoPressed] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)
  const { allPhotos } = useGetAllPhotos()
  const { deletePhoto } = useDeletePhotoMutation()
  const { addToFavourite } = useAddFavouriteMutation()

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

  const handleAddToFavourite = (photoId: number, photoUrl: string) => {
    addToFavourite({ photoId: photoId, url: photoUrl })
  }

  const handleShare = async (imageUrl: string) => {
    try {
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(imageUrl)
      } else {
        console.log('Sharing is not available on this device')
      }
    } catch (error) {
      console.error('Error sharing image:', error)
    }
  }

  const handleImageChange = (newIndex: number | undefined) => {
	if (newIndex !== undefined && newIndex !== selectedImageIndex) {
	  setTimeout(() => {
		setSelectedImageIndex(newIndex)
	  }, 100) 
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

      <Modal visible={isModalVisible} transparent={true} onRequestClose={closeImageModal}>
        <View style={styles.modalContainer}>
          <ImageViewer
            onLongPress={() => setIsPhotoPressed(true)}
            imageUrls={filteredPhotos?.map(photo => ({ url: photo.url })) || []}
            onSwipeDown={closeImageModal}
            index={selectedImageIndex}
			//@ts-ignore
            onChange={(index) => handleImageChange(index)} 
            onClick={() => setIsPhotoPressed(prev => !prev)}
            renderIndicator={() => <View />}
          />

          {isPhotoPressed && filteredPhotos && filteredPhotos[selectedImageIndex] && (
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
              <TouchableOpacity
                onPress={() =>
                  handleShare(filteredPhotos[selectedImageIndex].url)
                }
                style={styles.deleteButton}
              >
                <ShareIcon width={30} height={30} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  handleAddToFavourite(filteredPhotos[selectedImageIndex].id, filteredPhotos[selectedImageIndex].url)
                }
                style={styles.deleteButton}
              >
                <FavouriteIcon width={30} height={30} />
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
      </Modal>
    </View>
  )
}

export default Home
