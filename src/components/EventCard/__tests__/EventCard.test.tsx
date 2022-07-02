import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'

import { store } from '../../../store/store'
import EventCard from '../EventCard'

const mockedEvent = {
  id: 8,
  location: 'Alanya Kebab',
  start_at: new Date('2022-06-25 17:18:00'),
  created_at: '2022-06-18T15:19:04.000000Z',
  updated_at: '2022-06-18T15:19:04.000000Z',
  is_active: true,
  is_participating: true,
  author: {
    id: 3,
    name: 'wilk',
    email: 'jw@jw.com',
  },
  members: [
    {
      id: 2,
      event_id: 8,
      user: {
        id: 1,
        name: 'test',
        email: 'test@test.com',
      },
    },
    {
      id: 3,
      event_id: 8,
      user: {
        id: 2,
        name: 'xyz',
        email: 'xyz@xyz.com',
      },
    },
  ],
}

const mockedCurrentUser1 = {
  id: 3,
  name: 'wilk',
  email: 'jw@jw.com',
}
const mockedCurrentUser2 = {
  id: 4,
  name: 'test',
  email: 'testtest@jw.com',
}

describe('EventCard', () => {
  const queryClient = new QueryClient()
  const history = createMemoryHistory()

  it('should render', () => {
    const { container } = render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <QueryClientProvider client={queryClient}>
            <EventCard event={mockedEvent} currentUserStatus={'success'} currentUser={mockedCurrentUser1} />
          </QueryClientProvider>
        </Router>
      </Provider>
    )

    expect(container).toMatchSnapshot()
  })

  it('should render with date', () => {
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <QueryClientProvider client={queryClient}>
            <EventCard event={mockedEvent} currentUserStatus={'success'} currentUser={mockedCurrentUser1} />
          </QueryClientProvider>
        </Router>
      </Provider>
    )

    expect(screen.getByText('25.6.2022')).toBeInTheDocument()
  })

  it('should render with weekday', () => {
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <QueryClientProvider client={queryClient}>
            <EventCard event={mockedEvent} currentUserStatus={'success'} currentUser={mockedCurrentUser1} />
          </QueryClientProvider>
        </Router>
      </Provider>
    )

    expect(screen.getByText('Saturday')).toBeInTheDocument()
  })

  it('should render with join button', () => {
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <QueryClientProvider client={queryClient}>
            <EventCard event={mockedEvent} currentUserStatus={'success'} currentUser={mockedCurrentUser2} />
          </QueryClientProvider>
        </Router>
      </Provider>
    )

    expect(screen.getByRole('button', { name: 'Join' })).toBeInTheDocument()
  })

  it('should render with edit button', () => {
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <QueryClientProvider client={queryClient}>
            <EventCard event={mockedEvent} currentUserStatus={'success'} currentUser={mockedCurrentUser1} />
          </QueryClientProvider>
        </Router>
      </Provider>
    )

    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument()
  })

  it('should render with members', () => {
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <QueryClientProvider client={queryClient}>
            <EventCard event={mockedEvent} currentUserStatus={'success'} currentUser={mockedCurrentUser1} />
          </QueryClientProvider>
        </Router>
      </Provider>
    )

    expect(screen.getByText('w')).toBeInTheDocument()
    expect(screen.getByText('t')).toBeInTheDocument()
    expect(screen.getByText('x')).toBeInTheDocument()
  })
})
