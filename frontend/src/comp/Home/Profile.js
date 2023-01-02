import { useEffect, useState } from 'react';
import { getUserDetails, fetchCBDCBalance } from '../../apis/apis';
import useStore from '../../store';
import Loader from '../Common/Loader';

function Input({ lable = "", value = "" }) {
  return (
    <div className='flex text-xs md:text-base'>
      <p className="w-32 md:ml-8 shrink-0 opacity-70">{lable}</p>
      <span className="font-medium md:mx-4 opacity-70">:</span>
      <p className="ml-6">{value}</p>
    </div>
  )
}

function Profile() {
  const email = useStore(state => state.email)
  const [userDetails, setUserDetails] = useState({})
  const [loading, setLoading] = useState(true)
  const [CBDCBalance, setCBDCBalance] = useState({})

  useEffect(() => {
    const onSuccessUserDetails = (payload) => {
      setUserDetails(payload)
      setLoading(false)
    }

    const onSuccessCBDCBalanceFetch = (payload) => {
      setCBDCBalance(payload)
    }

    getUserDetails({ "email": email }, onSuccessUserDetails)

    fetchCBDCBalance({ "mbeId": email }, onSuccessCBDCBalanceFetch)
  }, [email])

  if (loading) return <Loader wrapperCls='h-[calc(100vh-64px)]' />

  return (
    <section className="grid gap-4 max-w-xl mx-4 sm:mx-auto px-6 py-10 bg-slate-800 rounded-b-2xl">
      <Input
        lable='Name'
        value={userDetails.firstName + " " + userDetails.lastName}
      />
      <Input
        lable='Account ID'
        value={userDetails.email}
      />
      <Input
        lable='CBDC Balance'
        value={CBDCBalance.CBDCbalance}
      />
      {/* <Input
        lable='PAN Number'
        value='12345'
      />
      <Input
        lable='Aadhar Card'
        value='865-4309-876-6654'
      /> */}
      <Input
        lable='DOB'
        value={userDetails.DOB}
      />
      <Input
        lable='Mobile'
        value={userDetails.phoneNumber}
      />
      <Input
        lable='Email'
        value={userDetails.email}
      />
      <Input
        lable='Gender'
        value={userDetails.gender}
      />
      <Input
        lable='Address'
        value={userDetails.address}
      />
    </section>
  )
}

export default Profile