import React, { useEffect, useRef, useState } from 'react'
import { Animated, Text, TextInput, TouchableOpacity, View } from 'react-native'
import SortByDate from './SortByDate'
import SortByName from './SortByName'
import { useGetAllAlbumsQuery } from '../../hooks/albums/useGetAllAlbumsQuery'
import { useGetAllPhotos } from '../../hooks/photos/useGetAllPhotosMutation'
import { IAlbum } from '../../@types/albums/albums.types'
import { IPhoto } from '../../@types/photos/photos.type'
import CloseIcon from '../../../assets/images/home/close-icon.svg'
import SearchIcon from '../../../assets/images/home/search-icon.svg'
import SortIcon from '../../../assets/images/home/sort-icon.svg'
import { styles } from './SortPanel.styles'

interface IPhotosSortPanelProps<T extends IPhoto | IAlbum> {
	onFilter: (filteredItems: T[] | undefined) => void
	fromWhichPage: string
	setIsLoading?: (isLoading: boolean) => void
}

const SortPanel = <T extends IPhoto | IAlbum>({
	onFilter,
	fromWhichPage,
	setIsLoading,
}: IPhotosSortPanelProps<T>) => {
	const [isSortByNameOpened, setIsSortByNameOpened] = useState(false)
	const [isSortByDateOpened, setIsSortByDateOpened] = useState(false)
	const [searchValue, setSearchValue] = useState('')
	const [sortOrderByName, setSortOrderByName] = useState<'asc' | 'desc' | ''>(
		''
	)
	const [selectedRange, setSelectedRange] = useState<string>('')
	const [filteredItems, setFilteredItems] = useState<IPhoto[] | IAlbum[]>([])
	
	const { allAlbums } = useGetAllAlbumsQuery()
	const { allPhotos, isLoading } = useGetAllPhotos()
	const fadeAnim = useRef(new Animated.Value(0)).current

	const showSortByNameModal = () => {
		setIsSortByNameOpened(true)
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true,
		}).start()
	}

	const hideSortByNameModal = () => {
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start(() => {
			setIsSortByNameOpened(false)
		})
	}

	const showSortByDateModal = () => {
		setIsSortByDateOpened(true)
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true,
		}).start()
	}

	const hideSortByDateModal = () => {
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start(() => {
			setIsSortByDateOpened(false)
		})
	}

	const filterByDate = (range: string) => {
		let filtered = []
		const today = new Date()
		const items = (fromWhichPage === 'home' ? allPhotos : allAlbums) ?? []

		switch (range) {
			case 'today':
				filtered = items.filter(item => {
					const itemDate = new Date(item.createdAt)
					return itemDate.toDateString() === today.toDateString()
				})
				break
			case 'yesterday':
				const yesterday = new Date(today)
				yesterday.setDate(today.getDate() - 1)
				filtered = items.filter(item => {
					const itemDate = new Date(item.createdAt)
					return itemDate.toDateString() === yesterday.toDateString()
				})
				break
			case 'lastWeek':
				const lastWeek = new Date(today)
				lastWeek.setDate(today.getDate() - 7)
				filtered = items.filter(item => {
					const itemDate = new Date(item.createdAt)
					return itemDate >= lastWeek
				})
				break
			case 'last30Days':
				const last30Days = new Date(today)
				last30Days.setDate(today.getDate() - 30)
				filtered = items.filter(item => {
					const itemDate = new Date(item.createdAt)
					return itemDate >= last30Days
				})
				break
			default:
				filtered = items
		}

		setSelectedRange(range)
		//@ts-ignore
		setFilteredItems(filtered)
		hideSortByDateModal()
	}

	useEffect(() => {
		if (!selectedRange && !sortOrderByName && !searchValue) {
			setFilteredItems(
				fromWhichPage === 'home' ? allPhotos ?? [] : allAlbums ?? []
			)
		}
	}, [
		allPhotos,
		allAlbums,
		selectedRange,
		sortOrderByName,
		searchValue,
		fromWhichPage,
	])

	useEffect(() => {
		let filtered = filteredItems.filter(item =>
			item.name.toLowerCase().includes(searchValue.toLowerCase())
		)

		if (filtered && sortOrderByName !== '') {
			filtered = filtered.sort((a, b) =>
				sortOrderByName === 'asc'
					? a.name.localeCompare(b.name)
					: b.name.localeCompare(a.name)
			)
		}
		//@ts-ignore
		onFilter(filtered)
	}, [searchValue, filteredItems, sortOrderByName])

	useEffect(() => {
		if (setIsLoading) {
			setIsLoading(isLoading)
		}
	}, [isLoading])

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
				<TouchableOpacity
					onPress={showSortByNameModal}
					style={styles.filterBtn}
				>
					<Text style={styles.filterBtnText}>Sort by name</Text>
				</TouchableOpacity>
				<SortIcon width={30} height={30} />
				<TouchableOpacity
					onPress={showSortByDateModal}
					style={styles.filterBtn}
				>
					<Text style={styles.filterBtnText}>Sort by date</Text>
				</TouchableOpacity>
			</View>

			{isSortByNameOpened && (
				<SortByName
					fadeAnim={fadeAnim}
					onClose={hideSortByNameModal}
					onSort={setSortOrderByName}
					sortOrderByName={sortOrderByName}
				/>
			)}
			{isSortByDateOpened && (
				<SortByDate
					fadeAnim={fadeAnim}
					onClose={hideSortByDateModal}
					onSort={filterByDate}
					selectedRange={selectedRange}
				/>
			)}
		</View>
	)
}

export default SortPanel
