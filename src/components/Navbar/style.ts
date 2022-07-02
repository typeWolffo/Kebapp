import { Cog } from '@styled-icons/boxicons-regular/Cog'
import { Home } from '@styled-icons/boxicons-regular/Home'
import { Menu } from '@styled-icons/boxicons-regular/Menu'
import { MessageSquareAdd } from '@styled-icons/boxicons-regular/MessageSquareAdd'
import tw from 'tailwind-styled-components'

export const SettingsIcon = tw(Cog)`
    text-primary
    p-2
    mb-3
    h-12
    w-12
    rounded-full
    border border-solid border-primary
`
export const AddIcon = tw(MessageSquareAdd)`
    text-primary
    p-2
    mb-3
    h-12
    w-12
    rounded-full
    border border-solid border-primary
`
export const HomeIcon = tw(Home)`
    text-primary
    p-2
    mb-3
    h-12
    w-12
    rounded-full
    border border-solid border-primary
`
export const MenuIcon = tw(Menu)`
    text-primary
    p-2
    h-12
    w-12
    z-20
    rounded-full
    border border-solid border-primary
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
