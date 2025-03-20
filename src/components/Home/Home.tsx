import React, { useState } from 'react'
import { FlatList, Image, Text, TextInput, View } from 'react-native'
import CloseIcon from '../../../assets/images/home/close-icon.svg'
import SearchIcon from '../../../assets/images/home/search-icon.svg'
import { useGetAllPhotos } from '../../hooks/photos/useGetAllPhotosMutation'
import NavigationMenu from '../../ui/NavigationMenu/NavigationMenu'
import { styles } from './Home.styles'
import { useGetMe } from '../../hooks/auth/useGetMe'

const Home: React.FC = () => {
	const [searchValue, setSearchValue] = useState('')
	const { allPhotos } = useGetAllPhotos()


	const filteredPhotos = allPhotos?.filter(photo =>
		photo.url.toLowerCase().includes(searchValue.toLowerCase())
	)

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
					renderItem={({ item }) => (
						<View style={styles.photoContainer}>
							<Image source={{ uri: item.url }} style={styles.photo} />
						</View>
					)}
				/>
			</View>

			<NavigationMenu />
		</View>
	)
}

export default Home
