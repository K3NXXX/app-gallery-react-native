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
	descriptionWrapper: {
		marginVertical: 20,
		marginHorizontal: 20,
		borderRadius: 12,
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.15,
		shadowRadius: 10,
		elevation: 4,
		paddingVertical: 15,
		paddingHorizontal: 15,
		textAlign: 'center',
		marginTop: 30
	},

	description: {
		fontFamily: 'inter-semibold',
		fontSize: 18,
		color: '#333',
		marginBottom: 10,
		textAlign: 'center',
	},

	descriptionText: {
		fontFamily: 'inter-regular',
		fontSize: 14,
		color: '#666',
		lineHeight: 20,
		textAlign: 'center',
	},
	photo: {
		height: 120,
		resizeMode: 'cover',
		opacity: 1,
		borderRadius: 12,
	},
	photoContainer: {
		width: '31%',
		margin: 5,
	},
	content: {
		paddingHorizontal: 12,
		paddingVertical: 12,
	},
})
