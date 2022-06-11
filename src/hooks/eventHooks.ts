import { useMutation, useQuery } from 'react-query'
import Api from '../services/api'

const api = new Api()

export function useEvent(eventId: number) {
  return useQuery(['event', eventId], () => api.getSingleEvent(eventId))
}

export function useJoinEvent() {
  return useMutation((eventId: number) => api.joinToEvent(eventId))
}
