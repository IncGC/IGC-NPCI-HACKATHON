import { useEffect, useState } from 'react';
import useStore from '../../../store';

import { fetchSingleUserBuyTransactions, fetchSingleUserSellTransactions } from '../../../apis/custodianApis';
import getTypeClr from '../../../helper/getTypeClr';

import { ReactComponent as Print } from '../../../assets/svg/files/print.svg';
import Loader from '../../Common/Loader';
import Modal from '../../UIComp/Modal';
import { fetchTransactions } from '../../../apis/apis';

function TransactionHistory({ isOpen, data, closeModal }) {
  const role = useStore(state => state.role)

  const [isLoading, setIsLoading] = useState(true)
  const [list, setList] = useState([])

  useEffect(() => {
    const onSuccess = (payload) => {
      setList(payload)
      setIsLoading(false)
    }

    fetchTransactions({ "email": data.MbeId }, onSuccess)
  }, [data.email])

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      contentCls="dfc max-h-[80vh] overflow-y-hidden"
      title={`Transactions History of ${role === "mbe" ? data.MbeId : data.email}`}
    >
      <div className='scroll-y'>
        {
          isLoading ? <Loader wrapperCls='h-[50vh]' /> :
            <table className="w-full">
              <thead>
                <tr className="sticky top-0 text-sm font-medium bg-slate-100 shadow-[0_1px_3px_0_rgba(0,0,0,.1)] z-1">
                  <td className="pl-8 pr-4 py-2">Date</td>
                  <td className="px-4 py-2">ISIN</td>
                  <td className="px-4 py-2">Issuer Name</td>
                  <td className="px-4 py-2">TransactionsType</td>
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
                      key={li._id}
                      className="text-sm even:bg-slate-50 hover:bg-slate-200 cursor-pointer group"
                    >
                      <td className="pl-8 pr-4 py-2"> {Intl.DateTimeFormat('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(Date.parse(li.createdAt))} </td>
                      <td className="px-4 py-2"> {li.Isin} </td>
                      <td className="px-4 py-2 font-medium"> {li.IssuerName} </td>
                      <td className={`px-4 py-2 ${getTypeClr(li.TransactionsType)}`}> {li.TransactionsType} </td>
                      <td className="px-4 py-2"> {li.NumOfToken} </td>
                      <td className="px-4 py-2"> {Number(li.NumOfToken) * Number(li.Price)} </td>
                      <td className={`px-4 py-2 text-xs ${i % 5 === 0 ? "text-red-400" : "text-emerald-400"}`}>
                        {
                          li.IsProcessed ? "Success" : "Pending"
                        }
                      </td>
                      <td className='px-4 py-2 text-sm'>
                        {
                          li.IsProcessed ?
                            <Print
                              className="mx-auto fill-slate-900"
                            /> : ""}
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