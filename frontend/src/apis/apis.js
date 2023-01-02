import endPoints from "../utils/endPoints";
import sendApiReq from "../utils/sendApiReq";

export async function sendOtp(data, onSuccess) {
  console.log(data);
  try {
    const payload = await sendApiReq({
      method: 'post',
      url: endPoints.otpSending,
      data,
    })
    console.log(payload)
    if (payload.status_code === 200)
      onSuccess()
  } catch (error) {
    console.log(error)
  }
}

export async function verifyOtp(data, onSuccess, onFailure) {
  console.log(data);
  try {
    const payload = await sendApiReq({
      method: 'post',
      url: endPoints.otpVerify,
      data,
    })

    console.log(payload)
    if (payload.status_code === 200)
      onSuccess()
    else
      onFailure()
    console.log(data);
  } catch (error) {
    console.log(error)
  }
}

export async function fetchNseData(data, onSuccess, onFailure) {
  try {
    console.log(data);
    const payload = await sendApiReq({
      method: 'get',
      url: endPoints.nseData,
      params: data,
    })
    console.log(payload)
    if (payload.status_code === 200)
      onSuccess(payload)
    else
      onFailure()
  } catch (error) {
    console.log(error);
  }
}

export async function postNseData(data, onSuccess, onFailure) {
  try {
    console.log(data);
    const payload = await sendApiReq({
      method: 'post',
      url: endPoints.nseData,
      data,
    })
    console.log(payload)
    if (payload.status_code === 200)
      onSuccess()
    else
      onFailure()
  } catch (error) {
    console.log(error);
  }
}

export async function registerUser(data, onSuccess, onFailure) {
  try {
    console.log(data);
    const payload = await sendApiReq({
      method: 'post',
      url: endPoints.register_user,
      data
    })
    if (payload.status_code === 200)
      onSuccess()
    else
      onFailure()
  } catch (error) {
    console.log(error)
  }
}

export async function login(data, onSuccess, onFailure) {
  try {
    console.log(data);
    const payload = await sendApiReq({
      method: 'post',
      url: endPoints.login,
      data
    })
    console.log(payload)
    if (payload.status_code === 200)
      onSuccess(payload)
    else
      onFailure()
  } catch (error) {
    console.log(error)
  }
}

export async function fetchTransactions(data, onSuccess) {
  try {
    console.log(data);
    const payload = await sendApiReq({
      method: 'get',
      url: endPoints.transactions,
      params: data
    })
    console.log(payload)
    if (payload.status === 200)
      onSuccess(payload)
  } catch (error) {
    console.log(error)
  }
}

export async function fetchTokenHoldings(data, onSuccess) {
  try {
    console.log(data);
    const payload = await sendApiReq({
      method: 'get',
      url: endPoints.fetchTokenHoldings,
      params: data
    })
    console.log(payload)
    if (payload.status === 200)
      onSuccess(payload)
  } catch (error) {
    console.log(error)
  }
}

export async function tokenize(data, onSuccess, onFailure) {
  try {
    console.log(data);
    const payload = await sendApiReq({
      method: 'post',
      url: endPoints.tokenize,
      data
    })
    console.log(payload)
    if (payload.status === 200)
      onSuccess(payload.message)
    else 
      onFailure(payload.message)
  } catch (error) {
    console.log(error)
  }
}

export async function detokenzie(data, onSuccess, onFailure) {
  try {
    console.log(data);
    const payload = await sendApiReq({
      method: 'post',
      url: endPoints.detokenize,
      data
    })
    console.log(payload)
    if (payload.status === 200)
      onSuccess(payload.message)
    else
      onFailure(payload.message)
  } catch (error) {
    console.log(error)
  }
}

export async function sellOrder(data, onSuccess, onFailure) {
  try {
    console.log(data)
    const payload = await sendApiReq({
      method: 'post',
      url: endPoints.sellOrder,
      data
    })
    console.log(payload)
    if (payload.status === 200)
      onSuccess(payload.message)
    else
      onFailure(payload.message)
  } catch (error) {
    console.log(error)
  }
}

export async function buyOrder(data, onSuccess, onFailure) {
  try {
    const payload = await sendApiReq({
      method: 'post',
      url: endPoints.placeBuyOrder,
      data
    })
    console.log(payload)
    if (payload.status === 200)
      onSuccess(payload.message)
    else
      onFailure(payload.message)
  } catch (error) {
    console.log(error)
  }
}

export async function fetchMbeMarket(onSuccess) {
  try {
    const payload = await sendApiReq({
      method: 'get',
      url: endPoints.fetchMarket,
    })
    console.log(payload)
    if (payload.status === 200)
      onSuccess(payload.message)
  } catch (error) {
    console.log(error)
  }
}

export async function getUserDetails(data, onSuccess) {
  try {
    const payload = await sendApiReq({
      method: 'get',
      url: endPoints.getUserDetails,
      params: data,
    })
    console.log(payload)
    if (payload.status === 200)
      onSuccess(payload.message)
  } catch (error) {
    console.log(error)
  }
}

export async function fetchCBDCBalance(data, onSuccess) {
  try {
    const payload = await sendApiReq({
      method: 'get',
      url: endPoints.fetchCBDCBalance,
      params: data,
    })
    console.log(payload)
    if (payload.status === 200)
      onSuccess(payload.message)
  } catch (error) {
    console.log(error)
  }
}

export async function updateBalance(data, onSuccess, onFailure){

  try{

    const payload = await sendApiReq({
      method: 'post',
      url: endPoints.updateBalance,
       data,
    })
    console.log(payload)
    if (payload.status === 200)
      onSuccess(payload.message)
    else 
    onFailure(payload.message)
  }catch(error){

    console.log(error)
  }
}


export async function updateAddress(data, onSuccess){

  try{

    const payload = await sendApiReq({
      method: 'get',
      url: endPoints.updateAddress,
      params: data,
    })
    console.log(payload)
    if (payload.status === 200)
      onSuccess(payload.message)
  }catch(error){

    console.log(error)
  }
}

export async function getAllBalances(data, onSuccess){

  try{

    const payload = await sendApiReq({
      method: 'get',
      url: endPoints.getAllBalances,
      params: data,
    })
    console.log(payload)
    if (payload.status === 200)
      onSuccess(payload.message)
  } catch (error) {
    console.log(error)
  }
}