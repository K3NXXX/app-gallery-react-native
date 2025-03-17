import React, { useState } from 'react'
import { Image, Text, TextInput, View } from 'react-native'
import CloseIcon from '../../../assets/images/home/close-icon.svg'
import SearchIcon from '../../../assets/images/home/search-icon.svg'
import NavigationMenu from '../../ui/NavigationMenu/NavigationMenu'
import { useImageStore } from '../../zustand/useStore'
import { styles } from './Home.styles'

const Home: React.FC = () => {
	const [searchValue, setSearchValue] = useState('')
	const image = useImageStore(state => state.image)
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
				{image && (
					<View style={styles.imageContainer}>
						<Image source={{ uri: image }} style={styles.imagePreview} />
					</View>
				)}
			</View>
			<NavigationMenu />
		</View>
	)
}

export default Home
