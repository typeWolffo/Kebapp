import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { FormModes, setFormMode } from '../../slices/form'
import { openModalWith } from '../../slices/modal'
import { AddIcon, HomeIcon, MenuIcon, SettingsIcon, StyledList } from './style'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()

  const handleAddEventClick = () => {
    setIsOpen(false)
    dispatch(openModalWith({ modalType: 'EventForm' }))
    dispatch(setFormMode(FormModes.CREATE))
  }

  return (
    <div className="absolute bottom-3 right-3 h-auto">
      <StyledList $isOpen={isOpen}>
        <li>
          <div onClick={handleAddEventClick}>
            <AddIcon />
          </div>
        </li>
        <li>
          <Link to="/" onClick={() => setIsOpen(false)}>
            <HomeIcon />
          </Link>
        </li>
        <li>
          <Link to="settings" onClick={() => setIsOpen(false)}>
            <SettingsIcon />
          </Link>
        </li>
      </StyledList>
      <MenuIcon onClick={() => setIsOpen(!isOpen)} />
    </div>
  )
}

export default Navbar
