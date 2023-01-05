import { useEffect, useState } from 'react';
import useStore from '../../../store';

import { fetchTransactions } from '../../../apis/apis';

import { ReactComponent as Print } from '../../../assets/svg/files/print.svg';
import Loader from '../../Common/Loader';
import Modal from '../../UIComp/Modal';

function TransactionHistory({ isOpen, data, closeModal }) {
  const role = useStore(state => state.role)

  const [isLoading, setIsLoading] = useState(true)
  const [certData, setCertData] = useState({})
  const [list, setList] = useState([])

  useEffect(() => {
    const onSuccess = (payload) => {
      setList(payload)
      setIsLoading(false)
    }

    const email = data.MbeId

    fetchTransactions({ email }, onSuccess)
  }, [data.MbeId])

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      contentCls="dfc max-h-[80vh] overflow-y-hidden"
      title={`Order book of ${role === "mbe" ? data.MbeId : data.email}`}
    >
      <div className='scroll-y'>
        {
          isLoading ? <Loader wrapperCls='h-[50vh]' /> :
            <>
              {
                Object.keys(certData).length > 0 ?
                  <>
                    <div className='df justify-between mb-4 text-sm'>
                      <p>MBE Id: <span className='font-medium'>{data.MbeId}</span></p>
                      <p>Date: <span className='font-medium'>{Intl.DateTimeFormat('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(Date.parse(data?.createdAt))}</span></p>
                    </div>

                    <table className='w-full text-sm'>
                      <thead>
                        <tr className='bg-slate-100'>
                          <td className='px-4 py-2'>Transaction Id</td>
                          <td className='px-4 py-2'>Security Code</td>
                          <td className='w-60 px-4 py-2'>Issuer Name</td>
                          <td className='px-4 py-2'>Type of Transaction</td>
                          <td className='px-4 py-2'>Number of token</td>
                          <td className='px-4 py-2'>Amount</td>
                        </tr>
                      </thead>

                      <tbody>
                        <tr className='even:bg-slate-50'>
                          <td className='px-4 py-2'>{certData?.OrderId || certData?.BuyOrderId || certData?.SellOrderId || certData?._id || ""}</td>
                          <td className='px-4 py-2'>{certData?.Isin || ""}</td>
                          <td className='px-4 py-2'>{certData?.IssuerName || ""}</td>
                          <td className='px-4 py-2'>Trade</td>
                          <td className='px-4 py-2'>{certData?.NumOfToken || ""}</td>
                          <td className='px-4 py-2'>{Number(certData?.NumOfToken || 0) * Number(certData?.Price || 0)}</td>
                        </tr>
                      </tbody>
                    </table>

                    <button className='block bg-slate-300 ml-auto' onClick={() => setCertData({})}>Back</button>
                  </>
                  :
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
                        list.filter((a, i) => 'Price' in list[i])
                          .map(li => (
                          <tr
                            key={li._id}
                            className="text-sm even:bg-slate-50 hover:bg-slate-200 cursor-pointer group"
                          >
                            <td className="pl-8 pr-4 py-2"> {Intl.DateTimeFormat('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(Date.parse(li.createdAt))} </td>
                            <td className="px-4 py-2"> {li.Isin} </td>
                            <td className="px-4 py-2 font-medium"> {li.IssuerName} </td>
                            <td className="px-4 py-2">
                              {li.IsProcessed ? "Trade" : li.TransactionsType}
                            </td>
                            <td className="px-4 py-2"> {li.NumOfToken} </td>
                            <td className="px-4 py-2"> {Number(li.NumOfToken) * Number(li.Price)} </td>
                            <td className={`px-4 py-2 text-xs ${!li.IsProcessed ? "text-red-400" : "text-emerald-400"}`}>
                              {
                                li.IsProcessed ? "Success" : "Pending"
                              }
                            </td>
                            <td className='px-4 py-2 text-sm'>
                              {
                                li.IsProcessed &&
                                <Print
                                  className="mx-auto fill-slate-900"
                                  onClick={() => setCertData(li)}
                                />
                              }
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
              }
            </>
        }
      </div>
    </Modal>
  )
}

export default TransactionHistory