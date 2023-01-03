import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../../store';

import { ReactComponent as UserProfile } from '../../assets/svg/users/profile.svg';
import { DropDownWrapper } from '../UIComp/DropDown';
import AddBalance from './Modals/AddBalance';
import { fetchCBDCBalance, getUserDetails } from '../../apis/apis';
// import { getUserDetails } from '../../apis/custodianApis';

const routes = {
  investor: [
    {
      key: "My token holdings",
      to: "/investor/token-holdings",
    },
    {
      key: "My bond holdings",
      to: "/investor/bond-holdings",
    },
    {
      key: "Transactions Hitory",
      to: "/investor/transactions-hitory",
    },
  ],
  custodian: [
    {
      key: "Investors list",
      to: "/custodian/investors-list",
    },
    {
      key: "Tokenized Bonds",
      to: "/custodian/tokenised-bond",
    },
    {
      key: "Transactions list",
      to: "/custodian/transactions-hitory",
    },
    {
      key: "Reports",
      to: "/custodian/reports",
    },
  ],
  regulator: [
    {
      key: "Investors list",
      to: "/regulator/investors-list",
    },
    {
      key: "Tokenized Bonds",
      to: "/regulator/tokenised-bond",
    },
    {
      key: "Transactions list",
      to: "/regulator/transactions-hitory",
    },
    {
      key: "Reports",
      to: "/regulator/reports",
    },
  ],
  mbe: [
    {
      key: "Investors list",
      to: "/mbe/investors-list",
    },
    {
      key: "Tokenized Bonds",
      to: "/mbe/tokenised-bond",
    },
    {
      key: "Transactions list",
      to: "/mbe/transactions-hitory",
    },
    {
      key: "Reports",
      to: "/mbe/reports",
    },
  ],
}

const Name = {
  investor: "Investor",
  custodian: "NSDL(Custodian/Depository)",
  regulator: "NSE",
  mbe: "MBE",
}

function Nav() {
  const isLoggedIn = useStore(state => state.isLoggedIn)
  const logOut = useStore(state => state.logOut)
  const email = useStore(state => state.email)
  const [userDetails, setUserDetails] = useState({})
  const role = useStore(state => state.role)

  const [CBDCBalance, setCBDCBalance] = useState(0)
  const [open, setOpen] = useState(false)
  const [list, setList] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const ddList = role === "investor" ? ["Profile", "Log Out"] : ["Log Out"]
    setList(ddList)

    const onSuccessUserDetails = (payload) => {
      setUserDetails(payload)
    }

    const onSuccessCBDCBalanceFetch = (payload) => {
      setCBDCBalance(payload?.CBDCbalance || 0)
    }

    fetchCBDCBalance({ "MbeId": email }, onSuccessCBDCBalanceFetch)
    getUserDetails({ "email": email }, onSuccessUserDetails)
  }, [role])

  const onClk = val => {
    if (val === "Log Out") {
      logOut()
      navigate("/")
    } else {
      navigate("/investor/profile")
    }
  }

  const updateOpen = () => setOpen(p => !p)

  return (
    <>
      <nav className="df gap-4 sm:gap-8 h-16 px-8 border-b border-[rgba(0,0,0,.05)]">
        <Link
          className='mr-auto py-4 sm:text-xl lg:text-2xl font-semibold'
          to="/"
        >
          Micro Bond Exchange
        </Link>

        <Link
          className='text-sm hover:text-emerald-500'
          to="/mbe-market"
        >
          MBE Market
        </Link>

        {
          isLoggedIn ? <>
            {
              routes[role].map(r => (
                <Link
                  className='text-sm hover:text-emerald-500'
                  key={r.key}
                  to={r.to}
                >
                  {r.key}
                </Link>
              ))
            }

            {
              role === "investor" &&
              <button
                className='p-0 text-sm hover:underline'
                onClick={updateOpen}
                title="Add balance"
              >
                CBDC Balance : {CBDCBalance}
              </button>
            }

            <DropDownWrapper
              list={list}
              onClk={onClk}
              rootCls="p-0"
              needArrow
              boxCls="profile-dd"
            >
              <UserProfile /> <span className='text-xs'>{email === 'custodian@gmail.com' ? "Custodian" : userDetails.firstName}</span>
            </DropDownWrapper>
          </> : <>
            <Link
              className='text-sm hover:text-emerald-500'
              to="/login"
            >
              Login
            </Link>

            <Link
              className='text-sm hover:text-emerald-500'
              to="/signup"
            >
              Signup
            </Link>
          </>
        }
      </nav>

      <AddBalance
        isOpen={open}
        closeModal={updateOpen}
      />
    </>
  )
}

export default Nav