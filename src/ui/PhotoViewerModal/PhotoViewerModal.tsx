import React, { useState, useEffect } from 'react'
import { Animated, Modal, TouchableOpacity, View } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import FavouriteIcon from '../../../assets/images/photos/heart-icon.svg'
import ShareIcon from '../../../assets/images/photos/share-icon.svg'
import TrashIcon from '../../../assets/images/photos/trash-icon.svg'
import * as Sharing from 'expo-sharing'
import { styles } from './PhotoViewerModal.styles'

interface PhotoViewerModalProps {
  isVisible: boolean
  photos: { id: number; url: string }[]
  initialIndex: number
  onClose: () => void
  onDelete: (photoId: number) => void
  onAddToFavourite: (photoId: number, photoUrl: string) => void
}

const PhotoViewerModal: React.FC<PhotoViewerModalProps> = ({
  isVisible,
  photos,
  initialIndex,
  onClose,
  onDelete,
  onAddToFavourite,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(initialIndex)
  const [isPhotoPressed, setIsPhotoPressed] = useState(false)
  const [animationValue] = useState(new Animated.Value(-100))

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

  const handleShare = async (imageUrl: string) => {
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(imageUrl)
    } else {
      console.log('Sharing is not available on this device')
    }
  }

  return (
    <Modal visible={isVisible} transparent onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <ImageViewer
          onLongPress={() => setIsPhotoPressed(true)}
          imageUrls={photos.map(photo => ({ url: photo.url }))}
          onSwipeDown={onClose}
          index={selectedImageIndex}
          //@ts-ignore
          onChange={(index) => index !== undefined && setSelectedImageIndex(index)}
          onClick={() => setIsPhotoPressed(prev => !prev)}
          renderIndicator={() => <View />}
        />

        {isPhotoPressed && photos[selectedImageIndex] && (
          <Animated.View style={[styles.editRow, { transform: [{ translateY: animationValue }] }]}>
            <TouchableOpacity onPress={() => onDelete(photos[selectedImageIndex].id)} style={styles.deleteButton}>
              <TrashIcon width={30} height={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleShare(photos[selectedImageIndex].url)} style={styles.deleteButton}>
              <ShareIcon width={30} height={30} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onAddToFavourite(photos[selectedImageIndex].id, photos[selectedImageIndex].url)}
              style={styles.deleteButton}
            >
              <FavouriteIcon width={30} height={30} />
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </Modal>
  )
}

export default PhotoViewerModal
