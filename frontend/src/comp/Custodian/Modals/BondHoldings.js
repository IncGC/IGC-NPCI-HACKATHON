import { useEffect, useState } from 'react';
import useStore from '../../../store';

import { getBondholding } from '../../../apis/custodianApis';

import Loader from '../../Common/Loader';
import Modal from '../../UIComp/Modal';

function BondHoldings({ isOpen, data, closeModal }) {
  const role = useStore(state => state.role)

  const [isLoading, setIsLoading] = useState(true)
  const [list, setList] = useState([])

  useEffect(() => {
    const onSuccess = res => {
      setIsLoading(false)
      setList(res)
    }

    getBondholding({"mbeId": data.email}, onSuccess)
  }, [data.email])

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      contentCls="dfc max-h-[80vh] overflow-y-hidden"
      title={`Bond Holdings of ${role === "mbe" ? data.mbeId : data.email}`}
    >
      <div className='scroll-y'>
        {
          isLoading ? <Loader wrapperCls='h-[50vh]' /> :
            <table className='w-full'>
              <thead>
                <tr className="sticky top-0 text-sm font-medium bg-slate-100 shadow-[0_1px_3px_0_rgba(255,255,255,.1)] z-1">
                  <td className="w-36 px-4 py-2">ISIN</td>
                  <td className="w-60 px-4 py-2">Issuer Name</td>
                  <td className="w-32 px-4 py-2 text-center">Maturity Date</td>
                  <td className="w-32 px-4 py-2">Coupon Rate</td>
                  <td className="w-28 px-4 py-2">Face Value</td>
                  <td className="w-36 px-4 py-2">Purchase Price</td>
                  <td className="w-80 px-4 py-2">Current Price</td>
                </tr>
              </thead>

              <tbody>
                {
                  list.map(li => (
                    <tr
                      key={li.id}
                      className="even:bg-slate-50 hover:bg-slate-200 cursor-pointer group"
                    >
                      <td className="px-4 py-2 text-sm opacity-80 group-hover:opacity-100"> {li.isin} </td>
                      <td className="px-4 py-2 text-sm font-medium opacity-80 group-hover:opacity-100"> {li.issuerName} </td>
                      <td className="px-4 py-2 text-sm opacity-80 group-hover:opacity-100 text-center"> {li.maturitydate} </td>
                      <td className="px-4 py-2 text-sm opacity-80 group-hover:opacity-100"> {li.couponrate} </td>
                      <td className="px-4 py-2 text-sm opacity-80 group-hover:opacity-100"> {li.faceValue} </td>
                      <td className="px-4 py-2 text-sm opacity-80 group-hover:opacity-100"> {li.askPrice || 0} </td>
                      <td className="px-4 py-2 text-xs opacity-80 group-hover:opacity-100"> {li.bidPrice || 0} </td>
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

export default BondHoldings