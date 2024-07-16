/** 统一处理 Cookie */

// import CacheKey from "@/constants/cache-key"
// import Cookies from "js-cookie"

export const getToken = () => {
  return localStorage.getItem("token")
  // return Cookies.get(CacheKey.TOKEN)
}
export const setToken = (token: string) => {
  localStorage.setItem("token", token)
  // Cookies.set(CacheKey.TOKEN, token)
}
export const removeToken = () => {
  localStorage.clear()
  window.location.replace("/")
  // Cookies.remove(CacheKey.TOKEN)
}
