import React, { createContext, useContext, useState, ReactNode } from 'react'

interface IAuthContextType  {
	isAuthenticated: boolean
	login: () => void
	logout: () => void
}

const AuthContext = createContext<IAuthContextType | null>(null)

export const useAuth = () => useContext(AuthContext)!

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	const login = () => setIsAuthenticated(true)
	const logout = () => setIsAuthenticated(false)

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}
