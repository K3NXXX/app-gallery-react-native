import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	root: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		paddingBottom: 40,
		zIndex: 999
	},
	wrapper: {
		flexDirection: "row",
		justifyContent: "center"
	},
	item: {
		alignItems: "center",
		width: "20%"
	},
	icon: {
		width: 25,
		height: 25,
		marginBottom: 6
	},
	label: {
		fontFamily: "inter-medium",
	},
	createIcon: {
		width: 50,
		height: 50,
	},
	addPhotoWrapper: {
		position: "absolute", 
		width: "100%",
		height: "100%",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
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
		alignItems: 'center'
	},
	title:{
		fontFamily: "inter-bold",
		fontSize: 25,
		color: "black",
		marginBottom: 20

	},
	
	way: {
		fontFamily: "inter-regular",
		fontSize: 17,
		color: "#000000",
	
	},
	wayWrapper: {
		flexDirection: "row",
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
	
})
