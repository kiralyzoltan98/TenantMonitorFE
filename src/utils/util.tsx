export function getAccessToken() {
    return localStorage.getItem("accessToken")
}

export function setAccessToken(token: string): void {
    localStorage.setItem("accessToken", token)
}

export function getRefreshToken() {
    return localStorage.getItem("refreshToken")
}

export function setRefreshToken(token: string): void {
    localStorage.setItem("refreshToken", token)
}
