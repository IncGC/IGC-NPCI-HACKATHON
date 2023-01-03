import { useEffect, useState } from 'react';

import { fetchAskPrice, fetchBidPrice, fetchMbeMarket } from '../../apis/apis';

import { ReactComponent as Search } from '../../assets/svg/common/seach.svg';
import Loader from '../Common/Loader';
import Buy from './Modals/Buy';

function MBEMarket() {
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("")
  const [market, setMarket] = useState([])
  const [open, setOpen] = useState("")

  useEffect(() => {
    const onSuccess = async res => {
      const bidPricePromises = res.map(async current => {
        const innerRes = await fetchBidPrice()
        const bidPriceRes = innerRes.message
        var bidPrice = 0
        var currentTime = 0
        console.log(innerRes)

        for (let i = 0; i < bidPriceRes.length; i++) {
          if (current.Isin === bidPriceRes[i].Isin) {
            if (currentTime === 0) {
              currentTime = Date.parse(bidPriceRes[i].createdAt)
              bidPrice = bidPriceRes[i].Price
            }
            else {
              if (currentTime <= Date.parse(bidPriceRes[i].createdAt))
                currentTime = Date.parse(bidPriceRes[i].createdAt)
                bidPrice = bidPriceRes[i].Price
            }
          }
        }

        return {
          ...current,
          BidPrice: bidPrice
        }
      })
      
      const final1 = await Promise.all(bidPricePromises)

      const askPricePromises = final1.map(async current => {
        const innerRes = await fetchAskPrice()
        const askPriceRes = innerRes.message
        var askPrice = 0
        var currentTime = 0
        console.log(innerRes)

        for (let i = 0; i < askPriceRes.length; i++) {
          if (current.Isin === askPriceRes[i].Isin) {
            if (currentTime === 0) {
              currentTime = Date.parse(askPriceRes[i].createdAt)
              askPrice = askPriceRes[i].Price
            }
            else {
              if (currentTime <= Date.parse(askPriceRes[i].createdAt))
                currentTime = Date.parse(askPriceRes[i].createdAt)
                askPrice = askPriceRes[i].Price
            }
          }
        }

        return {
          ...current,
          AskPrice: askPrice
        }
      })


      const final2 = await Promise.all(askPricePromises)

      setMarket(final2)
      setLoading(false)
    }

    fetchMbeMarket(onSuccess)
  }, [])

  const updateOpen = id => setOpen(id)

  const closeModal = () => setOpen("")

  if (loading) return <Loader wrapperCls='h-[calc(100vh-64px)]' />

  return (
    <section className="dfc gap-0 h-[calc(100vh-64px)] overflow-y-hidden">
      <div className="df py-2 px-6 border-b border-[rgba(0,0,0,.1)]">
        <div className='df p-2 bg-slate-100 rounded'>
          <Search className='w-4 h-4' />
          <input
            type="text"
            className='w-44 p-0 bg-inherit border-none leading-none'
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
            <tr className="sticky top-0 text-sm bg-slate-200 shadow-[0_1px_3px_0_rgba(0,0,0,.1)] z-1">
              <td className="w-36 px-4 py-2">ISIN</td>
              <td className="w-52 px-4 py-2">Issuer Name</td>
              <td className="w-32 px-4 py-2">Coupon Rate</td>
              <td className="w-28 px-4 py-2">Face Value</td>
              <td className="w-24 px-4 py-2">Ltp</td>
              <td className="w-80 px-4 py-2">Credit Rating</td>
              <td className="w-32 px-4 py-2 text-center">Maturity Date</td>
              <td className="w-28 px-4 py-2 text-center">Bid Price</td>
              <td className="w-28 px-4 py-2 text-center">Ask Price</td>
            </tr>
          </thead>

          <tbody>
            {
              market
                // .filter((a, i) => market[i].IsTokenized === true)
                .map(li => (
                  <tr
                    key={li._id}
                    className="text-sm even:bg-slate-50 hover:bg-slate-100 cursor-pointer"
                    onClick={() => updateOpen(li.Isin)}
                  >
                    <td className="px-4 py-2"> {li.Isin} </td>
                    <td className="px-4 py-2 font-medium"> {li.IssuerName} </td>
                    <td className="px-4 py-2"> {li.CouponRate} </td>
                    <td className="px-4 py-2"> {li.FaceValue} </td>
                    <td className="px-4 py-2"> {li.Ltp} </td>
                    <td className="px-4 py-2 text-xs"> {li.CreditRating} </td>
                    <td className="px-4 py-2 text-center"> {li.MaturityDate} </td>
                    <td className="px-4 py-2 text-center">
                      <button className="w-20 px-3 py-1.5 rounded border border-emerald-600">
                        {li.BidPrice || 0}
                      </button>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button className="w-20 px-3 py-1.5 rounded border border-yellow-600">
                        {li.AskPrice || 0}
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
          data={market.find(li => li.Isin === open)}
          closeModal={closeModal}
        />
      }
    </section>
  )
}

export default MBEMarket