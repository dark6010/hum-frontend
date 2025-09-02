import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFacebookF, faTwitter, faInstagram, faYoutube, faLinkedinIn, faTiktok } from '@fortawesome/free-brands-svg-icons'

// Esto es importante para evitar que se agreguen los estilos por defecto
config.autoAddCss = false

// Añade los iconos que necesites a la biblioteca
library.add(faFacebookF, faTwitter, faInstagram, faYoutube, faLinkedinIn, faTiktok)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})