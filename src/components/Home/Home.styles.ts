import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#f7f7f7',
	},
	wrapper: {
		maxWidth: 500,
		width: '100%',
		paddingTop: 70,
		alignSelf: 'center',
		paddingHorizontal: 25,
		flex: 1,
	},
	title: {
		fontSize: 16,
		fontFamily: 'inter-medium',
		color: 'black',
		textAlign: 'center',
		marginBottom: 30,
	},
	search: {
		position: 'relative',
		marginBottom: 20
	},
	input: {
		borderRadius: 50,
		backgroundColor: 'rgb(230, 230, 230)',
		paddingHorizontal: 55,
		paddingVertical: 17,
		fontFamily: 'inter-regular',
	},
	searchIcon: {
		position: 'absolute',
		top: 10,
		left: 10,
	},
	closeIcon: {
		position: 'absolute',
		top: 12,
		right: 12,
	},
	imageContainer: {
		marginTop: 20,
	},
	imagePreview: {
		width: 100,
		height: 100,
		borderRadius: 10,
	},
	photoContainer: {
		width: '31%', 
		margin: 5,
	  },
	  photo: {
		height: 120, 
		borderRadius: 10,
		resizeMode: 'cover', 
	  },
})
