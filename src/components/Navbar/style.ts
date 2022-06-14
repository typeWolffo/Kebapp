import { Cog } from '@styled-icons/boxicons-regular/Cog'
import { Home } from '@styled-icons/boxicons-regular/Home'
import { MessageSquareAdd } from '@styled-icons/boxicons-regular/MessageSquareAdd'
import { Menu } from '@styled-icons/boxicons-regular/Menu'
import tw from 'tailwind-styled-components'

export const SettingsIcon = tw(Cog)`
    text-secondary
    p-1.5
    mb-3
    h-12
    w-12
    rounded-box
    border border-solid border-secondary
`
export const AddIcon = tw(MessageSquareAdd)`
    text-secondary
    p-1.5
    mb-3
    h-12
    w-12
    rounded-box
    border border-solid border-secondary
`
export const HomeIcon = tw(Home)`
    text-secondary
    p-1.5
    mb-3
    h-12
    w-12
    rounded-box
    border border-solid border-secondary
`
export const MenuIcon = tw(Menu)`
    text-secondary
    p-1.5
    h-12
    w-12
    z-20
    rounded-box
    border border-solid border-secondary
    shadow-gray-900
    shadow-lg
`
export const StyledList = tw.ul`
    z-20
    bg-base-100  
    transform 
    ${({ $isOpen }: { $isOpen: boolean }) => ($isOpen ? 'h-48' : 'h-0')}
    transition-height ease-in-out duration-300
    overflow-hidden
`
