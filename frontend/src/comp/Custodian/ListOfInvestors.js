import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useStore from '../../store';

import { getInvestorLists } from '../../apis/custodianApis';
import { fetchCBDCBalance2 } from '../../apis/apis';

import { ReactComponent as Search } from '../../assets/svg/common/seach.svg';
import TransactionHistoryModal from './Modals/TransactionHistory';
import TokenHoldingsModal from './Modals/TokenHoldings';
import BondHoldingsModal from './Modals/BondHoldings';
import UserInfoModal from './Modals/UserInfo';
import Input from '../Home/common/Input';
import Loader from '../Common/Loader';

function ListOfInvestors() {
  const role = useStore(state => state.role)
  const { state: tokenDetails } = useLocation()

  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState("")
  const [open, setOpen] = useState({ state: "", data: {} })
  const [data, setData] = useState([])

  useEffect(() => {
    const onSuccess = async res => {
      const balanceArrPromises = res.map(async current => {
        const innerRes = await fetchCBDCBalance2({ MbeId: current.email })

        return {
          ...current,
          CDBCbalance: innerRes.status === 200 ? innerRes?.message?.CBDCbalance || 0 : 0
        }
      })

      const final = await Promise.all(balanceArrPromises)

      setData(final)
      setIsLoading(false)
    }

    getInvestorLists(onSuccess)
  }, [])

  const updateOpen = (state, data) => setOpen({ state, data })

  const closeModal = () => setOpen({ state: "", data: {} })

  if (isLoading) return <Loader wrapperCls='h-[calc(100vh-64px)]' />

  return (
    <section className="dfc gap-0 h-[calc(100vh-64px)] overflow-y-hidden">
      <div className='df gap-8 p-4 border-b border-[rgba(0,0,0,.1)]'>
        <div className='df p-2 bg-slate-100 rounded'>
          <Search className='w-4 h-4' />
          <input
            type="text"
            className='w-44 p-0 bg-inherit border-none leading-none'
            placeholder="Search by MBE ID or Name"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
        </div>

        {
          tokenDetails ?
            <>
              <Input
                lable='ISIN'
                value={tokenDetails.securityCode}
                inputCls="bg-slate-800 text-white border-none"
                lableCls='w-auto mb-0'
              />
              <Input
                lable='Issuer Name'
                value={tokenDetails.IssuerName}
                inputCls="bg-slate-800 text-white border-none"
                lableCls='w-auto mb-0'
              />
              <Input
                lable='No Of Token'
                value={tokenDetails.NumOfToken}
                inputCls="bg-slate-800 text-white border-none"
                lableCls='w-auto mb-0'
              />
            </>
            : <h1 className='mx-auto text-lg font-medium text-center'>
              List of Investors
            </h1>
        }
      </div>

      <div className="scroll-y overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="sticky top-0 text-sm bg-slate-200 shadow-[0_1px_3px_0_rgba(0,0,0,.1)] z-1">
              <td className="w-44 pl-8 pr-4 py-2">MBE Id</td>
              {
                role !== "mbe" &&
                <td className="w-52 px-4 py-2">Investor Name</td>
              }
              <td className="w-32 px-4 py-2 text-center">Bond holdings</td>
              <td className="w-32 px-4 py-2 text-center">Token holdings</td>
              <td className="w-28 px-4 py-2 text-center">Transactions List</td>
              <td className="w-24 px-4 py-2 text-center">CBDC Balance</td>
            </tr>
          </thead>

          <tbody>
            {
              data
                .filter(li => (li.email.toLowerCase().match(filter) || `${li.firstName} ${li.lastName}`.toLowerCase().match(filter)) && (li.email !== 'custodian@gmail.com' && li.email !== 'mbe@gmail.com' && li.email !== 'regulator@gmail.com'))
                .map(li => (
                  <tr
                    key={li._id}
                    className="text-sm even:bg-slate-50 hover:bg-slate-100 cursor-pointer"
                  >
                    <td className="pl-8 pr-4 py-2 break-words"> {li.email} </td>
                    {
                      role !== "mbe" &&
                      <td className="px-4 py-2 font-medium">
                        <p
                          onClick={() => updateOpen("UserInfo", li)}
                        >
                          {li.firstName} {li.lastName}
                        </p>
                      </td>
                    }
                    <td className="px-4 py-2">
                      <button
                        className="block w-16 mx-auto rounded border border-emerald-600 hover:bg-emerald-600 hover:text-white"
                        onClick={() => updateOpen("BondHoldings", li)}
                      >
                        View
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        className="block w-16 mx-auto rounded border border-emerald-600 hover:bg-emerald-600 hover:text-white"
                        onClick={() => updateOpen("TokenHoldings", li)}
                      >
                        View
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        className="block w-16 mx-auto rounded border border-emerald-600 hover:bg-emerald-600 hover:text-white"
                        onClick={() => updateOpen("TransactionHistory", li)}
                      >
                        View
                      </button>
                    </td>
                    <td className="px-4 py-2 text-center">
                      {li.CDBCbalance}
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>

      {
        open.state === "UserInfo" &&
        <UserInfoModal
          isOpen
          data={open.data}
          closeModal={closeModal}
        />
      }

      {
        open.state === "BondHoldings" &&
        <BondHoldingsModal
          isOpen
          data={open.data}
          closeModal={closeModal}
        />
      }

      {
        open.state === "TokenHoldings" &&
        <TokenHoldingsModal
          isOpen
          data={open.data}
          closeModal={closeModal}
        />
      }

      {
        open.state === "TransactionHistory" &&
        <TransactionHistoryModal
          isOpen
          data={open.data}
          closeModal={closeModal}
        />
      }
    </section>
  )
}

export default ListOfInvestors