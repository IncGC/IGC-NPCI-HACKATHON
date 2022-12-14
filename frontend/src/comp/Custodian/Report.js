import { useState, useEffect } from 'react';
import { getPurchaseLog } from '../../apis/custodianApis';

// import { ReactComponent as Filter } from '../../assets/svg/common/filter.svg';
// import { DropDownWrapper } from '../UIComp/DropDown';
// import FilterByDate from './FilterByDate';
import Loader from '../Common/Loader';

function Report() {
  // const [dateFilter, setDateFilter] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  // const [type, setType] = useState("")
  const [res, setRes] = useState([])

  // const data = useMemo(() => {
  //   let cloned = [...live]

  //   if (dateFilter) {
  //     let start = new Date(dateFilter.start).getTime()
  //     let end = new Date(dateFilter.end).getTime()
  //     cloned = cloned.filter(l => {
  //       let currDate = new Date(l.MaturityDate).getTime()
  //       return currDate >= start && currDate <= end
  //     })
  //   }

  //   if (type) {
  //     cloned = cloned.filter(l => l.TransactionsType.match(type))
  //   }

  //   return cloned
  // }, [type, dateFilter])

  useEffect(() => {
    const onSuccess = (payload) => {
      setRes(payload)
      setIsLoading(false)
    }

    getPurchaseLog(onSuccess)
  }, [])

  // const updateType = val => setType(p => p === val ? "" : val)

  if (isLoading) return <Loader wrapperCls='h-[calc(100vh-64px)]' />

  return (
    <section className="dfc gap-0 h-[calc(100vh-64px)] overflow-y-hidden">
      <div className='df gap-4 p-4 border-b border-[rgba(0,0,0,.1)] relative'>
        {/* <DropDownWrapper
          list={["List of Tokenized Bonds", "List of Detokenized Bonds", "Trade Report"]}
          onClk={updateType}
          active={type}
          activeCls="bg-slate-600 text-white"
          rootCls="p-0"
          needArrow
        >
          <Filter className={type ? "opacity-100" : "opacity-70"} />
        </DropDownWrapper> */}

        {/* <FilterByDate
          setDateFilter={setDateFilter}
        /> */}

        <h1 className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-medium text-center'>
          Report
        </h1>
      </div>

      <div className="scroll-y overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="sticky top-0 text-sm bg-slate-200 shadow-[0_1px_3px_0_rgba(0,0,0,.1)] z-1">
              {/* <td className="w-32 px-4 py-2">Trade Date</td> */}
              <td className="w-36 px-4 py-2">ISIN</td>
              <td className="w-52 px-4 py-2">Issuer Name</td>
              <td className="w-32 px-4 py-2">Coupon Rate</td>
              <td className="w-32 px-4 py-2">Maturity Date</td>
              <td className="w-28 px-4 py-2">No. of Tokens</td>
              <td className="w-28 px-4 py-2">Trade Value</td>
            </tr>
          </thead>

          <tbody>
            {
              res.map(li => (
                <tr
                  key={li._id}
                  className="text-sm even:bg-slate-50 hover:bg-slate-100 cursor-pointer"
                >
                  {/* <td className="px-4 py-2"> {li.MaturityDate} </td> */}
                  <td className="px-4 py-2"> {li.Isin} </td>
                  <td className="px-4 py-2 font-medium"> {li.IssuerName} </td>
                  <td className="px-4 py-2"> {li.CouponRate} </td>
                  <td className="px-4 py-2"> {li.MaturityDate} </td>
                  <td className="px-4 py-2"> {li.NumOfToken} </td>
                  <td className="px-4 py-2"> {li.TradeValue} </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Report