import React from 'react'
import { useAuth } from '../../hooks/auth-hook'
import { AuthContext } from '../../context/auth-context'
import { useRoutes } from '../routes/routes'

function App() {

    const { token, login, logout, userId, email, userName } = useAuth()

    const isAuthenticated = !!token
  
    const routes = useRoutes(isAuthenticated)

    return (
        <AuthContext.Provider value={{
            token, userId, email, login, logout, userName, isAuthenticated
          }}>
            <div className="App">
                { routes }
            </div>
        </AuthContext.Provider>
    )
}

export default App;
