import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	root: {
		position: 'absolute', 
		left: 0,
		right: 0,
		bottom: 0, 
		paddingBottom: 40,  
	  },
	wrapper: {
		flexDirection: "row",
		justifyContent: "center"
		
		
	},
	item: {
		alignItems: "center",
		width: "20%"

	},
	icon :{
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
	addPhotoWrapper: { position: "relative"},
	ways: {
		position: "absolute",
		alignItems: "center",
		width: 230,
		top: -55,
		left: -45,
		backgroundColor: "#ee9938",
		borderRadius: 20
	},
	way: {
		fontFamily: "inter-bold",
		fontSize: 17,
		marginVertical: 8,
		color: "white"
	},
	tail: {
		position: "absolute",
		bottom: -20,
		width: 0,
		height: 0,
		borderLeftWidth: 10,
		borderRightWidth: 10,
		borderTopWidth: 20,
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
		borderTopColor: '#ee9938',
	}

	
	
})
