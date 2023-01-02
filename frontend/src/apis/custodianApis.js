import endPoints from "../utils/endPoints";
import sendApiReq from "../utils/sendApiReq";

export async function getInvestorLists(onSuccess) {
  try {
    const res = await sendApiReq({})
    console.log("investors List")
    console.log(res)
    onSuccess(res.message)

  } catch (error) {
    console.log(error)
  }
}

export async function getUserDetails(mbeId, onSuccess) {
  try {
    const res = await sendApiReq({
      url: `${endPoints.userDetail}?mbeId=${mbeId}`,
    })

    console.log(res)
    // onSuccess(res)

  } catch (error) {
    console.log(error)
  }
}

export async function getBondholding(data, onSuccess) {
  try {
    console.log(data);
    const payload = await sendApiReq({
      method: 'get',
      url: endPoints.fetchTokenHoldings,
      params: data
    })
    console.log(payload)
    if (payload.status === 200)
      onSuccess(payload.message)
  } catch (error) {
    console.log(error)
  }
}

export async function getTokenHoldings(data, onSuccess) {
  try {
    console.log(data);
    const payload = await sendApiReq({
      method: 'get',
      url: endPoints.fetchTokenHoldings,
      params: data
    })
    console.log(payload)
    if (payload.status === 200)
      onSuccess(payload.message)
  } catch (error) {
    console.log(error)
  }
}

export async function getTransactions(data, onSuccess) {
  try {
    console.log(data);
    const payload = await sendApiReq({
      method: 'get',
      url: endPoints.transactions,
    })
    console.log(payload)
    if (payload.status === 200)
      onSuccess(payload.message)
  } catch (error) {
    console.log(error)
  }
}

export async function getPurchaseLog(onSuccess) {
  try {
    const res = await sendApiReq({
      method: "get",
      url: endPoints.purchaseLog,
    })

    console.log(res)
    if (res.status === 200)
      onSuccess(res.message)

  } catch (error) {
    console.log(error)
  }
}

export async function getMarket(onSuccess) {
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

export async function fetchAllUserSellTransactions(onSuccess) {
  try {
    const payload = await sendApiReq({
      method: 'get',
      url: endPoints.fetchAllUserSellTransactions,
    })
    console.log(payload)
    if (payload.status === 200)
      onSuccess(payload.message)
  } catch (error) {
    console.log(error)
  }
}

export async function fetchAllUserBuyTransactions(onSuccess) {
  try {
    const payload = await sendApiReq({
      method: 'get',
      url: endPoints.fetchAllUserBuyTransactions,
    })
    console.log(payload)
    if (payload.status === 200)
      onSuccess(payload.message)
  } catch (error) {
    console.log(error)
  }
}

export async function fetchSingleUserSellTransactions(onSuccess) {
  try {
    const payload = await sendApiReq({
      method: 'get',
      url: endPoints.fetchSingleUserSellTransactions,
    })
    console.log(payload)
    if (payload.status === 200)
      onSuccess(payload.message)
  } catch (error) {
    console.log(error)
  }
}

export async function fetchSingleUserBuyTransactions(onSuccess) {
  try {
    const payload = await sendApiReq({
      method: 'get',
      url: endPoints.fetchSingleUserBuyTransactions,
    })
    console.log(payload)
    if (payload.status === 200)
      onSuccess(payload.message)
  } catch (error) {
    console.log(error)
  }
}

