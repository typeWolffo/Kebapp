import { Dialog, Transition } from '@headlessui/react'
import { X } from '@styled-icons/boxicons-regular'
import { FC, Fragment } from 'react'
import { useSelector } from 'react-redux'

import CreateEvent from '../../pages/CreateEvent/CreateEvent'
import { closeModal } from '../../slices/modal'
import { RootState, useAppDispatch } from '../../store/store'

function Modal({ isOpen }: { isOpen: boolean }) {
  const dispatch = useAppDispatch()
  const { modalType } = useSelector((state: RootState) => state.modal.modalData)

  const modalComponents = {
    EventForm: CreateEvent,
  }

  const ModalContent: FC | null = modalComponents[modalType as keyof typeof modalComponents]

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => dispatch(closeModal())}>
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm" aria-hidden="true" />

        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full relative max-w-md flex justify-center flex-col transform overflow-hidden rounded-2xl bg-base-100 p-2 pt-12 text-left align-middle shadow-xl transition-all">
                <button type="button" className="text-primary w-8 h-8 absolute right-2 top-2" onClick={() => dispatch(closeModal())}>
                  <X />
                </button>
                {modalType && <ModalContent />}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
