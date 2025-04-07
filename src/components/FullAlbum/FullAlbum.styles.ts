import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#f7f7f7',
	},
	top: {
		backgroundColor: '#ee9938',
		paddingVertical: 15,
		paddingHorizontal: 12,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	topLeft: {},
	topRight: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	albumName: {
		color: 'white',
		fontFamily: 'inter-bold',
		fontSize: 20,
	},
	editButton: {
		marginRight: 20,
	},
	returnButton: {},
	description: {
		fontFamily: 'inter-medium',
		fontSize: 20,
		textAlign: 'center',
		paddingVertical: 15,
	},
	descriptionText: {
		fontFamily: 'inter-medium',
		fontSize: 16,
		textAlign: 'center',
	},
	descriptionWrapper: {
		backgroundColor: '#ffbe74',
	},
})
