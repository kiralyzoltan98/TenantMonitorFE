const ACCESS_TOKEN = "accessToken"
const REFRESH_TOKEN = "refreshToken"


export default function useTokens() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  const refreshToken = localStorage.getItem(REFRESH_TOKEN)

  function setAccessToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN, token)
  }

  function setRefreshToken(token: string): void {
    localStorage.setItem(REFRESH_TOKEN, token)
  }

  function removeAuthTokens(): void {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)

  }

  return { accessToken, refreshToken, setAccessToken, setRefreshToken, removeAuthTokens }
}