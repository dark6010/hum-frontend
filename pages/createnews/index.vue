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
            placeholder="Ingrese el título de la noticia"
          >
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
            placeholder="Escriba un resumen de la noticia"
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
            placeholder="Escriba el contenido completo de la noticia"
          ></textarea>
          <div v-if="errors.content" class="error">{{ errors.content }}</div>
        </div>

        <div class="form-group">
          <label for="category">Categoría</label>
          <select 
            id="category"
            v-model="category" 
            required 
            class="input-field"
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

<script>
export default {
  data() {
    return {
      title: '',
      excerpt: '',
      content: '',
      category: '',
      image: null,
      imageUrl: '',
      loading: false,
      categories: [
        'Académico',
        'Investigación',
        'Eventos',
        'Cultura',
        'Deportes',
        'Internacional',
        'Nacional'
      ],
      errors: {
        title: '',
        excerpt: '',
        content: '',
        category: '',
        image: ''
      },
      snackbar: {
        show: false,
        message: '',
        color: 'success'
      }
    }
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        // Validar tamaño (máximo 2MB)
        if (file.size > 2 * 1024 * 1024) {
          this.errors.image = 'La imagen debe ser menor a 2 MB';
          this.image = null;
          this.imageUrl = '';
          return;
        }
        
        this.image = file;
        this.errors.image = '';
        this.imageUrl = URL.createObjectURL(file);
      } else {
        this.image = null;
        this.imageUrl = '';
      }
    },
    validateForm() {
      let isValid = true;
      
      // Reset errors
      this.errors = {
        title: '',
        excerpt: '',
        content: '',
        category: '',
        image: ''
      };
      
      // Validar título
      if (!this.title) {
        this.errors.title = 'El título es requerido';
        isValid = false;
      } else if (this.title.length < 10) {
        this.errors.title = 'El título debe tener al menos 10 caracteres';
        isValid = false;
      }
      
      // Validar resumen
      if (!this.excerpt) {
        this.errors.excerpt = 'El resumen es requerido';
        isValid = false;
      } else if (this.excerpt.length < 50) {
        this.errors.excerpt = 'El resumen debe tener al menos 50 caracteres';
        isValid = false;
      }
      
      // Validar contenido
      if (!this.content) {
        this.errors.content = 'El contenido es requerido';
        isValid = false;
      } else if (this.content.length < 100) {
        this.errors.content = 'El contenido debe tener al menos 100 caracteres';
        isValid = false;
      }
      
      // Validar categoría
      if (!this.category) {
        this.errors.category = 'La categoría es requerida';
        isValid = false;
      }
      
      // Validar imagen
      if (!this.image) {
        this.errors.image = 'La imagen es requerida';
        isValid = false;
      }
      
      return isValid;
    },
    async submitNews() {
      if (!this.validateForm()) {
        return;
      }
      
      this.loading = true;
      
      try {
        const formData = new FormData();
        formData.append('title', this.title);
        formData.append('excerpt', this.excerpt);
        formData.append('content', this.content);
        formData.append('category', this.category);
        formData.append('images', this.image);
        console.log(222)
        const response = await fetch('http://localhost:3001/api/news', {
          method: 'POST',
          body: formData,
          credentials: 'include'
        });
        
        if (response.ok) {
          this.showSnackbar('Noticia publicada exitosamente', 'success');
          this.resetForm();
        } else {
          throw new Error('Error al publicar la noticia');
        }
      } catch (error) {
        console.error('Error:', error);
        this.showSnackbar('Error al publicar la noticia', 'error');
      } finally {
        this.loading = false;
      }
    },
    resetForm() {
      this.title = '';
      this.excerpt = '';
      this.content = '';
      this.category = '';
      this.image = null;
      this.imageUrl = '';
      this.errors = {
        title: '',
        excerpt: '',
        content: '',
        category: '',
        image: ''
      };
    },
    showSnackbar(message, color) {
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.show = true;
      
      // Ocultar después de 3 segundos
      setTimeout(() => {
        this.snackbar.show = false;
      }, 3000);
    }
  }
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
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error {
  color: #d32f2f;
  font-size: 14px;
  margin-top: 5px;
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
}

.snackbar.success {
  background-color: #4caf50;
}

.snackbar.error {
  background-color: #f44336;
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
}
</style>