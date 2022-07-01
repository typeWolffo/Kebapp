import axios, { AxiosResponse } from 'axios'
import { EventDataType, ManageEventType } from '../types/EventType'

class Api {
  instance

  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api.kebapp.com.pl',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
    this.instance.interceptors.response.use(this.handleSuccess)
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token')
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
          config.headers['Content-Type'] = 'application/json'
          return config
        }
      },
      (error) => {
        Promise.reject(error)
      }
    )
  }

  handleSuccess(response: AxiosResponse) {
    return response
  }

  async getCurrentUser() {
    const response = await this.instance.post('/auth/me')
    return response.data
  }

  createEvent(event: EventDataType) {
    return this.instance.post('/events', event)
  }

  updateEvent(eventId: number, event: ManageEventType) {
    return this.instance.put(`/events/${eventId}`, event)
  }

  getSingleEvent(id: number) {
    return this.instance.get(`/events/${id}`).then((response) => response.data.data.event)
  }

  getAllEvents() {
    return this.instance.get('/events')
  }

  joinToEvent(id: number) {
    return this.instance.post(`/events/${id}/members`)
  }
}

export default Api
