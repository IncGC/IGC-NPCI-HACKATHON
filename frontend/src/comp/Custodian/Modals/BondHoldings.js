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

    getBondholding({ "MbeId": data.email }, onSuccess)
  }, [data.email])

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      contentCls="dfc max-h-[80vh] overflow-y-hidden"
      title={`Bond Holdings of ${role === "mbe" ? data.MbeId : data.email}`}
    >
      <div className='scroll-y'>
        {
          isLoading ? <Loader wrapperCls='h-[50vh]' /> :
            <table className='w-full'>
              <thead>
                <tr className="sticky top-0 text-sm font-medium bg-slate-100 shadow-[0_1px_3px_0_rgba(0,0,0,.1)] z-1">
                  <td className="w-36 px-4 py-2">ISIN</td>
                  <td className="w-60 px-4 py-2">Issuer Name</td>
                  <td className="w-32 px-4 py-2 text-center">Maturity Date</td>
                  <td className="w-32 px-4 py-2">Coupon Rate</td>
                  <td className="w-28 px-4 py-2">Face Value</td>
                  {/* <td className="w-36 px-4 py-2">Purchase Price</td>
                  <td className="w-80 px-4 py-2">Current Price</td> */}
                </tr>
              </thead>

              <tbody>
                {
                  list.map(li => (
                    <tr
                      key={li._id}
                      className="text-sm even:bg-slate-50 hover:bg-slate-200 cursor-pointer group"
                    >
                      <td className="px-4 py-2"> {li.Isin} </td>
                      <td className="px-4 py-2 font-medium"> {li.IssuerName} </td>
                      <td className="px-4 py-2 text-center"> {li.MaturityDate} </td>
                      <td className="px-4 py-2"> {li.CouponRate} </td>
                      <td className="px-4 py-2"> {li.FaceValue * 1000} </td>
                      {/* <td className="px-4 py-2"> {li.askPrice || 0} </td>
                      <td className="px-4 py-2 text-xs"> {li.bidPrice || 0} </td> */}
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