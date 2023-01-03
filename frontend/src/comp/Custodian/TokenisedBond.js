import { useEffect, useState } from 'react';
import useStore from '../../store';

import { fetchNumOfDetokenizeToken } from '../../apis/apis';
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
    const onSuccess = async res => {
      const detokenizeTokensPromises = res.map(async current => {
        const innerRes = await fetchNumOfDetokenizeToken({ MbeId: current.MbeId, Isin: current.Isin })

        return {
          ...current,
          NumOfDetokenizeTokens: innerRes.status === 200 ? innerRes?.message || 0 : 0
        }
      })

      const final = await Promise.all(detokenizeTokensPromises)

      setData(final)
      setIsLoading(false)
    }

    getMarket(onSuccess)
  }, [])

  const updateOpen = (state, data = {}) => setOpen({ state, data })
  const closeModal = () => setOpen({ state: "", data: {} })

  if (isLoading) return <Loader wrapperCls='h-[calc(100vh-64px)]' />

  return (
    <section className="dfc gap-0 h-[calc(100vh-64px)] overflow-y-hidden">
      <h1 className='py-2 text-2xl text-center border-b border-[rgba(255,255,255,.6)]'>
        Tokenised Bonds
      </h1>

      <div className="scroll-y overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="sticky top-0 text-sm bg-slate-200 shadow-[0_1px_3px_0_rgba(0,0,0,.1)] z-1">
              <td className="w-36 px-4 py-2">ISIN</td>
              {
                role !== "mbe" &&
                <td className="w-52 px-4 py-2">Issuer Name</td>
              }
              <td className="w-32 px-4 py-2">Coupon Rate</td>
              <td className="w-32 px-4 py-2 text-center">Maturity Date</td>
              <td className="w-28 px-4 py-2 text-center">No. of Tokens</td>
              <td className="w-24 px-4 py-2">Ltp</td>
              <td className="w-28 px-4 py-2">Current Price</td>
              <td className="w-28 px-4 py-2 text-center">List of Investors</td>
              <td className="w-40 px-4 py-2 text-center">Number of tokens detokenized</td>
              {/* <td className="w-28 px-4 py-2 text-center">Detokenized Value</td> */}
            </tr>
          </thead>

          <tbody>
            {
              data.map(li => (
                <tr
                  key={li._id}
                  className="text-sm even:bg-slate-50 hover:bg-slate-100 cursor-pointer"
                >
                  <td className="px-4 py-2"> {li.Isin} </td>
                  {
                    role !== "mbe" &&
                    <td className="px-4 py-2 font-medium"> {li.IssuerName} </td>
                  }
                  <td className="px-4 py-2"> {li.CouponRate} </td>
                  <td className="px-4 py-2 text-center"> {li.MaturityDate} </td>
                  <td className="px-4 py-2 text-center"> {li.TotalTokenQty} </td>
                  <td className="px-4 py-2"> {li.Ltp} </td>
                  <td className="px-4 py-2"> {li.askPrice || 0} </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      className="w-16 rounded border border-emerald-600 hover:bg-emerald-600 hover:text-white"
                      onClick={() => updateOpen("InvestorsList", li)}
                    >
                      View
                    </button>
                  </td>
                  <td className="px-4 py-2 text-center">
                    {li.askPrice || 0}
                  </td>
                  {/* <td className="px-4 py-2 text-center">
                    {li.bidPrice || 0}
                  </td> */}
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
          title={open.data?.IssuerName || "SHRIRAM TRANSPORT"}
          updateOpen={updateOpen}
          closeModal={closeModal}
          needInvesterName={role !== "mbe"}
          Isin={open.data?.Isin}
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