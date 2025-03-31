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
	},
	title: {
		fontSize: 16,
		fontFamily: 'inter-medium',
		color: 'black',
		textAlign: 'center',
		marginBottom: 30,
	},
	noAvatar: {
		width: 150,
		height: 150,
		borderRadius: 100
	},
	avatarWrapper: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 20,
		position: "relative"
	},
	info: {
		alignItems: 'center',
	},
	name: {
		fontSize: 20,
		fontFamily: 'inter-bold',
		color: 'black',
		marginBottom: 20,
	},
	personalInfo: {
		width: '100%',
	},
	personalInfoTop: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		marginBottom: 10
	},
	personalInfoText: {
		color: '#505050',
		fontSize: 16,
		fontFamily: 'inter-bold',
	},
	personalInfoEdit: {
		color: 'gray',
		fontFamily: 'inter-medium',
		fontSize: 16,
	},
	row: {
		backgroundColor: '#dfe8ef',
		paddingVertical: 14,
		paddingHorizontal: 16,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderRadius: 20,
		marginBottom: 10
	},
	rowLeft: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	rowText: {
		color: 'gray',
		fontFamily: 'inter-medium',
		marginLeft: 10,
	},
	rowRight: {
		color: 'black',
		fontFamily: 'inter-medium',
		marginLeft: 10,
	},
	utilitiesInfoTop: {
		marginTop: 50,
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		marginBottom: 10
	},
	addIcon: {
		position: "absolute",
		right: 120,
		bottom: -10
	},
	modal: {
		position: "absolute",
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0, 0, 0, 0.4)", 
		justifyContent: "center",
		alignItems: "center",
		zIndex: 100,
	},
	ways: {
		backgroundColor: "white",
		padding: 25,
		paddingHorizontal: 40,
		borderRadius: 20,
		alignItems: 'center',
		paddingBottom: 40
	},
	titlePhoto:{
		fontFamily: "inter-bold",
		fontSize: 25,
		color: "black",
		marginBottom: 20

	},
	container: {
		alignItems: "center",
		backgroundColor: "#dfe8ef",
		borderRadius: 20,
		paddingVertical: 10,
		paddingHorizontal: 15,

	},
	firstContainer: {
		marginRight: 15, 

	},
	iconGallery: {
		marginVertical: 5
	},
	
	way: {
		fontFamily: "inter-medium",
		fontSize: 17,
		color: "#000000",
	
	},
	wayWrapper: {
		flexDirection: "row",
	},
})
