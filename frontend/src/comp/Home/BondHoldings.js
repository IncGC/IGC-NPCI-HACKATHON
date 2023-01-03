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
      setBondHoldings(payload)
      setLoading(false)
    }

    fetchTokenHoldings({ "MbeId": email }, onSuccess)
  }, [email])

  const updateOpen = id => setOpen(id)

  const closeModal = () => setOpen("")

  if (loading) return <Loader wrapperCls='h-[calc(100vh-64px)]' />

  return (
    <section className="dfc gap-0 h-[calc(100vh-64px)] overflow-y-hidden">
      <h1 className='py-2 text-2xl text-center border-b border-[rgba(255,255,255,.6)]'>
        My Bond Holdings
      </h1>

      <div className="scroll-y overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="sticky top-0 text-sm bg-slate-200 shadow-[0_1px_3px_0_rgba(0,0,0,.1)] z-1">
              <td className="w-36 px-4 py-2">ISIN</td>
              <td className="w-52 px-4 py-2">Issuer Name</td>
              <td className="w-32 px-4 py-2">Coupon Rate</td>
              <td className="w-72 px-4 py-2">Credit Rating</td>
              <td className="w-32 px-4 py-2 text-center">Maturity Date</td>
              <td className="w-28 px-4 py-2 text-center">Face Value</td>
              <td className="w-28 px-4 py-2 text-center">No. of Lots</td>
              {/* <td className="w-32 px-4 py-2 text-center">Purchase Price</td>
              <td className="w-28 px-4 py-2 text-center">Current Price</td> */}
              <td className="w-32 px-4 py-2"></td>
            </tr>
          </thead>

          <tbody>
            {
              bondHoldings
                .filter((a, i) => bondHoldings[i].MbeId === email && bondHoldings[i].LotQty !== "0")
                .map(li => (
                  <tr
                    key={li._id}
                    className="text-sm even:bg-slate-50 hover:bg-slate-100 cursor-pointer"
                    onClick={() => updateOpen(li.Isin)}
                  >
                    <td className="px-4 py-2"> {li.Isin} </td>
                    <td className="px-4 py-2 font-medium"> {li.IssuerName} </td>
                    <td className="px-4 py-2"> {li.CouponRate} </td>
                    <td className="px-4 py-2 text-xs"> {li.CreditRating} </td>
                    <td className="px-4 py-2 text-center"> {li.MaturityDate} </td>
                    <td className="px-4 py-2 text-center"> {"1000"} </td>
                    <td className="px-4 py-2 text-center"> {li.LotQty} </td>
                    {/* <td className="px-4 py-2 text-center"> {li.Ltp} </td>
                    <td className="px-4 py-2 text-center"> {li.CurrentPrice || "-"} </td> */}
                    <td className="px-4 py-2 text-center">
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