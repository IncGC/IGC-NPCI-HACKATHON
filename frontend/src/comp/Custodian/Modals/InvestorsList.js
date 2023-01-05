import { useEffect, useState } from 'react';

import { fetchBondInvestors } from '../../../apis/apis';
import Loader from '../../Common/Loader';
import Modal from '../../UIComp/Modal';

function InvestorsList({ isOpen, title = "", needInvesterName = true, updateOpen, closeModal, Isin }) {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(true)

  useEffect(() => {
    const onSuccess = res => {
      const resp = res
      for (let i = 0; i < res.length; i++) {
        resp[i].TotalTokenQty = Number(res[i].TotalTokenQty) + (Number(resp[i].TotalTokenQty) ? Number(resp[i].TotalTokenQty) : 0)
      }
      setData(resp)
      setIsLoading(false)
    }

    fetchBondInvestors(onSuccess)
  }, [])

  if (isLoading) return <Loader wrapperCls='h-[calc(100vh-64px)]' />

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      contentCls="dfc max-h-[80vh] overflow-y-hidden"
      title={`Investor List of ${title}`}
    >
      <div className='scroll-y'>
        <table className='w-full'>
          <thead>
            <tr className="sticky top-0 text-sm font-medium bg-slate-100 shadow-[0_1px_3px_0_rgba(0,0,0,.1)] z-1">
              {/* <td className="w-36 px-4 py-2">MBE Id</td> */}
              {
                // needInvesterName &&
                <td className="w-52 px-4 py-2">MBE Id</td>
              }
              <td className="w-32 px-4 py-2 text-center">No. of tokens</td>
              {/* <td className="w-32 px-4 py-2 text-center">Amount</td> */}
            </tr>
          </thead>

          <tbody>
            {
              data
                .filter((a, i) => (data[i].Isin === Isin && (data[i].TotalTokenQty !== 0 || data[i].TotalTokenQty !== "0")))
                .map(li => (
                  <tr
                    key={li._id}
                    className="text-sm even:bg-slate-50 hover:bg-slate-200 cursor-pointer group"
                  >
                    {/* <td className="px-4 py-2"> {li.email} </td> */}
                    {
                      // needInvesterName &&
                      <td className="px-4 py-2 font-medium">
                        <button
                          className='p-0 hover:scale-105 transition-transform'
                          onClick={() => updateOpen("UserInfo", { ...li, IssuerName: title })}
                        >
                          {li.MbeId}
                        </button>
                      </td>
                    }
                    <td className="px-4 py-2 text-center"> {li.TotalTokenQty || 0} </td>
                    {/* <td className="px-4 py-2 text-center"> {li.currentValue || "0"} </td> */}
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </Modal>
  )
}

export default InvestorsList