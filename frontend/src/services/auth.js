import axios from 'axios'

const API_URL = 'http://127.0.0.1:3000/auth'

export default {
  async register(userData) {
    try {
      console.log('Enviando dados para cadastro:', userData)
      
      const response = await axios.post(`${API_URL}/register`, {
        name: userData.name,
        email: userData.email,
        password: userData.password
      })
      
      console.log('Resposta do cadastro:', response.data)
      
      if (!response.data.token) {
        throw new Error('Token não recebido na resposta')
      }
      
      return response.data
    } catch (error) {
      console.error('Erro detalhado:', error.response || error) 
      
      const errorMessage = error.response?.data?.message || 
                         error.response?.statusText || 
                         'Erro ao conectar com o servidor'
      
      throw new Error(`Falha no cadastro: ${errorMessage}`)
    }
  }
}