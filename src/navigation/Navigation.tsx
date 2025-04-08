import { NavigationContainer } from '@react-navigation/native'
import {
	createStackNavigator,
	TransitionPresets,
} from '@react-navigation/stack'
import React from 'react'
import { Easing } from 'react-native'
import { SCREENS } from '../constants/screens.constants'
import AlbumsScreen from '../screens/AlbumsScreen'
import FavouritesScreen from '../screens/FavouritesScreen'
import FullAlbumScreen from '../screens/FullAlbumScreen'
import HomeScreen from '../screens/HomeScreen'
import LogInScreen from '../screens/LogInScreen'
import ProfileScreen from '../screens/ProfileScreen'
import SignUpScreen from '../screens/SignUpScreen'

const Stack = createStackNavigator()

const Navigation: React.FC = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName={SCREENS.HOME}
				screenOptions={{
					...TransitionPresets.SlideFromRightIOS,
					gestureEnabled: true,
					gestureDirection: 'horizontal',
					transitionSpec: {
						open: {
							animation: 'timing',
							config: {
								duration: 600,
								easing: Easing.inOut(Easing.ease),
							},
						},
						close: {
							animation: 'timing',
							config: {
								duration: 400,
								easing: Easing.inOut(Easing.ease),
							},
						},
					},
					cardOverlayEnabled: true,
					headerShown: false,
				}}
			>
				<Stack.Screen name={SCREENS.SIGNUP} component={SignUpScreen} />
				<Stack.Screen name={SCREENS.LOGIN} component={LogInScreen} />
				<Stack.Screen
					name={SCREENS.PROFILE}
					options={{ headerShown: false }}
					component={ProfileScreen}
				/>
				<Stack.Screen
					name={SCREENS.HOME}
					component={HomeScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name={SCREENS.ALBUMS}
					component={AlbumsScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name={SCREENS.FAVOURITES}
					component={FavouritesScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name={SCREENS.FULL_ALBUM}
					component={FullAlbumScreen}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Navigation
