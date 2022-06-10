import axios, { AxiosResponse } from 'axios'
import { EventDataType } from '../types/EventType'

class Api {
  instance

  constructor() {
    this.instance = axios.create({
      baseURL: 'https://kebapp.com.pl/api',
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
    this.instance.interceptors.response.use(this.handleSuccess)
  }

  handleSuccess(response: AxiosResponse) {
    return response
  }

  getCurrentUser() {
    return this.instance.post('/auth/me')
  }

  createEvent(event: EventDataType) {
    return this.instance.post('/events', event)
  }

  getSingleEvent(id: number) {
    return this.instance.get(`/events/${id}`)
  }

  getAllEvents() {
    return this.instance.get('/events')
  }
}

export default Api
