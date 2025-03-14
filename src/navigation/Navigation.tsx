import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { SCREENS } from '../constants/screens.constants'
import HomeScreen from '../screens/HomeScreen'
import LogInScreen from '../screens/LogInScreen'
import SignUpScreen from '../screens/SignUpScreen'

const Stack = createStackNavigator()

const Navigation: React.FC = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={SCREENS.HOME}>
				<Stack.Screen name={SCREENS.SIGNUP} component={SignUpScreen} />
				<Stack.Screen name={SCREENS.LOGIN} component={LogInScreen} />
				<Stack.Screen
					name={SCREENS.HOME}
					component={HomeScreen}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Navigation
