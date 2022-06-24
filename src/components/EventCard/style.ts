import tw from 'tailwind-styled-components'

export const StyledEvent = tw.div`
    w-9/12
    p-5
    border border-solid ${({ $isDraft }: { $isDraft: boolean }) => ($isDraft ? 'border-secondary' : 'border-primary')}
    rounded-md mb-5
`
export const StyledHeader = tw.div`
    w-full
    text-xl
    flex
    justify-between
`

export const StyledIcon = tw.div`
    w-8
    h-8
`

export const StyledContent = tw.div`
    ${({ $isActive }: { $isActive: boolean }) => ($isActive ? 'h-fit' : 'h-0')}
    overflow-hidden
`

export const StyledParticipantsWrapper = tw.div`first-letter:
    mt-4
    px-1
    flex
`

export const StyledParticipant = tw.div`first-letter:
    border border-solid border-primary
    w-8
    h-8
    text-lg
    rounded-[100%]
    flex items-center justify-center
    -mx-1
`

export const StyledButton = tw.button`
    btn btn-outline btn-accent
    mt-4
    w-full
`
