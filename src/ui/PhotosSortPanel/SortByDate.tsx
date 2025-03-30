import React from 'react'
import { Animated, Modal, Text, TouchableOpacity, View } from 'react-native'
import ReturnIcon from '../../../assets/images/home/return-icon.svg'
import SortIcon2 from '../../../assets/images/home/sort-icon2.svg'
import { IPhoto } from '../../@types/photos/photos.type'
import { styles } from './PhotosSortPanel.styles'

interface SortByDateProps {
	fadeAnim: Animated.Value
	onClose: () => void
	onSort: (filteredPhotos: string) => void
	allPhotos: IPhoto[] | undefined
	selectedRange: string
}

const SortByDate: React.FC<SortByDateProps> = ({
	fadeAnim,
	onClose,
	onSort,
	allPhotos,
	selectedRange,
}) => {
	return (
		<Modal visible={true} transparent animationType='none'>
			<Animated.View style={[styles.sortByNameRoot, { opacity: fadeAnim }]}>
				<TouchableOpacity onPress={onClose} style={styles.returnIcon}>
					<ReturnIcon width={30} height={30} />
				</TouchableOpacity>
				<View style={styles.titleWrapper}>
					<Text style={styles.sortByNameTitle}>Sort by date</Text>
					<SortIcon2 width={30} height={30} />
				</View>
				<View style={styles.sortWays}>
					<TouchableOpacity
						onPress={() => onSort('today')}
						style={styles.sortWay}
					>
						<Text style={styles.sortWayText}>Sort by today</Text>
						<View
							style={[
								styles.circle,
								selectedRange === 'today' && styles.selectedCircle,
							]}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => onSort('yesterday')}
						style={styles.sortWay}
					>
						<Text style={styles.sortWayText}>Sort by yesterday</Text>
						<View
							style={[
								styles.circle,
								selectedRange === 'yesterday' && styles.selectedCircle,
							]}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => onSort('lastWeek')}
						style={styles.sortWay}
					>
						<Text style={styles.sortWayText}>Sort by last week</Text>
						<View
							style={[
								styles.circle,
								selectedRange === 'lastWeek' && styles.selectedCircle,
							]}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => onSort('last30Days')}
						style={styles.sortWay}
					>
						<Text style={styles.sortWayText}>Sort by last 30 days</Text>
						<View
							style={[
								styles.circle,
								selectedRange === 'last30Days' && styles.selectedCircle,
							]}
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => onSort('')}>
						<Text style={styles.removeFilters}>Remove filters</Text>
					</TouchableOpacity>
				</View>
			</Animated.View>
		</Modal>
	)
}

export default SortByDate
