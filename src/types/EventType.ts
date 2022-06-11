import { UserType } from './UserType'
export interface EventDataType {
  id?: number
  location: string
  startAt?: string
  start_at?: string
}

export interface SingleEventDataType extends EventDataType {
  is_active?: boolean
  author?: UserType
  members: [
    {
      id: number
      event_id: number
      user: UserType
    }
  ]
  change_requests?: []
  updated_at: string
  created_at: string
}
