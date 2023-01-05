import { useState } from 'react';
import useStore from "../../../store";

import { successNotify } from '../../../helper/toastifyHelp';
import { addWalletBalance } from '../../../apis/apis';

import Modal from '../../UIComp/Modal';

function AddBalance({ isOpen, closeModal, setCBDCBalance }) {
  const MbeId = useStore(state => state.email)
  // const [amount, setAmount] = useState({})
  const [details, setDetails] = useState({
    'email': MbeId
  })

  const onChange = e => {
    setDetails(p => ({
      ...p,
      [e.target.name]: e.target.value
    }))
  }

  const onSuccess = () => {
    setCBDCBalance(p => Number(p) + Number(details.amount))
    successNotify("Balance Added.")
    closeModal()
  }

  const onSubmit = () => {
    addWalletBalance(details, onSuccess)
  }

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
        name='amount'
        onChange={onChange}
      />

      <button className='mx-auto mt-4 px-12 rounded-md bg-emerald-400 text-white hover:bg-emerald-600' onClick={onSubmit}>
        Add money to CBDC wallet
      </button>
    </Modal>
  )
}

export default AddBalance