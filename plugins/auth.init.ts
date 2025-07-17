export default defineNuxtPlugin(async () => {
  const { checkAuth } = useAuth()
  await checkAuth() // Verificar autenticación al cargar la app
})