import { useQuery } from 'react-query'
import Api from '../services/api'

export default function useEvent(eventId: number) {
  const api = new Api()
  return useQuery(['event', eventId], () => api.getSingleEvent(eventId))
}
