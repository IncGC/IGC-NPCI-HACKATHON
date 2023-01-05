import { useState } from 'react';
import useStore from "../../../store";

import { sellOrder } from '../../../apis/apis';

import Modal from '../../UIComp/Modal';
import Input from '../common/Input';
import { errorNotify, successNotify } from "../../../helper/toastifyHelp";

// If executed “Trade executed, Visit transaction history for more details”.
// If pending “Transaction pending, Visit transaction history for more details

function Sell({ isOpen, data, closeModal }) {
  const email = useStore(state => state.email)

  const [isTradeOpen, setIsTradeOpen] = useState(false)

  // const [numberOfTokens, setNumberOfTokens] = useState(null)
  // const [sellPricePerToken, setSellPricePerToken] = useState(null)
  // const [total, setTotal] = useState(null)

  const [details, setDetails] = useState({
    "OrderId": "S_ORDER" + data.Isin,
    "MbeId": email,
    "Isin": data.Isin,
    "IssuerName": data.IssuerName
  })

  const onChange = e => {
    setDetails(p => ({
      ...p,
      [e.target.name]: e.target.value
    }))
  }

  const onClick = () => {
    if (!isTradeOpen) return setIsTradeOpen(true)
    else {
      sellOrder(details, onSuccess, onFailure)
    }
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
      title='Bond Details'
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
            lable='Currency'
            value="Rupee"
          />
          <Input
            lable='Total Number of Tokens'
            value={data.TokenQtyRemaining}
            lableCls="w-auto"
            wrapperCls='grid-col-full'
          />

          <div>
            <label className='mb-1 font-medium' htmlFor="">Number of Tokens</label>
            <input type="text" onChange={onChange} name="NumOfToken" />
          </div>

          <div>
            <label className='mb-1 font-medium' htmlFor="">Ask Price (per token)</label>
            <input type="text" onChange={onChange} name="Price" />
          </div>
        </div>

        {
          isTradeOpen &&
          <div className='grid grid-cols-3 gap-4 mb-4'>
            <div>
              <label className='mb-1 font-medium' htmlFor="">Quantity</label>
              <input type="text" value={details.NumOfToken} readOnly />
            </div>

            <div>
              <label className='mb-1 font-medium' htmlFor="">Price Per Token (Ltp)</label>
              <input type="text" value={details.Price} readOnly />
            </div>

            <div>
              <label className='mb-1 font-medium' htmlFor="">Total</label>
              <input type="text" value={Math.round(Number(details.NumOfToken) * Number(details.Price))} readOnly />
            </div>
          </div>
        }
      </div>

      <button
        className='block w-1/2 mx-auto rounded-md text-white bg-emerald-400 hover:bg-emerald-700'
        onClick={onClick}
      >
        {isTradeOpen ? "Place Order" : "Sell"}
      </button>
    </Modal>
  )
}

export default Sell