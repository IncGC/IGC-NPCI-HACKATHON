import { useEffect, useState } from 'react';
import useStore from '../../../store';

import { getTokenHoldings } from '../../../apis/custodianApis';

import Loader from '../../Common/Loader';
import Modal from '../../UIComp/Modal';

function TokenHoldings({ isOpen, data, closeModal }) {
  const role = useStore(state => state.role)

  const [isLoading, setIsLoading] = useState(true)
  const [list, setList] = useState([])

  useEffect(() => {
    const onSuccess = res => {
      setIsLoading(false)
      setList(res)
    }

    getTokenHoldings({ "MbeId": data.email }, onSuccess)
  }, [data.email])

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      contentCls="dfc max-h-[80vh] overflow-y-hidden"
      title={`Token Holdings of ${role === "mbe" ? data.MbeId : data.email}`}
    >
      <div className='scroll-y'>
        {
          isLoading ? <Loader wrapperCls='h-[50vh]' /> :
            <table>
              <thead>
                <tr className="sticky top-0 text-sm font-medium bg-slate-100 shadow-[0_1px_3px_0_rgba(0,0,0,.1)] z-1">
                  <td className="w-36 px-4 py-2">ISIN</td>
                  <td className="w-60 px-4 py-2">Issuer Name</td>
                  <td className="w-32 px-4 py-2 text-center">Maturity Date</td>
                  <td className="w-32 px-4 py-2">Coupon Rate</td>
                  <td className="w-28 px-4 py-2">Face Value</td>
                  {/* <td className="w-24 px-4 py-2">Purchase Price</td> */}
                  <td className="w-32 px-4 py-2">Number of tokens</td>
                  <td className="w-24 px-4 py-2">Ltp</td>
                  <td className="w-28 px-4 py-2">Current Price</td>
                </tr>
              </thead>

              <tbody>
                {
                  list
                    .filter((a, i) => list[i].IsTokenized === true)
                    .map(li => (
                      <tr
                        key={li._id}
                        className="text-sm even:bg-slate-50 hover:bg-slate-200 cursor-pointer"
                      >
                        <td className="px-4 py-2"> {li.Isin} </td>
                        <td className="px-4 py-2 font-medium"> {li.IssuerName} </td>
                        <td className="px-4 py-2 text-center"> {li.MaturityDate} </td>
                        <td className="px-4 py-2"> {li.CouponRate} </td>
                        <td className="px-4 py-2"> {li.FaceValue} </td>
                        {/* <td className="px-4 py-2"> {li.askPrice || 0}</td> */}
                        <td className="px-4 py-2 text-xs"> {li.TokenQtyRemaining} </td>
                        <td className="px-4 py-2 text-xs"> {li.Ltp} </td>
                        <td className="px-4 py-2 text-xs"> {Math.floor(li.Ltp * li.TokenQtyRemaining)} </td>
                      </tr>
                    ))
                }
              </tbody>
            </table>
        }
      </div>
    </Modal>
  )
}

export default TokenHoldings