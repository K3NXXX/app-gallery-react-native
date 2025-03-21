import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	root: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		backgroundColor: 'rgb(248, 248, 248)',
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
		color: 'rgb(39, 42, 49)',
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
		paddingVertical: 15,
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
	}
})
