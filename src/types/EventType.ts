export interface EventDataType {
  id?: number
  location: string
  startAt?: string
  start_at?: string
}

export interface SingleEventDataType extends EventDataType {
  is_active?: boolean
  author?: {
    id: number
    name: string
    email: string
  }
  members?: []
  change_requests?: []
  updated_at: string
  created_at: string
}
