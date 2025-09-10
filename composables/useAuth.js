export const useAuth = () => {
  const user = useState('user', () => null)
  const isAuthenticated = useState('isAuthenticated', () => false)

  // Login con email y password
  const login = async (email, password) => {
    const { data, error } = await useFetch('http://localhost:3001/auth/login', {
      method: 'POST',
      body: { email, password },
      credentials: 'include'
    })

    if (data.value?.success) {
      user.value = data.value.data.user
      isAuthenticated.value = true
      return { success: true }
    }
    
    return { 
      success: false, 
      error: error.value?.data?.message || 'Error en la autenticación'
    }
  }

  // Verificar estado de autenticación
  const checkAuth = async () => {
    try {
      const { data, error } = await useFetch('http://localhost:3001/auth/check', {
        credentials: 'include'
      })

      if (error.value) {
        isAuthenticated.value = false
        throw error.value
      }

      if (data.value?.success) {
        user.value = data.value.data.user
        isAuthenticated.value = true
        return true
      }
      
      isAuthenticated.value = false
      return false
    } catch (err) {
      console.error('Error checking auth:', err)
      isAuthenticated.value = false
      return false
    }
  }

  // Logout
  const logout = async () => {
    try {
      await useFetch('http://localhost:3001/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      user.value = null
      isAuthenticated.value = false
    }
  }

  return { user, isAuthenticated, login, logout, checkAuth }
}