import { toast } from "react-toastify";

export const successNotify = (msg, position = "") => {
  toast.success(msg, {
    position: position || toast.POSITION.TOP_CENTER,
    autoClose: 2000,
    hideProgressBar: true,
  })
}

export const errorNotify = (msg, position = "") => {
  toast.error(msg, {
    position: position || toast.POSITION.TOP_CENTER,
    autoClose: 2000,
    hideProgressBar: true,
  })
}