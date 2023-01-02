import Modal from '../../UIComp/Modal';
import investorList from '../../../constants/investorList';
import { useEffect, useState } from 'react';
import useStore from '../../../store';
import Loader from '../../Common/Loader';
import { getInvestorLists } from '../../../apis/custodianApis';

function InvestorsList({ isOpen, title = "", needInvesterName = true, updateOpen, closeModal }) {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(true)

  useEffect(() => {
    const onSuccess = res => {
      setIsLoading(false)
      setData(res)
    }

    getInvestorLists(onSuccess)
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
            <tr className="sticky top-0 text-sm font-medium bg-slate-100 shadow-[0_1px_3px_0_rgba(255,255,255,.1)] z-1">
              <td className="w-36 px-4 py-2">MBE Id</td>
              {
                needInvesterName &&
                <td className="w-52 px-4 py-2">Investor Name</td>
              }
              <td className="w-32 px-4 py-2 text-center">No. of tokens</td>
              <td className="w-32 px-4 py-2 text-center">Amount</td>
            </tr>
          </thead>

          <tbody>
            {
              data
                .map(li => (
                  <tr
                    key={li._id}
                    className="even:bg-slate-50 hover:bg-slate-200 cursor-pointer group"
                  >
                    <td className="px-4 py-2 text-sm opacity-80 group-hover:opacity-100"> {li.email} </td>
                    {
                      needInvesterName &&
                      <td className="px-4 py-2 text-sm font-medium opacity-80 group-hover:opacity-100">
                        <button
                          className='p-0 hover:scale-105 transition-transform'
                          onClick={() => updateOpen("UserInfo", { ...li, issuerName: title })}
                        >
                          {li.firstName}
                        </button>
                      </td>
                    }
                    <td className="px-4 py-2 text-sm opacity-80 group-hover:opacity-100 text-center"> {li.TotalQtyRemaining || 0} </td>
                    <td className="px-4 py-2 text-sm opacity-80 group-hover:opacity-100 text-center"> {li.currentValue || "0"} </td>
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