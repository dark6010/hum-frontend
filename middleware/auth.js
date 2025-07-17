// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const { isAuthenticated, checkAuth } = useAuth()
  
  // 1. Definir rutas públicas que no requieren autenticación
  const publicRoutes = ['/', '/register', '/auth-redirect']
  
  // 2. Si es ruta pública, continuar sin verificar
  if (publicRoutes.includes(to.path)) {
    return
  }
  
  try {
    // 3. Verificar autenticación (usando el composable)
    const authStatus = isAuthenticated.value || await checkAuth()
    
    // 4. Si no está autenticado, redirigir a login con returnTo
    if (!authStatus) {
      return navigateTo({
        path: '/loginumss',
        // query: { returnTo: to.path }
      })
    }
    
    // 5. Si está autenticado pero intenta acceder a login, redirigir a home
    if (authStatus && to.path === '/loginumss') {
      return navigateTo('/')
    }
  } catch (error) {
    console.error('Error en middleware de auth:', error)
    return navigateTo('/loginumss')
  }
})