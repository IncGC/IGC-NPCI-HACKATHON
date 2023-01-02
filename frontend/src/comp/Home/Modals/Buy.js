import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buyOrder } from '../../../apis/apis';
import useStore from '../../../store';

import Modal from '../../UIComp/Modal';
import Input from '../common/Input';
import { errorNotify, successNotify } from "../../../helper/toastifyHelp";

// If executed “Trade executed, Visit transaction history for more details
// If pending “Transaction pending, Visit transaction history for more details
// If wallet is not having enough money “You don’t have enough balance to make the payment, Add money to your wallet”
// Show Add Money (Button) (Lead to CBDC interface to add money into wallet)

function Buy({ isOpen, data, closeModal }) {
  const isLoggedIn = useStore(state => state.isLoggedIn)
  const email = useStore(state => state.email)
  const role = useStore(state => state.role)

  const [isTradeOpen, setIsTradeOpen] = useState(false)
  const navigate = useNavigate()

  // const [numberOfTokens, setNumberOfTokens] = useState(null)
  // const [bidPricePerToken, setBidPricePerToken] = useState(null)
  // const [total, setTotal] = useState(null)

  const [details, setDetails] = useState({
    "OrderId": "B_ORDER" + data.isin,
    "mbeId": email,
    "isin": data.isin
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
      console.log(details)
      buyOrder(details, onSuccess, onFailure)
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
            lable='Currency'
            value="Rupee"
          />

          <div className='grid-col-full'>
            <Input
              lable='Security Description'
              value={data.securitydescription}
              inputCls="w-full max-w-none"
              lableCls='w-auto'
            />
          </div>

          {
            role === "investor" ? <>
              <div>
                <label className='mb-1 font-medium' htmlFor="">Number of Tokens</label>
                <input type="text" onChange={onChange} name="NumOfToken" />
              </div>

              <div>
                <label className='mb-1 font-medium' htmlFor="">Bid Price (Per token)</label>
                <input type="text" onChange={onChange} name="Price" />
              </div>
            </> : <>
              <Input
                lable='Number of Tokens'
                value="500"
                lableCls='w-auto'
                inputCls='ml-2'
              />

              <div className='dc gap-8 grid-col-full'>
                <button
                  className='rounded-md text-white bg-slate-600 hover:bg-slate-700'
                  onClick={() => navigate(`/${role}/investors-list`, { state: data })}
                >
                  List of Investors
                </button>

                <button
                  className='rounded-md text-white bg-slate-600 hover:bg-slate-700'
                  onClick={() => navigate(`/${role}/transactions-hitory`, { state: data })}
                >
                  Transactions List
                </button>
              </div>
            </>
          }
        </div>

        {
          isTradeOpen &&
          <div className='grid grid-cols-3 gap-4 mb-4'>
            <div>
              <label className='mb-1 font-medium' htmlFor="">Quantity</label>
              <input type="text" value={details.NumOfToken} readOnly />
            </div>

            <div>
              <label className='mb-1 font-medium' htmlFor="">Price Per Token (LTP)</label>
              <input type="text" value={details.Price} readOnly />
            </div>

            <div>
              <label className='mb-1 font-medium' htmlFor="">Total</label>
              <input type="text" value={Number(details.NumOfToken) * Number(details.Price)} readOnly />
            </div>
          </div>
        }
      </div>

      {
        isTradeOpen &&
        <div className='mb-1 text-xs text-slate-700'>
          Click here to make payment from your CBDC wallet
        </div>
      }

      {
        role === "investor" && isLoggedIn &&
        <button
          className='block w-1/2 mx-auto rounded-md text-white bg-emerald-400 hover:bg-emerald-700'
          onClick={onClick}
        >
          {isTradeOpen ? "Execute Trade" : "Buy"}
        </button>
      }
    </Modal>
  )
}

export default Buy