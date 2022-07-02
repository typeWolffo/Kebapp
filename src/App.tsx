import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import tw from 'tailwind-styled-components'

import Modal from './components/Modal/Modal'
import Navbar from './components/Navbar/Navbar'
import KebappContext from './contexts/KebappContext'
import CreateEvent from './pages/CreateEvent/CreateEvent'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Settings from './pages/Settings/Settings'
import { RootState } from './store/store'

const AppWrapper = tw.div`
max-h-screen
h-screen
w-screen
overflow-hidden
`

function App() {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth)
  const { isModalOpen } = useSelector((state: RootState) => state.modal)

  return (
    <BrowserRouter>
      <KebappContext>
        {isLoggedIn ? (
          <AppWrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/:id/edit" element={<CreateEvent />} />
            </Routes>
            <Navbar />
            <Modal isOpen={isModalOpen} />
          </AppWrapper>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
        )}
      </KebappContext>
    </BrowserRouter>
  )
}

export default App
