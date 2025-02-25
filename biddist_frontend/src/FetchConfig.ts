export const backendURL = import.meta.env.VITE_REACT_APP_BACKEND_URL || "http://localhost:8000";
export const getConfig: RequestInit = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    mode: 'cors',
    credentials: 'include',
}
export const putConfig: RequestInit = {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    credentials: 'include',
    mode: 'cors',
}
export const patchConfig: RequestInit = {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    credentials: 'include',
    mode: 'cors',
}
export const postConfig: RequestInit = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    credentials: 'include',
    mode: 'cors',
}