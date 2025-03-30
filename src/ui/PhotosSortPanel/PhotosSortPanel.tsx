import React, { useEffect, useRef, useState } from 'react'
import {
	Animated,
	Modal,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import CloseIcon from '../../../assets/images/home/close-icon.svg'
import ReturnIcon from '../../../assets/images/home/return-icon.svg'
import SearchIcon from '../../../assets/images/home/search-icon.svg'
import SortIcon from '../../../assets/images/home/sort-icon.svg'
import SortIcon2 from '../../../assets/images/home/sort-icon2.svg'
import { IPhoto } from '../../@types/photos/photos.type'
import { useGetAllPhotos } from '../../hooks/photos/useGetAllPhotosMutation'
import { styles } from './PhotosSortPanel.styles'

interface IPhotosSortPanelProps {
	onFilter: (filteredPhotos: IPhoto[] | undefined) => void
}

const PhotosSortPanel: React.FC<IPhotosSortPanelProps> = ({ onFilter }) => {
	const [isSortByNameOpened, setIsSortByNameOpened] = useState(false)
	const [searchValue, setSearchValue] = useState('')
	const { allPhotos } = useGetAllPhotos()
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
	const fadeAnim = useRef(new Animated.Value(0)).current

	const showModal = () => {
		setIsSortByNameOpened(true)
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true,
		}).start()
	}

	const hideModal = () => {
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start(() => {
			setIsSortByNameOpened(false)
		})
	}

	const handleSortByName = (order: 'asc' | 'desc') => {
		setSortOrder(order)
		hideModal()
	}

	useEffect(() => {
		let filteredPhotos = allPhotos?.filter(photo =>
			photo.name.toLowerCase().includes(searchValue.toLowerCase())
		)

		if (filteredPhotos) {
			filteredPhotos = filteredPhotos.sort((a, b) =>
				sortOrder === 'asc'
					? a.name.localeCompare(b.name)
					: b.name.localeCompare(a.name)
			)
		}

		onFilter(filteredPhotos)
	}, [searchValue, allPhotos, sortOrder])

	return (
		<View>
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
			<View style={styles.filterWays}>
				<TouchableOpacity onPress={showModal} style={styles.filterBtn}>
					<Text style={styles.filterBtnText}>Sort by name</Text>
				</TouchableOpacity>
				<SortIcon width={30} height={30} />
				<TouchableOpacity style={styles.filterBtn}>
					<Text style={styles.filterBtnText}>Sort by date</Text>
				</TouchableOpacity>
			</View>
			{isSortByNameOpened && (
				<Modal visible={isSortByNameOpened} transparent animationType='none'>
					<Animated.View style={[styles.sortByNameRoot, { opacity: fadeAnim }]}>
						<TouchableOpacity onPress={hideModal} style={styles.returnIcon}>
							<ReturnIcon width={30} height={30} />
						</TouchableOpacity>
						<View style={styles.titleWrapper}>
							<Text style={styles.sortByNameTitle}>Sort by name</Text>
							<SortIcon2 width={30} height={30} />
						</View>
						<View style={styles.sortWays}>
							<TouchableOpacity
								onPress={() => handleSortByName('asc')}
								style={styles.sortWay}
							>
								<Text style={styles.sortWayText}>Sort by A-Z</Text>
								<View
									style={[
										styles.circle,
										sortOrder === 'asc' && styles.selectedCircle,
									]}
								></View>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => handleSortByName('desc')}
								style={styles.sortWay}
							>
								<Text style={styles.sortWayText}>Sort by Z-A</Text>
								<View
									style={[
										styles.circle,
										sortOrder === 'desc' && styles.selectedCircle,
									]}
								></View>
							</TouchableOpacity>
						</View>
					</Animated.View>
				</Modal>
			)}
		</View>
	)
}

export default PhotosSortPanel
