// middleware/role.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const { user, checkAuth } = useAuth()
  
  // Verificar autenticación primero
  const isAuth = await checkAuth()
  if (!isAuth) return
  
  // Definir permisos por rol
  const rolePermissions = {
    admin: ['/admin', '/dashboard', '/settings'],
    user: ['/dashboard', '/profile'],
    guest: ['/public']
  }
  
  // Obtener rol del usuario
  const userRole = user.value?.role || 'guest'
  
  // Verificar si la ruta actual está permitida para el rol
  const allowedRoutes = rolePermissions[userRole] || []
  const hasPermission = allowedRoutes.some(path => 
    to.path.startsWith(path)
  )
  
  if (!hasPermission) {
    return navigateTo('/unauthorized') // o a una ruta de "acceso denegado"
  }
})