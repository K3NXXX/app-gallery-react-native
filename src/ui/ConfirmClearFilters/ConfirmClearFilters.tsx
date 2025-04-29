import React from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './ConfirmClearFilters.styles'

interface IConfirmClearFiltersProps {
	setIsFilterCancel: (isFilterCancel: boolean) => void
	setIsFiltersOpened: (isFiltersOpened: boolean) => void
}

const ConfirmClearFilters: React.FC<IConfirmClearFiltersProps> = ({
	setIsFilterCancel,
	setIsFiltersOpened
}) => {
	return (
		<Modal transparent={true} animationType='fade'>
			<View style={styles.root}>
				<View style={styles.wrapper}>
					<Text style={styles.sure}>You have unsaved filters</Text>
					<View style={styles.buttonsWrapper}>
						<TouchableOpacity
							onPress={() => setIsFiltersOpened(false)}
							style={styles.cancel}
						>
							<Text style={styles.cancelText}>Exit</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => setIsFilterCancel(false)}
							style={styles.delete}
						>
							<Text style={styles.deleteText}>Continue</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	)
}

export default ConfirmClearFilters
