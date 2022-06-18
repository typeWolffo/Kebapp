import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from './pages/Login/Login'
import KebappContext from './contexts/KebappContext'
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import Navbar from './components/Navbar/Navbar'
import Settings from './pages/Settings/Settings'
import { RootState } from './store/store'
import tw from 'tailwind-styled-components'
import Modal from './components/Modal/Modal'
import CreateEvent from './pages/CreateEvent/CreateEvent'

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
    <KebappContext>
      <BrowserRouter>
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
      </BrowserRouter>
    </KebappContext>
  )
}

export default App
