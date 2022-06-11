import { Link } from 'react-router-dom'
import { AddIcon, HomeIcon, SettingsIcon } from './style'

function Navbar() {
  return (
    <ul className="menu menu-horizontal bg-base-100 rounded-box bottom-3 absolute left-1/2 transform -translate-x-1/2 shadow-2xl">
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
    </ul>
  )
}

export default Navbar
