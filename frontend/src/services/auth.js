import axios from 'axios'

const API_URL = 'http://127.0.0.1:3000/auth'

export default {
  async register(userData) {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        login: userData.login,
        senha: userData.senha
      })

      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.message ||
                           error.response?.statusText ||
                           'Erro ao conectar com o servidor'
      throw new Error(`Falha no cadastro: ${errorMessage}`)
    }
  },

  async login(userData) {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        login: userData.login,
        senha: userData.senha
      })
      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.message ||
                          error.response?.statusText ||
                          'Erro ao conectar com o servidor'
      throw new Error(`Falha no login: ${errorMessage}`)
    }
  }

}
