import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.9)',
	},
	editRow: {
		position: 'absolute',
		flexDirection: 'row',
		backgroundColor: 'white',
		justifyContent: 'space-between',
		right: 2,
		left: 0,
		zIndex: 10,
		height: 60,
		borderEndEndRadius: 20,
		borderStartEndRadius: 20,
		borderBottomColor: 'rgb(255, 167, 56)',
		borderWidth: 2,
		borderLeftColor: 'rgb(255, 167, 56)',
		borderRightColor: 'rgb(255, 167, 56)',
	},
	editRowLeft: {
		flexDirection: 'row',
		alignItems: 'center',
	},

	photoIcons: {
		padding: 10,
		borderRadius: 50,
	},
	editButtonWrapper: {
		backgroundColor: '#ee9938',
		position: 'absolute',
		bottom: 40,
		right: 40,
		zIndex: 999,
		padding: 14,
		borderRadius: 12,
	},

	editButton: {
		
	},
})
