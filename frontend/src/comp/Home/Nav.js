import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../../store';

import { ReactComponent as UserProfile } from '../../assets/svg/users/profile.svg';
import { DropDownWrapper } from '../UIComp/DropDown';
import AddBalance from './Modals/AddBalance';
import { fetchCBDCBalance } from '../../apis/apis';

const routes = {
  investor: {
    name: "Investor",
    "Profile": "profile",
    "My token holdings": "token-holdings",
    "My bond holdings": "bond-holdings",
    "Transactions Hitory": "transactions-hitory",
  },
  custodian: {
    name: "NSDL(Custodian/Depository)",
    "Investors list": "investors-list",
    "Tokenized Bonds": "tokenised-bond",
    "Transactions list": "transactions-hitory",
    "Reports": "reports",
  },
  regulator: {
    name: "NSE",
    "Investors list": "investors-list",
    "Tokenized Bonds": "tokenised-bond",
    "Transactions list": "transactions-hitory",
    "Reports": "reports",
  },
  mbe: {
    name: "MBE",
    "Investors list": "investors-list",
    "Tokenized Bonds": "tokenised-bond",
    "Transactions list": "transactions-hitory",
    "Reports": "reports",
  },
}

function Nav() {
  const isLoggedIn = useStore(state => state.isLoggedIn)
  const logOut = useStore(state => state.logOut)
  const role = useStore(state => state.role)
  const mbeId = useStore(state => state.email)

  const [open, setOpen] = useState(false)
  const [list, setList] = useState([])
  const [CBDCBalance, setCBDCBalance] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    let { name, ...newData } = routes[role] || { name: "" }
    setList([...Object.keys(newData), "Log Out"])

    const onSuccess = (payload) => {
      setCBDCBalance(payload)
    }

    fetchCBDCBalance({ "mbeId": mbeId }, onSuccess)
  }, [role])

  const onClk = val => {
    if (val === "Log Out") {
      logOut()
      navigate("/")
    } else {
      navigate(`/${role}/${routes[role][val]}`)
    }
  }

  const updateOpen = () => setOpen(p => !p)

  return (
    <>
      <nav className="df gap-4 sm:gap-8 h-16 px-8 border-b border-[rgba(255,255,255,.6)]">
        <Link
          className='mr-auto py-4 sm:text-xl lg:text-2xl font-semibold text-white'
          to="/"
        >
          Micro Bond Exchange
        </Link>

        <Link
          className='text-white hover:text-emerald-300'
          to="/mbe-market"
        >
          MBE Market
        </Link>

        {
          isLoggedIn ? <>
            {
              role === "investor" &&
              <button
                className='p-0 text-sm hover:underline'
                onClick={updateOpen}
                title="Add balance"
              >
                CBDC Balance : {CBDCBalance.CBDCbalance}
              </button>
            }

            <DropDownWrapper
              list={list}
              onClk={onClk}
              rootCls="p-0"
              needArrow
              boxCls="profile-dd"
            >
              <UserProfile /> <span className='text-xs'>{routes[role]?.name}</span>
            </DropDownWrapper>
          </> : <>
            <Link
              className='hover:text-emerald-500'
              to="/login"
            >
              Login
            </Link>

            <Link
              className='hover:text-emerald-500'
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