import React from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import HeartIcon from '../../../assets/images/favourites/heart-icon.svg'
import { useGetAllFavouritesPhotoQuery } from '../../hooks/favourites/useGetAllFavouritesPhotoQuery'
import NavigationMenu from '../../ui/NavigationMenu/NavigationMenu'
import { styles } from './Favourites.styles'

const Favourites: React.FC = () => {
	const { favouritePhotos } = useGetAllFavouritesPhotoQuery()

	return (
		<View style={styles.root}>
			<View style={styles.wrapper}>
				{favouritePhotos?.length === 0 ? (
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
								<TouchableOpacity style={styles.photoContainer}>
									<View>
										<Image source={{ uri: item.url }} style={styles.photo} />
									</View>
								</TouchableOpacity>
							)}
						/>
					</View>
				)}
			</View>
			<NavigationMenu />
		</View>
	)
}

export default Favourites
