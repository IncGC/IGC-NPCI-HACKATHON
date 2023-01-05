import endPoints from "../utils/endPoints";
import sendApiReq from "../utils/sendApiReq";

export async function sendOtp(data, onSuccess) {
  try {
    const payload = await sendApiReq({
      isAuthendicated: false,
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
  try {
    const payload = await sendApiReq({
      isAuthendicated: false,
      method: 'post',
      url: endPoints.otpVerify,
      data,
    })

    console.log(payload)
    if (payload.status_code === 200)
      onSuccess()
    // else
    //   onFailure()
    console.log(data);
  } catch (error) {
    console.log(error)
  }
}

export async function fetchNseData(data, onSuccess, onFailure) {
  try {
    const payload = await sendApiReq({
      isAuthendicated: false,
      url: endPoints.nseData,
      params: data,
    })
    console.log(payload)
    if (payload.status_code === 200)
      onSuccess(payload)
    // else
    //   onFailure()
  } catch (error) {
    console.log(error);
  }
}

export async function postNseData(data, onSuccess, onFailure) {
  try {
    const payload = await sendApiReq({
      isAuthendicated: false,
      method: 'post',
      url: endPoints.nseData,
      data,
    })
    console.log(payload)
    if (payload.status_code === 200)
      onSuccess()
    // else
    //   onFailure()
  } catch (error) {
    console.log(error);
  }
}

export async function registerUser(data, onSuccess, onFailure) {
  try {
    const payload = await sendApiReq({
      isAuthendicated: false,
      method: 'post',
      url: endPoints.register_user,
      data
    })
    if (payload.status_code === 200)
      onSuccess()
    // else
    //   onFailure()
  } catch (error) {
    console.log(error)
  }
}

export async function getPancardData(data, onSuccess, onFailure) {
  try {
    const payload = await sendApiReq({
      isAuthendicated: false,
      url: endPoints.panCardData,
      params: data
    })
    if (payload.status_code === 200)
      onSuccess(payload.data)
    // else
    //   onFailure()
  } catch (error) {
    console.log(error)
  }
}

export async function login(data, onSuccess, onFailure) {
  try {
    const payload = await sendApiReq({
      isAuthendicated: false,
      method: 'post',
      url: endPoints.login,
      data,
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
    // const payload = await sendApiReq({
    //   url: endPoints.transactions,
    //   params: data
    // })

    const res1 = await sendApiReq({
      url: endPoints.fetchSingleUserSellTransactions,
      params: { MbeId: data.email }
    })

    const res2 = await sendApiReq({
      url: endPoints.fetchSingleUserBuyTransactions,
      params: { MbeId: data.email }
    })

    // if (payload.status === 200) {
    //   let final = []

    //   final.push(...payload.message)

    //   if (res1.message) {
    //     if (Array.isArray(res1.message)) {
    //       final.push(...res1.message)
    //     } else {
    //       final.push(res1.message)
    //     }
    //   }

    //   if (res2.message) {
    //     if (Array.isArray(res2.message)) {
    //       final.push(...res2.message)
    //     } else {
    //       final.push(res2.message)
    //     }
    //   }

    //   onSuccess(final)
    // }

    if (res1.status === 200) {
      let final = []

      final.push(...res1.message)

      if (res2.message) {
        if (Array.isArray(res2.message)) {
          final.push(...res2.message)
        } else {
          final.push(res2.message)
        }
      }

      onSuccess(final)
    }
  } catch (error) {
    console.log(error)
  }
}

export async function fetchTokenHoldings(data, onSuccess) {
  try {
    const payload = await sendApiReq({
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

export async function tokenize(data, onSuccess, onFailure) {
  try {
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
    const payload = await sendApiReq({
      method: 'post',
      url: endPoints.placeSellOrder,
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

export async function addWalletBalance(data, onSuccess) {
  try {
    const payload = await sendApiReq({
      method: 'post',
      url: endPoints.addBalance,
      data
    })
    console.log(payload)
    if (payload.status === 200)
      onSuccess(payload.message)
  } catch (error) {
    console.log(error)
  }
}

export async function fetchNumOfDetokenizeToken(data) {
  const payload = await sendApiReq({
    url: endPoints.numOfDetokenizeToken,
    params: data,
  })
  return payload
}

export async function fetchCBDCBalance2(params) {
  const data = await sendApiReq({
    url: endPoints.fetchCBDCBalance,
    params
  })

  return data
}

export async function fetchBondInvestors(onSuccess) {
  try {
    const payload = await sendApiReq({
      url: endPoints.fetchInvestors,
    })
    console.log(payload)
    if (payload.status === 200)
      onSuccess(payload.message)
  } catch (error) {
    console.log(error)
  }
}

export async function fetchAskPrice() {
  const payload = await sendApiReq({
    url: endPoints.askPrice,
  })
  return payload
}

export async function fetchBidPrice() {
  const payload = await sendApiReq({
    url: endPoints.bidPrice,
  })
  return payload
}