import { useState } from 'react';
import { errorNotify, successNotify } from "../../../helper/toastifyHelp";
import { tokenize } from '../../../apis/apis';
import Modal from '../../UIComp/Modal';
import Input from '../common/Input';

// If Tokenized “Tokenized , Visit transaction history & My token holdings for more details”.
// If pending “Transaction pending, Visit transaction history for more details”.

function Tokenise({ isOpen, data, closeModal }) {
  const [noOfLots, setNoOfLots] = useState(0)
  const [details, setDetails] = useState({
    "Isin": data.Isin,
    "MbeId": data.MbeId,
  })

  // const onChange = e => {
  //   setDetails(p => ({
  //     ...p,
  //     [e.target.name]: e.target.value
  //   }))
  // }

  const onSubmit = () => {
    console.log(details)
    tokenize(details, onSuccess, onFailure)
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
      title='Tokenize your bond'
    >
      <div className='scroll-y'>
        <div className='grid md:grid-cols-2 gap-4 mb-4'>
          <Input
            lable='ISIN'
            value={data.Isin}
          />
          <Input
            lable='Issuer Name'
            value={data.IssuerName}
          />
          <Input
            lable='Coupon Rate'
            value={data.CouponRate}
          />
          <Input
            lable='Ltp'
            value={data.Ltp}
          />
          <Input
            lable='Maturity Date'
            value={data.MaturityDate}
          />
          <Input
            lable='No. of lots'
            value={data.LotQty}
          />
          <Input
            lable='Currency'
            value="Rupee"
          />

          <div className='grid-col-full'>
            <Input
              lable='Security Description'
              value={data.SecurityDescription}
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
                  "TotalTokenQty": (e.target.value * 200000).toString()
                }))
              }}
              className="no-number-arrows"
            />
          </div>

          <div>
            <label className='mb-1 font-medium' htmlFor="">Number of Tokens</label>
            <input type="text" value={noOfLots * 200000 || ""} disabled onChange={() => { }} name="TotalTokenQty" />
          </div>

          <div>
            <label className='mb-1 font-medium' htmlFor="">Face value</label>
            <input type="text" defaultValue="1" disabled />
          </div>
        </div>
      </div>

      <button
        className='block w-1/2 mx-auto rounded-md text-white bg-emerald-400 hover:bg-emerald-700'
        onClick={onSubmit}
      >
        Tokenize
      </button>
    </Modal>
  )
}

export default Tokenise