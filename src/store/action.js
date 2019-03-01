export const setUserData = data => {
    window.localStorage.setItem('userData', JSON.stringify(data))
    return { type: 'ADD', data }
}
