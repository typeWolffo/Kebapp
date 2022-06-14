import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AddIcon, HomeIcon, MenuIcon, SettingsIcon, StyledList } from './style'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="absolute bottom-3 right-3 h-auto">
      <StyledList $isOpen={isOpen}>
        <li>
          <Link to="create-event">
            <AddIcon />
          </Link>
        </li>
        <li>
          <Link to="/">
            <HomeIcon />
          </Link>
        </li>
        <li>
          <Link to="settings">
            <SettingsIcon />
          </Link>
        </li>
      </StyledList>
      <MenuIcon onClick={() => setIsOpen(!isOpen)} />
    </div>
  )
}

export default Navbar
