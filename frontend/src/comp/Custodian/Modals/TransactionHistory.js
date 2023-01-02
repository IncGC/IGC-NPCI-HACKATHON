import { useEffect, useState } from 'react';
import useStore from '../../../store';

import { fetchSingleUserBuyTransactions, fetchSingleUserSellTransactions, getTransactions } from '../../../apis/custodianApis';
import getTypeClr from '../../../helper/getTypeClr';

import { ReactComponent as Print } from '../../../assets/svg/files/print.svg';
import Loader from '../../Common/Loader';
import Modal from '../../UIComp/Modal';

function TransactionHistory({ isOpen, data, closeModal }) {
  const role = useStore(state => state.role)

  const [isLoading, setIsLoading] = useState(true)
  const [list, setList] = useState([])

  useEffect(() => {
    const onSuccess1 = res => {
      if (res != null)
        setList(res)
    }

    const onSuccess2 = res => {
      if (res != null) {
        for (let i = 0; i < res.length; i++) {
          const entry = res[i]
          setList(p => ({
            ...p,
            entry
          }))
        }
      }
      setIsLoading(false)
    }

    fetchSingleUserBuyTransactions(data.email, onSuccess1)
    fetchSingleUserSellTransactions(data.email, onSuccess2)
  }, [data.email])

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      contentCls="dfc max-h-[80vh] overflow-y-hidden"
      title={`Transactions History of ${role === "mbe" ? data.mbeId : data.email}`}
    >
      <div className='scroll-y'>
        {
          isLoading ? <Loader wrapperCls='h-[50vh]' /> :
            <table className="w-full">
              <thead>
                <tr className="sticky top-0 text-sm font-medium bg-slate-100 shadow-[0_1px_3px_0_rgba(255,255,255,.1)] z-1">
                  <td className="pl-8 pr-4 py-2">Date</td>
                  <td className="px-4 py-2">ISIN</td>
                  <td className="px-4 py-2">Issuer Name</td>
                  <td className="px-4 py-2">TransactionType</td>
                  <td className="px-4 py-2">Number of Tokens</td>
                  <td className="px-4 py-2">Amount</td>
                  <td className="px-4 py-2">Status</td>
                  <td className="w-32 px-4 py-2 text-center">Certificate</td>
                </tr>
              </thead>

              <tbody>
                {
                  list.map((li, i) => (
                    <tr
                      key={li.id}
                      className="even:bg-slate-50 hover:bg-slate-200 cursor-pointer group"
                    >
                      <td className="pl-8 pr-4 py-2 text-sm opacity-80 group-hover:opacity-100"> {li.maturitydate} </td>
                      <td className="px-4 py-2 text-sm opacity-80 group-hover:opacity-100"> {li.isin} </td>
                      <td className="px-4 py-2 text-sm font-medium opacity-80 group-hover:opacity-100"> {li.issuerName} </td>
                      <td className={`px-4 py-2 text-sm opacity-80 group-hover:opacity-100 ${getTypeClr(li.transactionType)}`}> {li.transactionType} </td>
                      <td className="px-4 py-2 text-sm opacity-80 group-hover:opacity-100"> {li.TotalQtyRemaining / 100} </td>
                      <td className="px-4 py-2 text-sm opacity-80 group-hover:opacity-100"> {li.TotalQtyRemaining} </td>
                      <td className={`px-4 py-2 text-xs opacity-80 group-hover:opacity-100 ${i % 5 === 0 ? "text-red-400" : "text-emerald-400"}`}>
                        {
                          i % 5 === 0
                            ? "Failure"
                            : "Success"
                        }
                      </td>
                      <td className='px-4 py-2 text-sm'>
                        {
                          i % 5 !== 0 &&
                          <Print
                            className="mx-auto fill-slate-900 opacity-70 hover:opacity-100"
                          />
                        }
                      </td>
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

export default TransactionHistory