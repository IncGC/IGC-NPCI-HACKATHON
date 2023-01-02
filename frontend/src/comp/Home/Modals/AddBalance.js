import Modal from '../../UIComp/Modal';

function AddBalance({ isOpen, closeModal }) {
  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      contentCls="dfc w-[350px]"
      title='Add CDBC Wallet Balance'
    >
      <input
        type="text"
        placeholder='Amount'
      />

      <button className='mx-auto mt-4 px-12 rounded-md bg-emerald-400 text-white hover:bg-emerald-600'>
        Add money to CBDC wallet
      </button>
    </Modal>
  )
}

export default AddBalance