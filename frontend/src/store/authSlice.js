import { cookies } from '../utils/sendApiReq';

const setCookie = (key, value) => {
  cookies.set(key, value, {
    path: '/',
    domain: window.location.hostname,
    expires: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000),
  })
}

const authSlice = (set, get) => ({
  isLoggedIn: !!cookies.get("NPCI-token"),
  role: cookies.get("NPCI-role") || "",
  email: cookies.get("NPCI-email") || "",
  token: cookies.get("NPCI-token") || "",
  details: {},
  nseData: {},
  logIn: (role = "", email = "", token = "") => {
    setCookie("NPCI-role", role)
    setCookie("NPCI-email", email)
    setCookie("NPCI-token", token)
    set({ isLoggedIn: true, role, email, token })
  },
  logOut: () => {
    cookies.remove("NPCI-role")
    cookies.remove("NPCI-email")
    cookies.remove("NPCI-token")
    set({ role: "", isLoggedIn: false })
  },
  setDetails: (keyData, valueData) =>
    set((state) => ({
      details: {
        ...state.details,
        [keyData]: `${valueData}`,
      }
    })),
  setNseData: (keyData, valueData) =>
    set((state) => ({
      nseData: {
        ...state.nseData,
        [keyData]: `${valueData}`,
      }
    })),
  clearDetails: () =>
    set((state) => ({
      details: {}
    })),
  clearNseData: () =>
    set((state) => ({
      nseData: {}
    }))
})

export default authSlice