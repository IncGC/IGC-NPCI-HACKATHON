import { Fragment } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { ReactComponent as Close } from '../../assets/svg/actions/close.svg';

function Modal({
  isOpen = true, closeModal = () => { }, children,
  overlayCls = '', contentCls = '', title = "",
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog className="modal-wrapper" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={`modal-overlay ${overlayCls}`} />
        </Transition.Child>

        <div className="fixed inset-0">
          <div className="dc h-full p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={`modal-content ${contentCls}`}>
                {
                  title &&
                  <>
                    <div className='df mb-4'>
                      <h1 className='df text-xl font-bold'>
                        {title}
                      </h1>

                      <Close
                        className='w-8 h-8 shrink-0 ml-auto'
                        onClick={closeModal}
                      />
                    </div>
                  </>
                }
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal