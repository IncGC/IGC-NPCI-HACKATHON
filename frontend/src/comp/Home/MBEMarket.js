import { useEffect, useState } from 'react';
// import useStore from '../../store';

import { fetchMbeMarket } from '../../apis/apis';

import { ReactComponent as Search } from '../../assets/svg/common/seach.svg';
import Loader from '../Common/Loader';
import Buy from './Modals/Buy';

function MBEMarket() {
  // const mbeId = useStore(state => state.email)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("")
  const [market, setMarket] = useState([])
  const [open, setOpen] = useState("")

  useEffect(() => {
    const onSuccess = (res) => {
      setMarket(res)
      setLoading(false)
    }

    fetchMbeMarket(onSuccess)
  }, [])

  const updateOpen = id => setOpen(id)

  const closeModal = () => setOpen("")

  if (loading) return <Loader wrapperCls='h-[calc(100vh-64px)]' />

  return (
    <section className="dfc h-[calc(100vh-64px)] border-r border-[rgba(255,255,255,.3)] overflow-y-hidden">
      <div className="df py-2 px-6 border-b border-[rgba(255,255,255,.3)]">
        <div className='df p-2 bg-slate-800 rounded'>
          <Search className='w-4 h-4 fill-white' />
          <input
            type="text"
            className='w-44 p-0 bg-inherit border-none leading-none text-white'
            placeholder='Search by ISIN/Issuer name'
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
        </div>
        <h1 className="flex-auto text-lg font-medium text-center">MBE Market</h1>

        <div className="df">
          <span className="w-4 h-4 rounded-full bg-emerald-400"></span>
          <p>Market Open</p>
        </div>
      </div>

      <div className="scroll-y overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="sticky top-0 text-sm bg-slate-900 shadow-[0_1px_3px_0_rgba(255,255,255,.1)] z-1">
              <td className="w-36 px-4 py-2">ISIN</td>
              <td className="w-52 px-4 py-2">Issuer Name</td>
              <td className="w-32 px-4 py-2">Coupon Rate</td>
              <td className="w-28 px-4 py-2">Face Value</td>
              <td className="w-24 px-4 py-2">LTP</td>
              <td className="w-80 px-4 py-2">Credit Rating</td>
              <td className="w-32 px-4 py-2 text-center">Maturity Date</td>
              <td className="w-28 px-4 py-2 text-center">Bid Price</td>
              <td className="w-28 px-4 py-2 text-center">Ask Price</td>
            </tr>
          </thead>

          <tbody>
            {
              market
                .filter((a, i) => market[i].isTokenized === true)
                .map(li => (
                  <tr
                    key={li._id}
                    className="hover:bg-[rgba(255,255,255,.1)] cursor-pointer group"
                    onClick={() => updateOpen(li.isin)}
                  >
                    <td className="px-4 py-2 text-sm opacity-80 border-b border-[rgba(255,255,255,.3)] group-hover:opacity-100"> {li.isin} </td>
                    <td className="px-4 py-2 text-sm font-medium opacity-80 border-b border-[rgba(255,255,255,.3)] group-hover:opacity-100"> {li.issuerName} </td>
                    <td className="px-4 py-2 text-sm opacity-80 border-b border-[rgba(255,255,255,.3)] group-hover:opacity-100"> {li.couponrate} </td>
                    <td className="px-4 py-2 text-sm opacity-80 border-b border-[rgba(255,255,255,.3)] group-hover:opacity-100"> {li.faceValue} </td>
                    <td className="px-4 py-2 text-sm opacity-80 border-b border-[rgba(255,255,255,.3)] group-hover:opacity-100"> {li.ltp} </td>
                    <td className="px-4 py-2 text-xs opacity-80 border-b border-[rgba(255,255,255,.3)] group-hover:opacity-100"> {li.creditrating} </td>
                    <td className="px-4 py-2 text-sm opacity-80 border-b border-[rgba(255,255,255,.3)] group-hover:opacity-100 text-center"> {li.maturitydate} </td>
                    <td className="px-4 py-2 text-sm opacity-80 border-b border-[rgba(255,255,255,.3)] group-hover:opacity-100 text-center">
                      <button className="w-20 px-3 py-1.5 rounded border border-emerald-600">
                        {li.bidPrice || 0}
                      </button>
                    </td>
                    <td className="px-4 py-2 text-sm opacity-80 border-b border-[rgba(255,255,255,.3)] group-hover:opacity-100 text-center">
                      <button className="w-20 px-3 py-1.5 rounded border border-yellow-600">
                        {li.askPrice || 0}
                      </button>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>

      {
        (open || open === 0) &&
        <Buy
          isOpen
          data={market.find(li => li.isin === open)}
          closeModal={closeModal}
        />
      }
    </section>
  )
}

export default MBEMarket