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

	deleteButton: {
		padding: 10,
		borderRadius: 50,
	},
})
