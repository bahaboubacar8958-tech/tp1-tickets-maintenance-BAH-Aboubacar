import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:3000' })

export async function getTickets() {
  try {
    const response = await api.get('/tickets')
    return response.data
  } catch (error) {
    throw new Error(
      'Impossible de charger les tickets. Vérifiez que JSON Server est démarré sur le port 3000.',
      { cause: error },
    )
  }
}