import { lazy, Suspense } from 'react';
import { Route, Routes } from "react-router-dom";

import Loader from './comp/Common/Loader';

const ForgetPass = lazy(() => import("./comp/Auth/ForgetPass"))
const Signup = lazy(() => import("./comp/Auth/Signup"))
const Login = lazy(() => import("./comp/Auth/Login"))

const ListOfInvestors = lazy(() => import("./comp/Custodian/ListOfInvestors"))
const TransactionList = lazy(() => import("./comp/Custodian/TransactionList"))
const TokenisedBond = lazy(() => import("./comp/Custodian/TokenisedBond"))
const Report = lazy(() => import("./comp/Custodian/Report"))

const TransactionHitory = lazy(() => import("./comp/Home/TransactionHitory"))
const TokenHoldings = lazy(() => import("./comp/Home/TokenHoldings"))
const BondHoldings = lazy(() => import("./comp/Home/BondHoldings"))
// const CBDCWallet = lazy(() => import("./comp/Home/CBDCWallet"))
const MBEMarket = lazy(() => import("./comp/Home/MBEMarket"))
const Profile = lazy(() => import("./comp/Home/Profile"))
const Home = lazy(() => import("./comp/Home"))

function App() {
  return (
    <Suspense fallback={<Loader wrapperCls='h-screen' />}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forget-pass" element={<ForgetPass />} />

        <Route path="/" element={<Home />}>
          <Route index element={<div></div>} />
          <Route path="mbe-market" element={<MBEMarket />} />
          <Route path="/investor/profile" element={<Profile />} />
          {/* <Route path="/investor/cbdc-wallet" element={<CBDCWallet />} /> */}
          <Route path="/investor/bond-holdings" element={<BondHoldings />} />
          <Route path="/investor/token-holdings" element={<TokenHoldings />} />
          <Route path="/investor/transactions-hitory" element={<TransactionHitory />} />

          <Route path="/custodian/transactions-hitory" element={<TransactionList />} />
          <Route path="/custodian/investors-list" element={<ListOfInvestors />} />
          <Route path="/custodian/tokenised-bond" element={<TokenisedBond />} />
          <Route path="/custodian/reports" element={<Report />} />

          <Route path="/regulator/transactions-hitory" element={<TransactionList />} />
          <Route path="/regulator/investors-list" element={<ListOfInvestors />} />
          <Route path="/regulator/tokenised-bond" element={<TokenisedBond />} />
          <Route path="/regulator/reports" element={<Report />} />

          <Route path="/mbe/transactions-hitory" element={<TransactionList />} />
          <Route path="/mbe/investors-list" element={<ListOfInvestors />} />
          <Route path="/mbe/tokenised-bond" element={<TokenisedBond />} />
          <Route path="/mbe/reports" element={<Report />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App;
