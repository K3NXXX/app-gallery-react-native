import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { SCREENS } from '../constants/screens.constants'
import HomeScreen from '../screens/HomeScreen'
import LogInScreen from '../screens/LogInScreen'
import ProfileScreen from '../screens/ProfileScreen'
import SignUpScreen from '../screens/SignUpScreen'
import AlbumsScreen from '../screens/AlbumsScreen'
import FavouritesScreen from '../screens/FavouritesScreen'
import FullAlbumScreen from '../screens/FullAlbumScreen'



const Stack = createStackNavigator()

const Navigation: React.FC = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={SCREENS.HOME}>
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
