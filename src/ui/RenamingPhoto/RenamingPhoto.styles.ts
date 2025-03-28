import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	root: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,0.8)",
		zIndex: 999999,
		alignItems: 'center',
		justifyContent: 'center'
	},
	wrapper: {
		alignContent: 'center',
		backgroundColor: "white",
		padding: 20,
		borderRadius: 12,
		width: 300
	},
	sure: {
		fontFamily: "inter-bold",
		fontSize: 20,
		textAlign: 'center',
		marginBottom: 20
	},
	buttonsWrapper: {
		flexDirection: 'row',
		justifyContent: "space-between"
	},
	cancel: {
		paddingVertical: 12,
		paddingHorizontal: 30,
		borderRadius: 12
	},
	delete: {
		backgroundColor: "#ee9938",
		paddingVertical: 12,
		paddingHorizontal: 30,
		borderRadius: 12

	},

	deleteText: {
		color: "white",
		fontSize: 18,
		fontFamily: "inter-bold"
	},
	cancelText: {
		color: "#000000",
		fontSize: 18,
		fontFamily: "inter-medium"
	},
	input: {
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: 'rgb(201, 205, 210)',
		borderRadius: 10,
		paddingHorizontal: 20,
		paddingVertical: 10,
		fontFamily: 'inter-regular',
		minHeight: 60
	},
	inputWrapper: {
		marginBottom: 20
	},
	label: {
		fontFamily: 'inter-bold',
		color: 'rgb(39, 42, 49)',
		fontSize: 14,
		marginRight: 5
	},
	
	top: {
		display: 'flex',
		flexDirection: 'row',
		rowGap: 20,
	},
	errorText: {
		color: "red",
		fontSize: 14,
		fontFamily:"inter-regular",
		marginTop: 3,
		marginLeft: 5
	}
})
