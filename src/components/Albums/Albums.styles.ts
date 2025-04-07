import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#f7f7f7',
	},
	wrapper: {
		maxWidth: 500,
		width: '100%',
		paddingTop: 60,
		alignSelf: 'center',
		paddingHorizontal: 25,
		flex: 1,
		paddingBottom: 20,
	},
	title: {
		fontSize: 16,
		fontFamily: 'inter-medium',
		color: 'black',
		textAlign: 'center',
		marginBottom: 30,
	},
	createAlbum: {
		alignItems: 'center',
		paddingTop: 100
	},
	text1: {
		fontSize: 20,
		fontFamily: 'inter-medium',
	},
	text2: {
		fontSize: 25,
		fontFamily: 'inter-bold',
		marginBottom: 20
	},
	photoContainer: {
		margin: 5,
	},
	album: {
		height: 190,
		borderRadius: 10,
		resizeMode: 'cover',
	},
	albumName: {
		fontFamily: "inter-bold",
		marginTop: 10
	},
	createNewAlbum :{
		backgroundColor: "rgb(255, 167, 56)",
		paddingVertical: 12,
		borderRadius: 12,
		marginBottom: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	createNewAlbumText :{
		color: "white",
		textAlign: 'center',
		fontFamily: "inter-bold",
		marginRight: 10,
		fontSize: 16
	},
	
	albumContainer: {
		width: "48%",
		margin: 5,
		marginBottom: 10,
		borderColor: "transparent",
		borderStyle: 'solid',
		borderWidth: 2,
	},
	noImageWrapper: {
		borderColor: "gray",
		borderStyle: 'solid',
		borderWidth: 2,
		alignItems: 'center',
		borderRadius: 12

	}
})
