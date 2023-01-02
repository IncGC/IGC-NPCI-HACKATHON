import { useEffect, useState } from 'react';
import useStore from "../../store";

import { fetchTokenHoldings } from '../../apis/apis';

import Tokenise from './Modals/Tokenise';
import Loader from '../Common/Loader';

function BondHoldings() {
  const [open, setOpen] = useState("")
  const email = useStore(state => state.email)

  const [bondHoldings, setBondHoldings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const onSuccess = (payload) => {
      setBondHoldings(payload.message)
      setLoading(false)
    }

    fetchTokenHoldings({ "MbeId": email }, onSuccess)
  }, [email])

  const updateOpen = id => setOpen(id)

  const closeModal = () => setOpen("")

  if (loading) return <Loader wrapperCls='h-[calc(100vh-64px)]' />

  return (
    <section className="dfc h-[calc(100vh-64px)] border-r border-[rgba(255,255,255,.3)] overflow-y-hidden">
      <h1 className='py-2 text-2xl text-center border-b border-[rgba(255,255,255,.6)]'>
        My Bond Holdings
      </h1>

      <div className="scroll-y overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="sticky top-0 text-sm bg-slate-900 shadow-[0_1px_3px_0_rgba(255,255,255,.1)] z-1">
              <td className="w-36 px-4 py-2">Isin</td>
              <td className="w-52 px-4 py-2">Issuer Name</td>
              <td className="w-32 px-4 py-2">Coupon Rate</td>
              <td className="w-72 px-4 py-2">Credit Rating</td>
              <td className="w-32 px-4 py-2 text-center">Maturity Date</td>
              <td className="w-28 px-4 py-2 text-center">Face Value</td>
              <td className="w-28 px-4 py-2 text-center">No. of Lots</td>
              <td className="w-32 px-4 py-2 text-center">Purchase Price</td>
              <td className="w-28 px-4 py-2 text-center">Current Price</td>
              <td className="w-32 px-4 py-2"></td>
            </tr>
          </thead>

          <tbody>
            {
              bondHoldings
                // .filter((a, i) => bond[i].MbeId === email)
                .map(li => (
                  <tr
                    key={li._id}
                    className="hover:bg-[rgba(255,255,255,.1)] cursor-pointer group"
                    onClick={() => updateOpen(li.Isin)}
                  >
                    <td className="px-4 py-2 text-sm opacity-80 border-b border-[rgba(255,255,255,.3)] group-hover:opacity-100"> {li.Isin} </td>
                    <td className="px-4 py-2 text-sm font-medium opacity-80 border-b border-[rgba(255,255,255,.3)] group-hover:opacity-100"> {li.IssuerName} </td>
                    <td className="px-4 py-2 text-sm opacity-80 border-b border-[rgba(255,255,255,.3)] group-hover:opacity-100"> {li.CouponRate} </td>
                    <td className="px-4 py-2 text-xs opacity-80 border-b border-[rgba(255,255,255,.3)] group-hover:opacity-100"> {li.CreditRating} </td>
                    <td className="px-4 py-2 text-sm opacity-80 border-b border-[rgba(255,255,255,.3)] group-hover:opacity-100 text-center"> {li.MaturityDate} </td>
                    <td className="px-4 py-2 text-sm opacity-80 border-b border-[rgba(255,255,255,.3)] group-hover:opacity-100 text-center"> {li.FaceValue} </td>
                    <td className="px-4 py-2 text-sm opacity-80 border-b border-[rgba(255,255,255,.3)] group-hover:opacity-100 text-center"> {li.LotQty} </td>
                    <td className="px-4 py-2 text-sm opacity-80 border-b border-[rgba(255,255,255,.3)] group-hover:opacity-100 text-center"> {li.Ltp} </td>
                    <td className="px-4 py-2 text-sm opacity-80 border-b border-[rgba(255,255,255,.3)] group-hover:opacity-100 text-center"> {li.CurrentPrice || "-"} </td>
                    <td className="px-4 py-2 text-sm opacity-80 border-b border-[rgba(255,255,255,.3)] group-hover:opacity-100 text-center">
                      <button className='px-3 py-1.5 rounded border border-emerald-400 hover:bg-emerald-400'>
                        Tokenize
                      </button>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>

      {
        open &&
        <Tokenise
          isOpen
          data={bondHoldings.find(li => li.Isin === open)}
          closeModal={closeModal}
        />
      }
    </section>
  )
}

export default BondHoldings