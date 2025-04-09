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
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.15,
		shadowRadius: 8,
		elevation: 6,
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
	albumBadge: {
		backgroundColor: '#fff',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 10,
		marginLeft: 10,
		marginTop: 5
	},
	albumBadgeText: {
		color: '#ee9938',
		fontFamily: 'inter-medium',
		fontSize: 12,
	},
	topLeftWrapper: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	content: {
		paddingHorizontal: 12,
		paddingVertical: 12,
	},

})
