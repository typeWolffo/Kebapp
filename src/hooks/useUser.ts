import { useMutation } from 'react-query'
import Api from '../services/api'

export default function useUser() {
  const api = new Api()
  return useMutation('user', () => api.getCurrentUser())
}
