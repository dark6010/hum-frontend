<template>
  <div class="container">
    <div class="card umss-card">
      <h2 class="title">
        <span class="icon">📰</span>
        Subir Nueva Noticia
      </h2>

      <form ref="form" @submit.prevent="submitNews" class="form">
        <div class="form-group">
          <label for="title">Título de la noticia</label>
          <input 
            id="title"
            v-model="title" 
            type="text" 
            required 
            class="input-field"
            :class="{ 'error-field': errors.title }"
            placeholder="Ingrese el título de la noticia"
            maxlength="100"
            @input="clearError('title')"
          >
          <div class="char-counter">{{ title.length }}/100 caracteres</div>
          <div v-if="errors.title" class="error">{{ errors.title }}</div>
        </div>

        <div class="form-group">
          <label for="excerpt">Resumen de la noticia</label>
          <textarea 
            id="excerpt"
            v-model="excerpt" 
            required 
            rows="3"
            class="input-field"
            :class="{ 'error-field': errors.excerpt }"
            placeholder="Escriba un resumen de la noticia"
            @input="clearError('excerpt')"
          ></textarea>
          <div v-if="errors.excerpt" class="error">{{ errors.excerpt }}</div>
        </div>

        <div class="form-group">
          <label for="content">Contenido completo</label>
          <textarea 
            id="content"
            v-model="content" 
            required 
            rows="6"
            class="input-field"
            :class="{ 'error-field': errors.content }"
            placeholder="Escriba el contenido completo de la noticia (mínimo 50 caracteres)"
            @input="clearError('content')"
          ></textarea>
          <div class="char-counter">{{ content.length }} caracteres (mínimo 50)</div>
          <div v-if="errors.content" class="error">{{ errors.content }}</div>
        </div>

        <div class="form-group">
          <label for="category">Categoría</label>
          <select 
            id="category"
            v-model="category" 
            required 
            class="input-field"
            :class="{ 'error-field': errors.category }"
            @change="clearError('category')"
          >
            <option value="" disabled selected>Seleccione una categoría</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
          <div v-if="errors.category" class="error">{{ errors.category }}</div>
        </div>

        <div class="form-group">
          <label for="image" class="file-label">
            <span class="file-icon">📷</span>
            Imagen de la noticia
          </label>
          <input 
            id="image"
            type="file" 
            accept="image/*" 
            @change="onFileChange"
            required 
            class="file-input"
            :class="{ 'error-field': errors.image }"
          >
          <div v-if="errors.image" class="error">{{ errors.image }}</div>
          
          <div v-if="imageUrl" class="image-preview">
            <img :src="imageUrl" alt="Vista previa" class="preview-image">
          </div>
        </div>

        <button 
          type="submit" 
          :disabled="loading" 
          class="submit-btn"
        >
          <span v-if="!loading">📤 Publicar Noticia</span>
          <span v-else>⏳ Publicando...</span>
        </button>
      </form>

      <div v-if="snackbar.show" :class="['snackbar', snackbar.color]">
        {{ snackbar.message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Estados reactivos
const title = ref('')
const excerpt = ref('')
const content = ref('')
const category = ref('')
const image = ref(null)
const imageUrl = ref('')
const loading = ref(false)
const form = ref(null)

// Categorías
const categories = [
  'Académico',
  'Investigación',
  'Eventos',
  'Cultura',
  'Deportes',
  'Internacional',
  'Nacional'
]

// Estados reactivos para errores y snackbar
const errors = reactive({
  title: '',
  excerpt: '',
  content: '',
  category: '',
  image: ''
})

const snackbar = reactive({
  show: false,
  message: '',
  color: 'success'
})

// Métodos
const onFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validar tamaño (máximo 2MB)
    if (file.size > 2 * 1024 * 1024) {
      errors.image = 'La imagen debe ser menor a 2 MB'
      image.value = null
      imageUrl.value = ''
      return
    }
    
    // Validar tipo de archivo
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!validImageTypes.includes(file.type)) {
      errors.image = 'Formato de imagen no válido. Use JPEG, PNG, GIF o WebP'
      image.value = null
      imageUrl.value = ''
      return
    }
    
    image.value = file
    errors.image = ''
    imageUrl.value = URL.createObjectURL(file)
  } else {
    image.value = null
    imageUrl.value = ''
  }
}

