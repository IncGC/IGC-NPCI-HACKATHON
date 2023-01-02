import { useEffect, useState } from 'react';
import useStore from '../../store';

import { getMarket } from '../../apis/custodianApis';

import InvestorsList from './Modals/InvestorsList';
import UserInfoModal from './Modals/UserInfo';
import Loader from '../Common/Loader';

function TokenisedBond() {
  const role = useStore(state => state.role)

  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState({ state: "", data: {} })
  const [data, setData] = useState([])

  useEffect(() => {
    const onSuccess = res => {
      setIsLoading(false)
      setData(res)
    }

    getMarket(onSuccess)
  }, [])

  const updateOpen = (state, data = {}) => setOpen({ state, data })
  const closeModal = () => setOpen({ state: "", data: {} })

  if (isLoading) return <Loader wrapperCls='h-[calc(100vh-64px)]' />

  return (
    <section className="dfc h-[calc(100vh-64px)] border-r border-[rgba(255,255,255,.3)] overflow-y-hidden">
      <h1 className='py-2 text-2xl text-center border-b border-[rgba(255,255,255,.6)]'>
        Tokenised Bonds
      </h1>

      <div className="scroll-y overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="sticky top-0 text-sm bg-slate-900 shadow-[0_1px_3px_0_rgba(255,255,255,.1)] z-1">
              <td className="w-36 px-4 py-2">ISIN</td>
              {
                role !== "mbe" &&
                <td className="w-52 px-4 py-2">Issuer Name</td>
              }
              <td className="w-32 px-4 py-2">Coupon Rate</td>
              <td className="w-32 px-4 py-2 text-center">Maturity Date</td>
              <td className="w-28 px-4 py-2 text-center">No. of Tokens</td>
              <td className="w-24 px-4 py-2">LTP</td>
              <td className="w-28 px-4 py-2">Current Price</td>
              <td className="w-28 px-4 py-2">List of Investors</td>
              <td className="w-40 px-4 py-2 text-center">Number of tokens detokenized</td>
              <td className="w-28 px-4 py-2 text-center">Detokenized Value</td>
            </tr>
          </thead>

          <tbody>
            {
              data.map(li => (
                <tr
                  key={li._id}
                  className="hover:bg-[rgba(255,255,255,.1)] cursor-pointer group"
                >
                  <td className="px-4 py-2 text-sm opacity-80 border-b border-[rgba(255,255,255,.3)] group-hover:opacity-100"> {li.isin} </td>
                  {
                    role !== "mbe" &&
                    <td className="px-4 py-2 text-sm font-medium opacity-80 border-b border-[rgba(255,255,255,.3)] group-hover:opacity-100"> {li.issuerName} </td>
                  }
                  <td className="px-4 py-2 text-sm opacity-80 border-b border-[rgba(255,255,255,.3)] group-hover:opacity-100"> {li.couponrate} </td>
                  <td className="px-4 py-2 text-sm opacity-80 border-b border-[rgba(255,255,255,.3)] group-hover:opacity-100 text-center"> {li.maturitydate} </td>
                  <td className="px-4 py-2 text-sm opacity-80 border-b border-[rgba(255,255,255,.3)] group-hover:opacity-100 text-center"> {li.TotalTokenQty} </td>
                  <td className="px-4 py-2 text-sm opacity-80 border-b border-[rgba(255,255,255,.3)] group-hover:opacity-100"> {li.ltp} </td>
                  <td className="px-4 py-2 text-sm opacity-80 border-b border-[rgba(255,255,255,.3)] group-hover:opacity-100"> {li.askPrice || 0} </td>
                  <td className="px-4 py-2 text-sm opacity-80 border-b border-[rgba(255,255,255,.3)] group-hover:opacity-100 text-center">
                    <button
                      className="w-16 rounded border border-emerald-600 hover:bg-emerald-600"
                      onClick={() => updateOpen("InvestorsList", li)}
                    >
                      View
                    </button>
                  </td>
                  <td className="px-4 py-2 text-sm opacity-80 border-b border-[rgba(255,255,255,.3)] group-hover:opacity-100 text-center">
                    {li.askPrice || 0}
                  </td>
                  <td className="px-4 py-2 text-sm opacity-80 border-b border-[rgba(255,255,255,.3)] group-hover:opacity-100 text-center">
                    {li.bidPrice || 0}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {
        open.state === "InvestorsList" &&
        <InvestorsList
          isOpen
          title={open.data?.issuerName || "SHRIRAM TRANSPORT"}
          updateOpen={updateOpen}
          closeModal={closeModal}
          needInvesterName={role !== "mbe"}
        />
      }

      {
        open.state === "UserInfo" &&
        <UserInfoModal
          isOpen
          data={open.data}
          closeModal={() => updateOpen("InvestorsList", open.data)}
        />
      }
    </section>
  )
}

export default TokenisedBond