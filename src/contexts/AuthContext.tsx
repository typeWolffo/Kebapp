import React, { createContext, ReactNode, useContext, useMemo } from 'react'

import Api from '../services/api'
import AuthService from '../services/authService'

const ApiContext = createContext({})

export const useAuth = () => {
  const apiContext = useContext(ApiContext)

  if (!apiContext) throw new Error('useApi must be used inside ApiContext provider')

  return apiContext
}

type Props = {
  children: ReactNode
}

function AuthContext(props: Props) {
  const { children } = props
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const authService = new AuthService()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const apiService = new Api()

  const memoizedAuth = useMemo(
    () => ({
      apiService,
      authService,
    }),
    [apiService, authService]
  )

  return <ApiContext.Provider value={memoizedAuth}>{children}</ApiContext.Provider>
}

export default AuthContext
