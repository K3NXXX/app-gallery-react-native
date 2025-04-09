import React, { useState, useEffect } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View, Animated } from 'react-native';
import HeartIcon from '../../../assets/images/favourites/heart-icon.svg';
import { useGetAllFavouritesPhotoQuery } from '../../hooks/favourites/useGetAllFavouritesPhotoQuery';
import NavigationMenu from '../../ui/NavigationMenu/NavigationMenu';
import PhotoViewerModal from '../../ui/PhotoViewerModal/PhotoViewerModal';
import { styles } from './Favourites.styles';
import Logo from '../../ui/Logo/Logo';

const Favourites: React.FC = () => {
	const { favouritePhotos = [] } = useGetAllFavouritesPhotoQuery();
	const [isPhotoViewerVisible, setPhotoViewerVisible] = useState(false);
	const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
	const fadeAnim = useState(new Animated.Value(0))[0]; 

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 700,
			useNativeDriver: true,
		}).start();
	}, [fadeAnim]);

	const openImageModal = (index: number) => {
		setSelectedImageIndex(index);
		setPhotoViewerVisible(true);
	};

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
				fromWhichPage="favourites"
				isVisible={isPhotoViewerVisible}
				photos={favouritePhotos}
				selectedImageIndex={selectedImageIndex}
				setSelectedImageIndex={setSelectedImageIndex}
				onClose={() => setPhotoViewerVisible(false)}
			/>

			<NavigationMenu />
		</View>
	);
};

export default Favourites;
