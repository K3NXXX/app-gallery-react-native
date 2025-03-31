import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	root: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.9)',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 100,
	},
	form: {
		maxWidth: 400,
		width: '70%',
	},
	inputWrapper: {
		marginBottom: 20,
	},
	label: {
		fontFamily: 'inter-bold',
		color: 'rgb(255, 255, 255)',
		fontSize: 14,
		marginRight: 5,
	},
	input: {
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: 'rgb(201, 205, 210)',
		borderRadius: 10,
		paddingHorizontal: 20,
		paddingVertical: 15,
		fontFamily: 'inter-regular',
		color: "white"
		
	},
	top: {
		display: 'flex',
		flexDirection: 'row',
		rowGap: 20,
		marginBottom: 8,
	},
	passwordWrapper: {
		position: 'relative',
	},
	eye: {
		width: 25,
		height: 25,
		position: 'absolute',
		top: 12,
		right: 10,
	},
	button: {
		borderRadius: 15,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		paddingVertical: 10,
		borderColor: 'rgb(255, 167, 56)',
		borderWidth: 2
	},
	buttonText: {
		color: 'rgb(255, 167, 56)',
		fontSize: 16,
		fontFamily: 'inter-bold',
	},
	errorText: {
		color: 'red',
		fontSize: 14,
		fontFamily: 'inter-regular',
		marginTop: 3,
		marginLeft: 5,
	},
	closeIcon: {
		position: 'absolute',
		top: 30,
		right: 30,
	},
	uploadButton: {

	},
	createButton: {
		borderRadius: 15,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		paddingVertical: 15,
		backgroundColor: 'rgb(255, 167, 56)',
		marginTop: 50

	},
	createText :{
		color: 'rgb(255, 255, 255)',
		fontSize: 16,
		fontFamily: 'inter-bold',
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
		paddingHorizontal: 60,
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
	albumImage: {
		width: 100,
		height: 100,
		borderRadius: 12,
		marginTop: 20,
		
		
	},
	albumImageWrapper: {
		position: 'relative',
		width: 120
	},
	albumCloseIcon: {
		position: "absolute",
		top: 5,
		right: 5
	}
})
