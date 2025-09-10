<template>
  <div class="container">
    <div class="card umss-card">
      <h2 class="title">
        <span class="icon">✏️</span>
        Actualizar Noticias
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
              @click="editNews(news)" 
              class="edit-btn"
            >
              ✏️ Editar
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

      <!-- Modal de edición -->
      <div v-if="showEditModal" class="modal-overlay">
        <div class="modal">
          <h3 class="modal-title">Editar Noticia</h3>
          
          <form @submit.prevent="submitUpdate" class="form">
            <div class="form-group">
              <label for="edit-title">Título de la noticia</label>
              <input 
                id="edit-title"
                v-model="editForm.title" 
                type="text" 
                class="input-field"
                :class="{ 'error-field': editErrors.title }"
                placeholder="Ingrese el título de la noticia"
                maxlength="100"
                @input="clearEditError('title')"
              >
              <div class="char-counter">{{ editForm.title.length }}/100 caracteres</div>
              <div v-if="editErrors.title" class="error">{{ editErrors.title }}</div>
            </div>

            <div class="form-group">
              <label for="edit-excerpt">Resumen de la noticia</label>
              <textarea 
                id="edit-excerpt"
                v-model="editForm.excerpt" 
                rows="3"
                class="input-field"
                :class="{ 'error-field': editErrors.excerpt }"
                placeholder="Escriba un resumen de la noticia"
                @input="clearEditError('excerpt')"
              ></textarea>
              <div v-if="editErrors.excerpt" class="error">{{ editErrors.excerpt }}</div>
            </div>

            <div class="form-group">
              <label for="edit-content">Contenido completo</label>
              <textarea 
                id="edit-content"
                v-model="editForm.content" 
                rows="6"
                class="input-field"
                :class="{ 'error-field': editErrors.content }"
                placeholder="Escriba el contenido completo de la noticia (mínimo 50 caracteres si se modifica)"
                @input="clearEditError('content')"
              ></textarea>
              <div class="char-counter">{{ editForm.content.length }} caracteres (mínimo 50 si se modifica)</div>
              <div v-if="editErrors.content" class="error">{{ editErrors.content }}</div>
            </div>

            <div class="form-group">
              <label for="edit-category">Categoría</label>
              <select 
                id="edit-category"
                v-model="editForm.category" 
                class="input-field"
                :class="{ 'error-field': editErrors.category }"
                @change="clearEditError('category')"
              >
                <option value="" disabled>Seleccione una categoría</option>
                <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
              <div v-if="editErrors.category" class="error">{{ editErrors.category }}</div>
            </div>

            <div class="form-group">
              <label for="edit-image" class="file-label">
                <span class="file-icon">📷</span>
                Nueva imagen de la noticia (opcional)
              </label>
              <input 
                id="edit-image"
                type="file" 
                accept="image/*" 
                @change="onFileChange"
                class="file-input"
                :class="{ 'error-field': editErrors.image }"
              >
              <div v-if="editErrors.image" class="error">{{ editErrors.image }}</div>
              
              <!-- Vista previa de imagen actual -->
              <div v-if="selectedNews.images && selectedNews.images.length > 0" class="current-image">
                <h4>Imagen actual:</h4>
                <img 
                  :src="`http://localhost:3001/uploads/${selectedNews.images[0]}`" 
                  :alt="`Imagen de ${selectedNews.title}`" 
                  class="preview-image"
                >
              </div>
              
              <!-- Vista previa de nueva imagen -->
              <div v-if="editForm.imageUrl" class="image-preview">
                <h4>Nueva imagen:</h4>
                <img :src="editForm.imageUrl" alt="Vista previa" class="preview-image">
              </div>
            </div>

            <div class="form-actions">
              <button 
                type="button" 
                @click="closeEditModal" 
                class="cancel-btn"
                :disabled="loading"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                :disabled="loading || !hasChanges" 
                class="submit-btn"
              >
                <span v-if="!loading">💾 Actualizar Noticia</span>
                <span v-else>⏳ Actualizando...</span>
              </button>
            </div>
          </form>
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
import { ref, reactive, computed, onMounted } from 'vue'

// Estados reactivos para la lista
const newsList = ref([])
const loading = ref(true)
const searchTerm = ref('')
const categoryFilter = ref('')
const currentPage = ref(1)
const pagination = ref(null)

// Estados reactivos para la edición
const showEditModal = ref(false)
const selectedNews = ref(null)
const editForm = reactive({
  title: '',
  excerpt: '',
  content: '',
  category: '',
  image: null,
  imageUrl: ''
})
const loadingEdit = ref(false)

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

// Estados reactivos para errores y snackbar
const editErrors = reactive({
  title: '',
  excerpt: '',
  content: '',
  category: '',
  image: ''
})

const snackbar = reactive({
  show: false,
  message: '',
  type: 'success'
})

// Computed properties
const totalPages = computed(() => {
  return pagination.value ? Math.ceil(pagination.value.total / pagination.value.limit) : 1
})

