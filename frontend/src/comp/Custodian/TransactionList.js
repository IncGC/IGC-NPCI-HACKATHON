import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useStore from '../../store';

import custodianTransaction from '../../constants/custodianTransaction';
import { fetchAllTransactions, fetchAllUserBuyTransactions, fetchAllUserSellTransactions } from '../../apis/custodianApis';
import getTypeClr from '../../helper/getTypeClr';

import { ReactComponent as Filter } from '../../assets/svg/common/filter.svg';
import { ReactComponent as Print } from '../../assets/svg/files/print.svg';
import { DropDownWrapper, Menu } from '../UIComp/DropDown';
import CertificateAsPdf from '../Home/Modals/CertificateAsPdf';
import InvestorsList from './Modals/InvestorsList';
import UserInfoModal from './Modals/UserInfo';
// import FilterByDate from './FilterByDate';
import Input from '../Home/common/Input';
import Loader from '../Common/Loader';

function TransactionList() {
  const role = useStore(state => state.role)
  const { state: tokenDetails } = useLocation()

  const [authorisation, setAuthorisation] = useState("")
  // const [dateFilter, setDateFilter] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [status, setStatus] = useState("")
  const [type, setType] = useState("")
  const [list, setList] = useState("")
  const [open, setOpen] = useState({ state: "", data: {} })

  useEffect(() => {
    const onSuccess1 = res => {
      setList(res)
      setIsLoading(false)
    }

    fetchAllTransactions(onSuccess1)
  }, [])

  const data = useMemo(() => {
    let cloned = [...custodianTransaction]

    // if (dateFilter) {
    //   let start = new Date(dateFilter.start).getTime()
    //   let end = new Date(dateFilter.end).getTime()
    //   cloned = cloned.filter(l => {
    //     let currDate = new Date(l.MaturityDate).getTime()
    //     return currDate >= start && currDate <= end
    //   })
    // }

    if (authorisation) {
      cloned = cloned.filter(l => l.authorisedStaus.match(authorisation))
    }

    if (status) {
      cloned = cloned.filter(l => l.status.match(status))
    }

    if (type) {
      cloned = cloned.filter(l => l.TransactionsType.match(type))
    }

    return cloned
  }, [type, status, authorisation])

  const updateType = val => setType(p => p === val ? "" : val)
  const updateStatus = val => setStatus(p => p === val ? "" : val)
  const updateAuthorisation = val => setAuthorisation(p => p === val ? "" : val)

  const updateOpen = (state, data = {}) => setOpen({ state, data })
  const closeModal = () => setOpen({ state: "", data: {} })

  if (isLoading) return <Loader wrapperCls='h-[calc(100vh-64px)]' />

  return (
    <section className="dfc gap-0 h-[calc(100vh-64px)] overflow-y-hidden">
      <div className='df gap-4 p-4 border-b border-[rgba(0,0,0,.1)] relative'>
        <Menu
          label={<Filter className={authorisation || status || type ? "opacity-100" : "opacity-70"} />}
          needArrow
          rootCls="p-0"
        >
          <DropDownWrapper
            list={["Tokenized", "Detokenized", "Trade"]}
            onClk={updateType}
            active={type}
            activeCls="bg-slate-600 text-white"
            preventClose
          >
            Type
          </DropDownWrapper>

          <DropDownWrapper
            list={["Success", "Failure", "Pending"]}
            onClk={updateStatus}
            active={status}
            activeCls="bg-slate-600 text-white"
            preventClose
          >
            Status
          </DropDownWrapper>

          <DropDownWrapper
            list={["Authorised", "Pending"]}
            onClk={updateAuthorisation}
            active={authorisation}
            activeCls="bg-slate-600 text-white"
            preventClose
          >
            Authorisation
          </DropDownWrapper>
        </Menu>

        {/* <FilterByDate setDateFilter={setDateFilter} /> */}

        {
          tokenDetails ? <>
            <span className='ml-auto'></span>
            <Input
              lable='ISIN'
              value={tokenDetails.Isin}
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
            <span className='mr-auto'></span>
          </> :
            <h1 className='mx-auto text-lg font-medium text-center'>
              Transactions History
            </h1>
        }
      </div>

      <div className="scroll-y overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="sticky top-0 text-sm bg-slate-200 shadow-[0_1px_3px_0_rgba(0,0,0,.1)] z-1">
              {/* <td className="w-32 pl-8 pr-4 py-2">Date</td> */}
              <td className="w-32 px-4 py-2">Transaction Id</td>
              <td className="w-24 px-4 py-2">Type</td>
              <td className="w-32 px-4 py-2">Investors</td>
              <td className="w-28 px-4 py-2">Status</td>
              <td className="w-24 px-4 py-2">Authorization</td>
              <td className="w-24 px-4 py-2">Amount</td>
              {
                role !== "mbe" &&
                <td className="w-32 px-4 py-2 text-center">Certificate</td>
              }
            </tr>
          </thead>

          <tbody>
            {
              list
                // .filter((l, i) => tokenDetails ? i < 10 : true)
                .map((li, i) => (
                  <tr
                    key={li._id}
                    className="text-sm even:bg-slate-50 hover:bg-slate-100 cursor-pointer"
                  >
                    <td className="pl-8 pr-4 py-2"> {li.OrderId} </td>
                    <td className="px-4 py-2"> {li.TransactionsType} </td>
                    {/* <td className={`px-4 py-2 font-medium ${getTypeClr(li.TransactionsType)}`}>
                      {li.TransactionsType}
                    </td> */}
                    <td className="px-4 py-2">
                      <button
                        className="w-16 rounded border border-emerald-600 hover:bg-emerald-600 hover:text-white"
                        onClick={() => updateOpen("InvestorsList")}
                      >
                        View
                      </button>
                    </td>
                    <td className={`px-4 py-2 ${getTypeClr(li.status)}`}>
                      {
                        li.IsProcessed ? "Success" : "Pending"
                      }
                    </td>
                    <td className={`px-4 py-2 ${getTypeClr(li.authorisedStaus)}`}>
                      {
                        li.IsProcessed ? "Authorized" : "Pending"
                      }
                    </td>
                    <td className="px-4 py-2"> {Number(li.NumOfToken) * Number(li.Price)} </td>
                    {
                      role !== "mbe" &&
                      <td className='px-4 py-2'>
                        {
                          i % 5 !== 0 &&
                          <Print
                            className="mx-auto"
                            onClick={() => updateOpen("CertificateAsPdf")}
                          />
                        }
                      </td>
                    }
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>

      {
        open.state === "CertificateAsPdf" &&
        <CertificateAsPdf
          isOpen
          closeModal={closeModal}
        />
      }

      {
        open.state === "InvestorsList" &&
        <InvestorsList
          isOpen
          title={tokenDetails?.IssuerName || "SHRIRAM TRANSPORT"}
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
          closeModal={() => updateOpen("InvestorsList")}
        />
      }
    </section>
  )
}

export default TransactionList