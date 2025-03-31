import React from 'react'
import { Animated, Modal, Text, TouchableOpacity, View } from 'react-native'
import ReturnIcon from '../../../assets/images/home/return-icon.svg'
import SortIcon2 from '../../../assets/images/home/sort-icon2.svg'
import { styles } from './SortPanel.styles'

interface SortByNameProps {
	fadeAnim: Animated.Value
	onClose: () => void
	onSort: (order: 'asc' | 'desc' | '') => void
	sortOrderByName: string
}

const SortByName: React.FC<SortByNameProps> = ({
	fadeAnim,
	onClose,
	onSort,
	sortOrderByName,
}) => {
	const handleSortByName = (order: 'asc' | 'desc' | '') => {
		onSort(order)
		onClose()
	}

	return (
		<Modal visible={true} transparent animationType='none'>
			<Animated.View style={[styles.sortByNameRoot, { opacity: fadeAnim }]}>
				<TouchableOpacity onPress={onClose} style={styles.returnIcon}>
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
								sortOrderByName === 'asc' && styles.selectedCircle,
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
								sortOrderByName === 'desc' && styles.selectedCircle,
							]}
						></View>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => handleSortByName('')}>
						<Text style={styles.removeFilters}>Remove filters</Text>
					</TouchableOpacity>
				</View>
			</Animated.View>
		</Modal>
	)
}

export default SortByName