const hasChanges = computed(() => {
  if (!selectedNews.value) return false
  
  return (
    editForm.title !== selectedNews.value.title ||
    editForm.excerpt !== selectedNews.value.excerpt ||
    editForm.content !== selectedNews.value.content ||
    editForm.category !== selectedNews.value.category ||
    editForm.image !== null
  )
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

const editNews = (news) => {
  selectedNews.value = news
  
  // Llenar el formulario con los datos actuales
  editForm.title = news.title
  editForm.excerpt = news.excerpt
  editForm.content = news.content
  editForm.category = news.category
  editForm.image = null
  editForm.imageUrl = ''
  
  // Limpiar errores
  Object.keys(editErrors).forEach(key => {
    editErrors[key] = ''
  })
  
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  selectedNews.value = null
  loadingEdit.value = false
}

const onFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validar tamaño (máximo 2MB)
    if (file.size > 2 * 1024 * 1024) {
      editErrors.image = 'La imagen debe ser menor a 2 MB'
      editForm.image = null
      editForm.imageUrl = ''
      return
    }
    
    // Validar tipo de archivo
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!validImageTypes.includes(file.type)) {
      editErrors.image = 'Formato de imagen no válido. Use JPEG, PNG, GIF o WebP'
      editForm.image = null
      editForm.imageUrl = ''
      return
    }
    
    editForm.image = file
    editErrors.image = ''
    editForm.imageUrl = URL.createObjectURL(file)
  } else {
    editForm.image = null
    editForm.imageUrl = ''
  }
}

const clearEditError = (field) => {
  editErrors[field] = ''
}

const validateEditForm = () => {
  let isValid = true
  
  // Reset errors
  Object.keys(editErrors).forEach(key => {
    editErrors[key] = ''
  })
  
  // Validar título (máximo 100 caracteres, solo si se modifica)
  if (editForm.title !== selectedNews.value.title) {
    if (!editForm.title.trim()) {
      editErrors.title = 'El título no puede estar vacío'
      isValid = false
    } else if (editForm.title.length > 100) {
      editErrors.title = 'El título no puede exceder los 100 caracteres'
      isValid = false
    }
  }
  
  // Validar contenido (mínimo 50 caracteres, solo si se modifica)
  if (editForm.content !== selectedNews.value.content) {
    if (editForm.content.trim() && editForm.content.length < 50) {
      editErrors.content = 'El contenido debe tener al menos 50 caracteres si se modifica'
      isValid = false
    }
  }
  
  return isValid
}

const submitUpdate = async () => {
  if (!validateEditForm()) {
    return
  }
  
  loadingEdit.value = true
  
  try {
    const formData = new FormData()
    
    // Solo agregar campos que han cambiado
    if (editForm.title !== selectedNews.value.title) {
      formData.append('title', editForm.title.trim())
    }
    if (editForm.excerpt !== selectedNews.value.excerpt) {
      formData.append('excerpt', editForm.excerpt.trim())
    }
    if (editForm.content !== selectedNews.value.content) {
      formData.append('content', editForm.content.trim())
    }
    if (editForm.category !== selectedNews.value.category) {
      formData.append('category', editForm.category)
    }
    if (editForm.image) {
      formData.append('images', editForm.image)
    }
    
    const response = await fetch(`http://localhost:3001/api/news/${selectedNews.value._id}`, {
      method: 'PUT',
      body: formData,
      credentials: 'include'
    })
    
    const responseData = await response.json()
    
    if (response.ok) {
      showSnackbar('Noticia actualizada exitosamente', 'success')
      closeEditModal()
      await fetchNews(currentPage.value) // Recargar la lista de noticias
    } else {
      // Manejar errores de validación del backend
      if (responseData.errors) {
        Object.keys(responseData.errors).forEach(field => {
          if (editErrors.hasOwnProperty(field)) {
            editErrors[field] = responseData.errors[field]
          }
        })
        throw new Error('Errores de validación en el formulario')
      } else {
        throw new Error(responseData.message || 'Error al actualizar la noticia')
      }
    }
  } catch (error) {
    console.error('Error:', error)
    if (!error.message.includes('validación')) {
      showSnackbar(error.message || 'Error al actualizar la noticia', 'error')
    }
  } finally {
    loadingEdit.value = false
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
/* Estilos iguales a DeleteNews para la lista */
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
.edit-btn {
  background: #ff9800;
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

.edit-btn:hover {
  background: #f57c00;
  transform: scale(1.05);
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

/* Modal de edición */
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
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.modal-title {
  color: #1976d2;
  text-align: center;
  margin-bottom: 25px;
  font-size: 24px;
}

/* Formulario dentro del modal */
.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.input-field {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.input-field:focus {
  outline: none;
  border-color: #1976d2;
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
}

.input-field.error-field {
  border-color: #d32f2f;
  box-shadow: 0 0 0 2px rgba(211, 47, 47, 0.2);
}

.file-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
}

.file-icon {
  margin-right: 8px;
  font-size: 16px;
}

.file-input {
  margin-top: 8px;
}

.current-image, .image-preview {
  margin-top: 15px;
}

.current-image h4, .image-preview h4 {
  margin-bottom: 8px;
  color: #666;
  font-size: 14px;
}

.preview-image {
  max-width: 100%;
  max-height: 150px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.cancel-btn {
  padding: 10px 20px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
}

.cancel-btn:hover:not(:disabled) {
  background: #f5f5f5;
}

.cancel-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-btn {
  background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.error {
  color: #d32f2f;
  font-size: 12px;
  margin-top: 5px;
  font-weight: 500;
}

.char-counter {
  font-size: 11px;
  color: #666;
  margin-top: 4px;
  text-align: right;
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
  
  .pagination {
    flex-direction: column;
    gap: 15px;
  }
  
  .page-btn {
    min-width: 120px;
  }
  
  .modal {
    padding: 20px;
    width: 95%;
  }
  
  .form-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 24px;
  }
  
  .modal-title {
    font-size: 20px;
  }
  
  .cancel-btn, .submit-btn {
    padding: 8px 16px;
    font-size: 14px;
  }
}
</style>