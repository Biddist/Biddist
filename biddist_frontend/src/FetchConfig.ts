export const backendURL =  "http://biddist.org";
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