const clearError = (field) => {
  errors[field] = ''
}

const validateForm = () => {
  let isValid = true
  
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
  
  // Validar título (máximo 100 caracteres)
  if (!title.value.trim()) {
    errors.title = 'El título es requerido'
    isValid = false
  } else if (title.value.length > 100) {
    errors.title = 'El título no puede exceder los 100 caracteres'
    isValid = false
  }
  
  // Validar resumen
  if (!excerpt.value.trim()) {
    errors.excerpt = 'El resumen es requerido'
    isValid = false
  }
  
  // Validar contenido (mínimo 50 caracteres)
  if (!content.value.trim()) {
    errors.content = 'El contenido es requerido'
    isValid = false
  } else if (content.value.length < 50) {
    errors.content = 'El contenido debe tener al menos 50 caracteres'
    isValid = false
  }
  
  // Validar categoría
  if (!category.value) {
    errors.category = 'La categoría es requerida'
    isValid = false
  }
  
  // Validar imagen
  if (!image.value) {
    errors.image = 'La imagen es requerida'
    isValid = false
  }
  
  return isValid
}

const submitNews = async () => {
  if (!validateForm()) {
    return
  }
  
  loading.value = true
  
  try {
    const formData = new FormData()
    formData.append('title', title.value.trim())
    formData.append('excerpt', excerpt.value.trim())
    formData.append('content', content.value.trim())
    formData.append('category', category.value)
    formData.append('images', image.value)
    
    const response = await fetch('http://localhost:3001/api/news', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    })
    
    const responseData = await response.json()
    
    if (response.ok) {
      showSnackbar('Noticia publicada exitosamente', 'success')
      resetForm()
    } else {
      // Manejar errores de validación del backend
      if (responseData.errors) {
        // Si el backend devuelve errores de validación específicos
        Object.keys(responseData.errors).forEach(field => {
          if (errors.hasOwnProperty(field)) {
            errors[field] = responseData.errors[field]
          }
        })
        throw new Error('Errores de validación en el formulario')
      } else {
        throw new Error(responseData.message || 'Error al publicar la noticia')
      }
    }
  } catch (error) {
    console.error('Error:', error)
    if (!error.message.includes('validación')) {
      showSnackbar(error.message || 'Error al publicar la noticia', 'error')
    }
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  title.value = ''
  excerpt.value = ''
  content.value = ''
  category.value = ''
  image.value = null
  imageUrl.value = ''
  
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
  
  // Reset form file input
  if (form.value) {
    form.value.reset()
  }
}

const showSnackbar = (message, color) => {
  snackbar.message = message
  snackbar.color = color
  snackbar.show = true
  
  // Ocultar después de 3 segundos
  setTimeout(() => {
    snackbar.show = false
  }, 3000)
}
</script>

<style scoped>
.container {
  max-width: 800px;
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

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.input-field {
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
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
}

.file-icon {
  margin-right: 8px;
  font-size: 20px;
}

.file-input {
  margin-top: 8px;
}

.file-input.error-field {
  outline: 2px solid #d32f2f;
}

.image-preview {
  margin-top: 15px;
}

.preview-image {
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.submit-btn {
  background: linear-gradient(135deg, #0d47a1 0%, #1976d2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 15px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s;
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
  font-size: 14px;
  margin-top: 5px;
  font-weight: 500;
}

.char-counter {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
  text-align: right;
}

.snackbar {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  z-index: 1000;
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

@media (max-width: 600px) {
  .container {
    padding: 10px;
  }
  
  .umss-card {
    padding: 20px;
  }
  
  .title {
    font-size: 24px;
  }
  
  .input-field {
    padding: 10px 12px;
    font-size: 14px;
  }
}
</style>