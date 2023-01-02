const authSlice = (set, get) => ({
  isLoggedIn: false,
  role: "",
  email: "",
  details: {},
  nseData: {},
  logIn: (role, email) => {
    set({ isLoggedIn: true, role, email })
  },
  logOut: () => {
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