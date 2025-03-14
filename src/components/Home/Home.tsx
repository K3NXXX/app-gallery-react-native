import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import CloseIcon from '../../../assets/images/home/close-icon.svg'
import SearchIcon from '../../../assets/images/home/search-icon.svg'
import { styles } from './Home.styles'
import NavigationMenu from '../../ui/NavigationMenu/NavigationMenu'

const Home: React.FC = () => {
	const [searchValue, setSearchValue] = useState('')
	return (
		<View style={styles.root}>
			<View style={styles.wrapper}>
				<Text style={styles.title}>Home</Text>
				<View style={styles.search}>
					<TextInput
						value={searchValue}
						onChange={e => setSearchValue(e.nativeEvent.text)}
						placeholderTextColor='rgb(97, 100, 107)'
						style={styles.input}
						placeholder='Search here'
					/>
					<SearchIcon width={30} height={30} style={styles.searchIcon} />
					{searchValue.length > 0 && (
						<CloseIcon onPress={() => setSearchValue("")} width={27} height={27} style={styles.closeIcon} />
					)}
				</View>
			</View>
			<NavigationMenu />
		</View>
	)
}

export default Home
