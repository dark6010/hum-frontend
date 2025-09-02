<template>
  <section class="contact-section py-16 bg-gray-50">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Encabezado -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-blue-800 mb-3">Contacto</h2>
        <p class="text-gray-600 max-w-3xl mx-auto">
          Comunícate con la Carrera de Ciencias de la Educación - UMSS
        </p>
      </div>

      <!-- <div class="grid md:grid-cols-2 gap-8"> -->
      <div class="grid md:grid-cols-1 gap-8">
        <!-- Información de contacto -->
        <div class="bg-white rounded-xl shadow-md p-12 md:p-24">
          <h3 class="text-xl font-semibold text-blue-800 mb-6 flex items-center">
            <Icon name="mdi:information" class="mr-2 text-blue-600" />
            Información de Contacto
          </h3>

          <!-- Tarjetas de contacto -->
          <div class="space-y-6">
            <!-- Dirección -->
            <div class="flex items-start">
              <div class="bg-blue-100 p-3 rounded-lg mr-4">
                <Icon name="mdi:map-marker" class="text-blue-600 text-xl" />
              </div>
              <div>
                <h4 class="font-medium text-gray-800 mb-1">Dirección</h4>
                <p class="text-gray-600">Edificio de Humanidades, 2do piso<br>
                Campus Central UMSS<br>
                Av. Oquendo y Jordán<br>
                Cochabamba, Bolivia</p>
                <a 
                  href="https://maps.app.goo.gl/..." 
                  target="_blank"
                  class="inline-flex items-center mt-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <Icon name="mdi:map" class="mr-1" />
                  Ver en mapa
                </a>
              </div>
            </div>

            <!-- Contacto general -->
            <div class="flex items-start">
              <div class="bg-blue-100 p-3 rounded-lg mr-4">
                <Icon name="mdi:phone" class="text-blue-600 text-xl" />
              </div>
              <div>
                <h4 class="font-medium text-gray-800 mb-1">Teléfonos</h4>
                <p class="text-gray-600">
                  <span class="font-medium">Secretaría:</span> +591 4 4234567 int. 123<br>
                  <span class="font-medium">Jefatura de Carrera:</span> +591 4 4234567 int. 124<br>
                  <span class="font-medium">Fax:</span> +591 4 4256789
                </p>
              </div>
            </div>

            <!-- Correos electrónicos -->
            <div class="flex items-start">
              <div class="bg-blue-100 p-3 rounded-lg mr-4">
                <Icon name="mdi:email" class="text-blue-600 text-xl" />
              </div>
              <div>
                <h4 class="font-medium text-gray-800 mb-1">Correos Electrónicos</h4>
                <ul class="space-y-1">
                  <li class="flex items-center">
                    <span class="text-blue-500 mr-2">•</span>
                    <a href="mailto:ciencias.educacion@umss.edu.bo" class="text-gray-600 hover:text-blue-600">
                      ciencias.educacion@umss.edu.bo
                    </a>
                  </li>
                  <li class="flex items-center">
                    <span class="text-blue-500 mr-2">•</span>
                    <a href="mailto:secretaria.educacion@umss.edu.bo" class="text-gray-600 hover:text-blue-600">
                      secretaria.educacion@umss.edu.bo
                    </a>
                  </li>
                  <li class="flex items-center">
                    <span class="text-blue-500 mr-2">•</span>
                    <a href="mailto:posgrado.educacion@umss.edu.bo" class="text-gray-600 hover:text-blue-600">
                      posgrado.educacion@umss.edu.bo
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Horario de atención -->
            <div class="flex items-start">
              <div class="bg-blue-100 p-3 rounded-lg mr-4">
                <Icon name="mdi:clock" class="text-blue-600 text-xl" />
              </div>
              <div>
                <h4 class="font-medium text-gray-800 mb-1">Horario de Atención</h4>
                <p class="text-gray-600">
                  <span class="font-medium">Lunes a Viernes:</span> 8:00 - 12:30 / 14:30 - 18:30<br>
                  <span class="font-medium">Sábados:</span> 9:00 - 12:00 (solo durante períodos académicos)
                </p>
              </div>
            </div>

            <!-- Redes sociales -->
            <!-- <div class="flex items-start">
              <div class="bg-blue-100 p-3 rounded-lg mr-4">
                <Icon name="mdi:share-variant" class="text-blue-600 text-xl" />
              </div>
              <div>
                <h4 class="font-medium text-gray-800 mb-2">Redes Sociales</h4>
                <div class="flex space-x-4">
                  <a 
                    v-for="social in socialMedia" 
                    :key="social.name"
                    :href="social.url" 
                    target="_blank"
                    class="bg-gray-100 hover:bg-blue-100 p-2 rounded-full transition"
                    :aria-label="social.name"
                  >
                    <Icon :name="social.icon" class="text-gray-700 hover:text-blue-600 text-xl" />
                  </a>
                </div>
              </div>
            </div> -->
          </div>
        </div>

        <!-- Formulario de contacto -->
        <!-- <div class="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h3 class="text-xl font-semibold text-blue-800 mb-6 flex items-center">
            <Icon name="mdi:email-edit" class="mr-2 text-blue-600" />
            Envíanos un mensaje
          </h3>

          <form @submit.prevent="submitForm" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico *</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
            </div>

            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Teléfono/Celular</label>
              <input
                type="tel"
                id="phone"
                v-model="form.phone"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
            </div>

            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Asunto *</label>
              <select
                id="subject"
                v-model="form.subject"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled selected>Seleccione un asunto</option>
                <option value="informacion">Información sobre la carrera</option>
                <option value="admision">Proceso de admisión</option>
                <option value="titulacion">Proceso de titulación</option>
                <option value="practicas">Prácticas preprofesionales</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Mensaje *</label>
              <textarea
                id="message"
                v-model="form.message"
                rows="4"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <div class="flex items-center">
              <input
                id="privacy"
                type="checkbox"
                v-model="form.privacy"
                required
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              >
              <label for="privacy" class="ml-2 block text-sm text-gray-700">
                Acepto la <a href="#" class="text-blue-600 hover:text-blue-800">política de privacidad</a> *
              </label>
            </div>

            <div>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="!isSubmitting">Enviar mensaje</span>
                <span v-else class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </span>
              </button>
            </div>
          </form>
        </div> -->
      </div>

      <!-- Mapa -->
      <div class="mt-12 bg-white rounded-xl shadow-md overflow-hidden">
        <div class="h-64 md:h-96 w-full">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.454286276685!2d-66.156123985622!3d-17.39372278807524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e373e0d9e5ab27%3A0xa2719ae9532c3e65!2sFacultad%20de%20Humanidades%20y%20Ciencias%20de%20la%20Educaci%C3%B3n%20UMSS!5e0!3m2!1ses!2sbo!4v1620000000000!5m2!1ses!2sbo" 
            width="100%" 
            height="100%" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy"
            class="rounded-xl"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const socialMedia = [
  { name: 'Facebook', icon: 'mdi:facebook', url: 'https://facebook.com/educacionumss' },
  { name: 'Twitter', icon: 'mdi:twitter', url: 'https://twitter.com/educacionumss' },
  { name: 'Instagram', icon: 'mdi:instagram', url: 'https://instagram.com/educacionumss' },
  { name: 'YouTube', icon: 'mdi:youtube', url: 'https://youtube.com/educacionumss' },
  { name: 'LinkedIn', icon: 'mdi:linkedin', url: 'https://linkedin.com/company/educacionumss' }
]

const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  privacy: false
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)

const submitForm = async () => {
  isSubmitting.value = true
  
  // Simulación de envío (reemplazar con llamada real a API)
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    submitSuccess.value = true
    
    // Reset form
    form.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      privacy: false
    }
    
    // Mostrar notificación de éxito
    alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.')
  } catch (error) {
    alert('Hubo un error al enviar el mensaje. Por favor inténtalo nuevamente.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.contact-section {
  scroll-margin-top: 2rem;
}

/* Estilos para el formulario */
input, select, textarea {
  transition: all 0.2s ease;
}

input:focus, select:focus, textarea:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}
</style>