import { Link } from 'react-router-dom'
import { Cog } from '@styled-icons/boxicons-regular/Cog'
import { MessageSquareAdd } from '@styled-icons/boxicons-regular/MessageSquareAdd'
import { Home } from '@styled-icons/boxicons-regular/Home'
import tw from 'tailwind-styled-components'

const SettingsIcon = tw(Cog)`
    text-secondary
    w-8
    h-8
`
const AddIcon = tw(MessageSquareAdd)`
    text-secondary
    w-8
    h-8
`
const HomeIcon = tw(Home)`
    text-secondary
    w-8
    h-8
`

function Navbar() {
  return (
    // <StyledNavbar>
    //   <Link to="create-event">
    //     <AddIcon />
    //   </Link>
    //   <Link to="/">
    //     <HomeIcon />
    //   </Link>
    //   <Link to="settings">
    //     <SettingsIcon />
    //   </Link>
    // </StyledNavbar>
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
