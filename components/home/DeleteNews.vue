<template>
  <div class="container">
    <div class="card umss-card">
      <h2 class="title">
        <span class="icon">🗑️</span>
        Eliminar Noticias
      </h2>

      <!-- Filtros y búsqueda -->
      <div class="filters">
        <input 
          v-model="searchTerm"
          type="text" 
          placeholder="Buscar por título..." 
          class="search-input"
          @input="handleSearch"
        >
        <select v-model="categoryFilter" class="filter-select" @change="fetchNews">
          <option value="">Todas las categorías</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <!-- Lista de noticias -->
      <div v-if="loading" class="loading">Cargando noticias...</div>
      
      <div v-else-if="newsList.length === 0" class="no-results">
        No se encontraron noticias
      </div>

      <div v-else class="news-list">
        <div v-for="news in newsList" :key="news._id" class="news-item">
          <div class="news-info">
            <h3 class="news-title">{{ news.title }}</h3>
            <p class="news-excerpt">{{ news.excerpt }}</p>
            <div class="news-meta">
              <span class="news-category">{{ news.category }}</span>
              <span class="news-date">{{ formatDate(news.createdAt) }}</span>
            </div>
          </div>
          
          <div class="news-actions">
            <button 
              @click="confirmDelete(news)" 
              class="delete-btn"
              :disabled="deletingId === news._id"
            >
              <span v-if="deletingId === news._id">⏳</span>
              <span v-else>🗑️ Eliminar</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Paginación -->
      <div v-if="pagination && pagination.total > pagination.limit" class="pagination">
        <button 
          @click="goToPage(currentPage - 1)" 
          :disabled="currentPage === 1"
          class="page-btn"
        >
          ← Anterior
        </button>
        
        <span class="page-info">
          Página {{ currentPage }} de {{ totalPages }}
        </span>
        
        <button 
          @click="goToPage(currentPage + 1)" 
          :disabled="currentPage === totalPages"
          class="page-btn"
        >
          Siguiente →
        </button>
      </div>

      <!-- Modal de confirmación -->
      <div v-if="showConfirmModal" class="modal-overlay">
        <div class="modal">
          <h3>¿Estás seguro?</h3>
          <p>Vas a eliminar la noticia: <strong>{{ selectedNews?.title }}</strong></p>
          <p>Esta acción no se puede deshacer.</p>
          
          <div class="modal-actions">
            <button @click="cancelDelete" class="cancel-btn">Cancelar</button>
            <button @click="executeDelete" class="confirm-delete-btn" :disabled="deletingId">
              {{ deletingId ? 'Eliminando...' : 'Sí, eliminar' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Snackbar de notificación -->
      <div v-if="snackbar.show" :class="['snackbar', snackbar.type]">
        {{ snackbar.message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Estados reactivos
const newsList = ref([])
const loading = ref(true)
const searchTerm = ref('')
const categoryFilter = ref('')
const currentPage = ref(1)
const pagination = ref(null)
const showConfirmModal = ref(false)
const selectedNews = ref(null)
const deletingId = ref(null)
const snackbar = ref({
  show: false,
  message: '',
  type: 'success'
})

// Debounce para búsqueda
let searchTimeout = null

// Categorías
const categories = [
  'Académico',
  'Investigación',
  'Eventos',
  'Cultura',
  'Deportes',
  'Internacional',
  'Nacional',
  'convotatoria admision',
  'nacional internacional'
]

// Computed properties
const totalPages = computed(() => {
  return pagination.value ? Math.ceil(pagination.value.total / pagination.value.limit) : 1
})

// Métodos
const fetchNews = async (page = 1) => {
  try {
    loading.value = true
    
    // Construir query parameters
    const params = new URLSearchParams()
    params.append('page', page)
    
    if (searchTerm.value) {
      params.append('search', searchTerm.value)
    }
    
    if (categoryFilter.value) {
      params.append('category', categoryFilter.value)
    }

    const response = await fetch(`http://localhost:3001/api/news?${params.toString()}`, {
      credentials: 'include'
    })
    
    if (!response.ok) throw new Error('Error al cargar noticias')
    
    const data = await response.json()
    newsList.value = data.data
    pagination.value = data.pagination
    currentPage.value = data.pagination.page
    
  } catch (error) {
    console.error('Error fetching news:', error)
    showSnackbar('Error al cargar noticias', 'error')
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  // Debounce para evitar muchas llamadas a la API
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    fetchNews(1) // Volver a la primera página al buscar
  }, 500)
}

const confirmDelete = (news) => {
  selectedNews.value = news
  showConfirmModal.value = true
}

const cancelDelete = () => {
  showConfirmModal.value = false
  selectedNews.value = null
  deletingId.value = null
}

const executeDelete = async () => {
  if (!selectedNews.value) return
  
  try {
    deletingId.value = selectedNews.value._id
    
    const response = await fetch(`http://localhost:3001/api/news/${selectedNews.value._id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || 'Error al eliminar noticia')
    }
    
    const result = await response.json()
    
    showSnackbar('Noticia eliminada exitosamente', 'success')
    
    // Recargar la lista de noticias manteniendo la página actual
    // Pero si era el último elemento de la página, retroceder una página
    if (newsList.value.length === 1 && currentPage.value > 1) {
      await fetchNews(currentPage.value - 1)
    } else {
      await fetchNews(currentPage.value)
    }
    
  } catch (error) {
    console.error('Error deleting news:', error)
    showSnackbar(error.message || 'Error al eliminar noticia', 'error')
  } finally {
    deletingId.value = null
    showConfirmModal.value = false
    selectedNews.value = null
  }
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    fetchNews(page)
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const showSnackbar = (message, type = 'success') => {
  snackbar.value = {
    show: true,
    message,
    type
  }
  
  setTimeout(() => {
    snackbar.value.show = false
  }, 3000)
}

// Ciclo de vida
onMounted(() => {
  fetchNews(1)
})
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.umss-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin-top: 20px;
}

.title {
  color: #1976d2;
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
}

.icon {
  margin-right: 10px;
  font-size: 32px;
}

/* Filtros */
.filters {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.search-input, .filter-select {
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  min-width: 200px;
}

.search-input:focus, .filter-select:focus {
  outline: none;
  border-color: #1976d2;
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
}

/* Lista de noticias */
.news-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.news-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fafafa;
  transition: all 0.3s;
}

.news-item:hover {
  background: #f0f0f0;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.news-info {
  flex: 1;
  min-width: 0;
}

.news-title {
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.news-excerpt {
  color: #666;
  margin-bottom: 8px;
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-meta {
  display: flex;
  gap: 15px;
  font-size: 12px;
  color: #888;
  flex-wrap: wrap;
}

.news-category {
  background: #e3f2fd;
  padding: 4px 8px;
  border-radius: 12px;
  color: #1976d2;
  font-weight: 500;
}

.news-date {
  font-style: italic;
}

/* Botones */
.delete-btn {
  background: #ff4757;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
  white-space: nowrap;
}

.delete-btn:hover:not(:disabled) {
  background: #ff2e43;
  transform: scale(1.05);
}

.delete-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Paginación */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.page-btn {
  padding: 10px 20px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
  min-width: 100px;
}

.page-btn:hover:not(:disabled) {
  background: #1976d2;
  color: white;
  border-color: #1976d2;
  transform: translateY(-1px);
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.page-info {
  color: #666;
  font-size: 14px;
  font-weight: 500;
  min-width: 120px;
  text-align: center;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 16px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.modal h3 {
  color: #333;
  margin-bottom: 15px;
  font-size: 24px;
}

.modal p {
  margin-bottom: 10px;
  color: #666;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 25px;
}

.cancel-btn {
  padding: 12px 24px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
  min-width: 100px;
}

.cancel-btn:hover {
  background: #f5f5f5;
  transform: translateY(-1px);
}

.confirm-delete-btn {
  padding: 12px 24px;
  background: #ff4757;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
  min-width: 100px;
}

.confirm-delete-btn:hover:not(:disabled) {
  background: #ff2e43;
  transform: translateY(-1px);
}

.confirm-delete-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Snackbar */
.snackbar {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  padding: 16px 32px;
  border-radius: 12px;
  color: white;
  font-weight: 500;
  z-index: 1000;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease-out;
}

.snackbar.success {
  background: linear-gradient(135deg, #4caf50, #45a049);
}

.snackbar.error {
  background: linear-gradient(135deg, #ff4757, #ff2e43);
}

@keyframes slideIn {
  from {
    transform: translateX(-50%) translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
}

/* Estados */
.loading, .no-results {
  text-align: center;
  padding: 60px 20px;
  color: #666;
  font-size: 16px;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.loading::after {
  content: '';
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  border-top: 2px solid #1976d2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 15px;
  }
  
  .umss-card {
    padding: 20px;
  }
  
  .filters {
    flex-direction: column;
  }
  
  .search-input, .filter-select {
    min-width: 100%;
  }
  
  .news-item {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
    text-align: center;
  }
  
  .news-meta {
    justify-content: center;
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .pagination {
    flex-direction: column;
    gap: 15px;
  }
  
  .page-btn {
    min-width: 120px;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 24px;
  }
  
  .modal {
    padding: 20px;
  }
  
  .modal h3 {
    font-size: 20px;
  }
  
  .modal-actions {
    gap: 10px;
  }
  
  .cancel-btn, .confirm-delete-btn {
    padding: 10px 20px;
    min-width: 80px;
  }
}
</style>