import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [ token, setToken ] = useState(null)
  const [ adminId, setAdminId ] = useState(null)

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken)
    setAdminId(id)

    console.log('!!!')
    localStorage.setItem(storageName, JSON.stringify({
      adminId: id, token: jwtToken,
    }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setAdminId(null)

    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      login(data.token, data.adminId)
    }
  }, [ login ])

  return { login, logout, token, adminId }
}
