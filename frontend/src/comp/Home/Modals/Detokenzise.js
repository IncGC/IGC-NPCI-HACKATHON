import { useState } from 'react';
import useStore from "../../../store";

import { detokenzie } from '../../../apis/apis';

import Modal from '../../UIComp/Modal';
import Input from '../common/Input';
import { errorNotify, successNotify } from "../../../helper/toastifyHelp";

// If Detokenized “Detokenized , Visit transaction for more details”.
// If pending “Transaction pending, Visit transaction history for more details”.

function Detokenzise({ isOpen, data, closeModal }) {
  const [noOfLots, setNoOfLots] = useState(0)
  const email = useStore(state => state.email)
  const [details, setDetails] = useState({
    "isin": data.isin,
    "mbeId": email,
  })

  const onChange = e => {
    setDetails(p => ({
      ...p,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = () => {
    console.log(details)
    detokenzie(details, onSuccess, onFailure)
  }

  const onSuccess = (message) => {
    successNotify(message)
    closeModal()
  }

  const onFailure = (message) => {
    errorNotify(message)
  }

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      contentCls="dfc xs:min-w-[400px] max-h-[80vh]"
      title='Detokenize your bond'
    >
      <div className='scroll-y'>
        <div className='grid md:grid-cols-2 gap-4 mb-4'>
          <Input
            lable='ISIN'
            value={data.isin}
          />
          <Input
            lable='Issuer Name'
            value={data.issuerName}
          />
          <Input
            lable='Coupon Rate'
            value={data.couponrate}
          />
          <Input
            lable='LTP'
            value={data.ltp}
          />
          <Input
            lable='Maturity Date'
            value={data.maturitydate}
          />
          <Input
            lable='No. of lots'
            value={data.LotQty}
          />
          <Input
            lable='Currency'
            value="Rupee"
          />
          <Input
            lable='No. of tokens'
            value={data.TokenQtyRemaining}
          />

          <div className='grid-col-full'>
            <Input
              lable='Security Description'
              value={data.securitydescription}
              inputCls="w-full max-w-none"
              lableCls='w-auto'
            />
          </div>
        </div>

        <div className='grid grid-cols-3 gap-4 mb-4'>
          <div>
            <label className='mb-1 font-medium' htmlFor="">No. of lots</label>
            <input
              type="number"
              value={noOfLots || ""}
              name="LotNumber"
              onChange={e => {
                setNoOfLots(e.target.value || 0)
                setDetails(p => ({
                  ...p,
                  [e.target.name]: e.target.value
                }))
                setDetails(p => ({
                  ...p,
                  "tokenQty": e.target.value * 200000
                }))
              }}
              className="no-number-arrows"
            />
          </div>

          <div>
            <label className='mb-1 font-medium' htmlFor="">Number of Tokens</label>
            <input type="text" value={noOfLots * 200000 || ""} disabled onChange={() => { }} name="tokenQty" />
          </div>

          <div>
            <label className='mb-1 font-medium' htmlFor="">Current Price</label>
            <input type="text" defaultValue={data.ltp} disabled />
          </div>
        </div>
      </div>

      <button
        className='block w-1/2 mx-auto rounded-md text-white bg-red-400 hover:bg-red-700'
        onClick={onSubmit}
      >
        Detokenize
      </button>
    </Modal>
  )
}

export default Detokenzise