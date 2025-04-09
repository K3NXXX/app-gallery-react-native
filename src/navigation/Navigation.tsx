import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { useAuthStore } from '../zustand/useAuthStore'
import AppNavigator from './AppNavigation'
import AuthNavigator from './AuthNavigator'

const Navigation: React.FC = () => {
	const isAuthenticated = useAuthStore(state => state.isAuthenticated)
	return (
		<NavigationContainer>
			{isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
		</NavigationContainer>
	)
}

export default Navigation
